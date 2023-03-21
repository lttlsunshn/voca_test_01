import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import AddWord from "../components/AddWord";
import { getNotes } from "../api/firebase";
import { HiPrinter } from "react-icons/hi";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaKeyboard } from "react-icons/fa";

export default function VocaNotes() {
  const { noteTitle } = useParams();
  console.log(noteTitle);

  const { data: vocaNotes } = useQuery(["voca-notes"], getNotes);
  vocaNotes && console.log("vocaNotes : ", vocaNotes);

  const vocaNote = vocaNotes
    ? vocaNotes.find((item) => item.noteTitle === noteTitle)
    : {};

  vocaNotes && console.log("vocaNote : ", vocaNote);
  vocaNote && console.log("vocaNote.wordList : ", vocaNote.wordList);

  const wordList =
    vocaNote && vocaNote.wordList ? Object.values(vocaNote.wordList) : [];
  vocaNote && console.log("vocaNote__ : ", vocaNote);
  vocaNote && console.log("wordList : ", wordList);
  vocaNote && console.log("noteTitle : ", noteTitle);

  const lengthNum = wordList && wordList.length;
  wordList && console.log("# wordList length :", lengthNum);

  const [modalOpen, setModalOpen] = useState(false);
  const showModal = () => {
    setModalOpen(true);
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
          <button>
            <HiPrinter />
          </button>
          <button>
            <FaKeyboard />
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
          {wordList &&
            wordList.map((item) => (
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
