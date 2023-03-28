import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import AddWord from "../components/AddWord";
import { getNote } from "../api/firebase";
import { HiPrinter } from "react-icons/hi";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaKeyboard } from "react-icons/fa";

import SortList from "../components/SortList";

export default function VocaNote() {
  const { noteTitle } = useParams();
  console.log("noteTitle : ", noteTitle);

  const { data: wordList } = useQuery(
    [`voca-notes/${noteTitle}/wordList`],
    () => getNote(noteTitle)
  );

  // wordList && console.log("wordList : ", wordList);
  !wordList && console.log("NO LIST");

  const lengthNum = wordList && wordList.length;

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
          <button
            onClick={() => {
              window.open(
                `/voca-notes/${noteTitle}/print-page/`,
                "print",
                "width=800, height=900"
              );
              // dispatch({ type: "print" });
            }}
          >
            <HiPrinter />
          </button>

          <Link to={`/voca-notes/${noteTitle}/online-test`}>
            <button>
              <FaKeyboard />
            </button>
          </Link>
        </div>
      </div>
      <SortList wordList={wordList} />

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
