import React, { useContext, useRef, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import AddWord from "../components/AddWord";
import { getNote } from "../api/firebase";
import { HiPrinter } from "react-icons/hi";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaKeyboard } from "react-icons/fa";
import { RiPencilFill } from "react-icons/ri";
import SortList from "../components/SortList";
import ModifyWord from "../components/ModifyWord";
import { useReactToPrint } from "react-to-print";
import {
  SortDispatchContext,
  SortStateContext,
} from "../components/SortContext";

export default function VocaNote() {
  const sortState = useContext(SortStateContext);
  const dispatch = useContext(SortDispatchContext);
  const navigate = useNavigate();
  const printRef = useRef();

  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get("sort");
  const toggle = searchParams.get("toggle");

  const { noteId } = useParams();

  const { data: vocaNote } = useQuery([`voca-notes/${noteId}/`], () =>
    getNote(noteId)
  );

  const [wordModify, setWordModify] = useState("");

  const wordList =
    vocaNote && vocaNote.wordList && Object.values(vocaNote.wordList);

  const lengthNum = wordList ? wordList.length : 0;

  const [modalOpenAddWord, setModalOpenAddWord] = useState(false);
  const showModalAddWord = () => {
    setModalOpenAddWord(true);
  };

  const [modalOpenModifyWord, setModalOpenModifyWord] = useState(false);
  const showModalModifyWord = (e) => {
    const clickedWord = wordList.find(
      (item) => item.id === e.currentTarget.value
    );

    setWordModify(clickedWord);
    setModalOpenModifyWord(true);
  };

  const handleOnlineBtn = () => {
    dispatch({ type: "test" });
    navigate(`/voca-notes/${noteId}/online-test?sort=${sort}&toggle=${toggle}`);
  };

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  return (
    <>
      <div className="voca_note_header">
        <div className="voca_note_title">
          {vocaNote && vocaNote.noteTitle}
          <span className="voca_note_title_icon" onClick={showModalAddWord}>
            <IoMdAddCircleOutline />
          </span>
        </div>
        <div className="button-list">
          <button onClick={handlePrint}>
            <HiPrinter />
          </button>
          <button onClick={handleOnlineBtn}>
            <FaKeyboard />
          </button>
        </div>
      </div>

      <div>
        {lengthNum === 0 || wordList === undefined ? (
          <></>
        ) : (
          <div className="list-options">
            <div className="test-toggle"></div>
            <div className="sort-btn-list">
              {wordList && <SortList wordList={wordList} />}
            </div>
          </div>
        )}
      </div>

      {vocaNote === undefined ? (
        <></>
      ) : lengthNum === 0 ? (
        <div id="empty-note">
          <p>단어장이 비어 있어요.</p>
        </div>
      ) : (
        <div ref={printRef}>
          <div id="table_title">{vocaNote && vocaNote.noteTitle}</div>
          <table className="voca_note">
            <thead>
              <tr>
                <th>번호</th>
                <th>영어 단어</th>
                <th>뜻</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {sortState.vocaList.map((item) => (
                <tr key={item.id}>
                  <td>{item.num}</td>
                  <td>{item.word_eng}</td>
                  <td>{item.word_kor}</td>
                  <td></td>
                  <td>
                    <button
                      id="btn_word_mod"
                      value={item.id}
                      onClick={showModalModifyWord}
                    >
                      <RiPencilFill />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modalOpenAddWord && (
        <AddWord
          modalOpen={modalOpenAddWord}
          setModalOpen={setModalOpenAddWord}
          noteId={noteId}
          lengthNum={lengthNum}
        />
      )}
      {modalOpenModifyWord && (
        <ModifyWord
          modalOpenModifyWord={modalOpenModifyWord}
          setModalOpenModifyWord={setModalOpenModifyWord}
          wordModify={wordModify}
        />
      )}
    </>
  );
}
