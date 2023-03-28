import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import AddWord from "../components/AddWord";
import { getNote } from "../api/firebase";
import { HiPrinter } from "react-icons/hi";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaKeyboard } from "react-icons/fa";
import { SortDispatchContext, SortStateContext } from "../SortContext";

export default function VocaNote() {
  const sortState = useContext(SortStateContext);
  const dispatch = useContext(SortDispatchContext);

  const { noteTitle } = useParams();
  console.log("noteTitle : ", noteTitle);

  const { data: wordList } = useQuery(
    [`voca-notes/${noteTitle}/wordList`],
    () => getNote(noteTitle)
  );

  wordList && console.log("wordList : ", wordList);
  !wordList && console.log("NO LIST");

  const lengthNum = wordList && wordList.length;

  const [modalOpen, setModalOpen] = useState(false);
  const showModal = () => {
    setModalOpen(true);
  };

  const handleSortAsc = () => {
    let ascWordList = wordList && [...wordList];

    wordList &&
      ascWordList.sort(function (a, b) {
        return a.num - b.num;
      });

    dispatch({ type: "ascSort", ascWordList });
    console.log("ascending sort");
  };

  const handleSortDesc = () => {
    let descWordList = wordList && [...wordList];
    wordList &&
      descWordList.sort(function (a, b) {
        return b.num - a.num;
      });

    dispatch({ type: "descSort", descWordList });
    console.log("descending sort");
  };

  const handleSortRandom = () => {
    const shuffleList = (arr) => {
      for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor((i + 1) * Math.random());
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    };

    let randomWordList = wordList && shuffleList(wordList);

    dispatch({ type: "randomSort", randomWordList });
    console.log("random sort");
  };

  useEffect(() => {
    handleSortAsc();
  }, [noteTitle, wordList]);

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
                "width=800, height=900"
              );
              dispatch({ type: "print" });
            }}
          >
            <HiPrinter />
          </button>

          <Link to={`/voca-notes/${noteTitle}/online-test`}>
            <button>
              <FaKeyboard />
            </button>
          </Link>
          <button className="sort" onClick={handleSortAsc}>
            오름차순
          </button>
          <button className="sort" onClick={handleSortDesc}>
            내림차순
          </button>
          <button className="sort" onClick={handleSortRandom}>
            랜덤
          </button>
        </div>
      </div>
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
