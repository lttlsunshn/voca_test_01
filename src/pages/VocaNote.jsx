import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import AddWord from "../components/AddWord";
import { getNote } from "../api/firebase";
import { HiPrinter } from "react-icons/hi";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaKeyboard } from "react-icons/fa";
import SortList from "../components/SortList";
import { SortDispatchContext, SortStateContext } from "../SortContext";

export default function VocaNote() {
  const sortState = useContext(SortStateContext);
  const dispatch = useContext(SortDispatchContext);
  const navigate = useNavigate();

  const { noteTitle } = useParams();
  console.log("noteTitle : ", noteTitle);

  const { data: vocaNote } = useQuery(
    [`voca-notes/${noteTitle}/`],
    () => getNote(noteTitle) // 객체로 가져오기
  );

  vocaNote && console.log("vocaNote : ", vocaNote);

  vocaNote &&
    vocaNote["wordList"] &&
    console.log("vocaNote['wordList'] : ", vocaNote["wordList"]);

  const wordList =
    vocaNote && vocaNote.wordList && Object.values(vocaNote.wordList);
  // const wordList = vocaNote.wordList && Object.values(vocaNote.wordList);

  !wordList && console.log("NO LIST");
  wordList && console.log("wordListwordList : ", wordList);

  const lengthNum = wordList ? wordList.length : 0;
  console.log("lengthNum : ", lengthNum);
  const [modalOpen, setModalOpen] = useState(false);
  const showModal = () => {
    setModalOpen(true);
  };

  const handleOnlineBtn = () => {
    dispatch({ type: "onlineTest", wordList });
    navigate(`/voca-notes/${noteTitle}/online-test`);
  };

  return (
    <>
      <div className="voca_note_header">
        <div className="voca_note_title">
          {noteTitle}
          <span className="voca_note_title_icon" onClick={showModal}>
            <IoMdAddCircleOutline />
          </span>
        </div>
        <div className="button-list">
          <button
            onClick={() => {
              window.open(
                `/voca-notes/${noteTitle}/print-page/`,
                "print",
                "width=1000, height=900"
              );
            }}
          >
            <HiPrinter />
          </button>
          <button onClick={handleOnlineBtn}>
            <FaKeyboard />
          </button>
        </div>
      </div>
      {lengthNum === 0 || wordList === undefined ? (
        <></>
      ) : (
        wordList && <SortList wordList={wordList} />
      )}
      {/* {wordList ? <></> : <SortList wordList={wordList} />} */}
      {lengthNum === 0 || wordList === undefined ? (
        // {wordList ? (
        <div id="empty-note">
          <p>단어장이 비어 있어요.</p>
        </div>
      ) : (
        <table className="voca_note">
          <thead>
            <tr>
              <th>번호</th>
              <th>영어 단어</th>
              <th>뜻</th>
            </tr>
          </thead>
          <tbody>
            {sortState.vocaList &&
              sortState.vocaList.map((item) => (
                <tr key={item.id}>
                  <td>{item.num}</td>
                  <td>{item.word_eng}</td>
                  <td>{item.word_kor}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
      {modalOpen && (
        <AddWord
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          noteTitle={noteTitle}
          lengthNum={lengthNum}
        />
      )}
    </>
  );
}
