import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { getNote } from "../api/firebase";
import SortList from "../components/SortList";
import TestToggle from "../components/TestToggle";
import { SortStateContext } from "../SortContext";

export default function PrintPage() {
  const sortState = useContext(SortStateContext);
  const { noteTitle } = useParams();
  // console.log("noteTitle : ", noteTitle);

  const { data: vocaNote } = useQuery(
    [`voca-notes/${noteTitle}/wordList`],
    () => getNote(noteTitle)
  );

  const wordList =
    vocaNote && vocaNote.wordList && Object.values(vocaNote.wordList);

  // wordList && console.log("wordList : ", wordList);
  // !wordList && console.log("NO LIST");

  return (
    // <main>
    <div className="print-page">
      <div className="voca_note_header">
        <div className="voca_note_title">{noteTitle} TEST</div>
      </div>
      <div className="list-options">
        <div className="test-toggle">
          <TestToggle />
        </div>
        <div className="sort-btn-list">
          {wordList && <SortList wordList={wordList} />}
        </div>
      </div>
      <table className="voca_note">
        {sortState.toggle === "meaning" ? (
          <>
            <thead>
              <tr>
                <th>번호</th>
                <th>영어 단어</th>
                <th>뜻</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {sortState.vocaList &&
                sortState.vocaList.map((item) => (
                  <tr key={item.id}>
                    <td>{item.num}</td>
                    <td>{item.word_eng}</td>
                    <td className="blank"></td>
                    <td></td>
                  </tr>
                ))}
            </tbody>
          </>
        ) : (
          <>
            <thead>
              <tr>
                <th>번호</th>
                <th>뜻</th>
                <th>영어 단어</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {sortState.vocaList &&
                sortState.vocaList.map((item) => (
                  <tr key={item.id}>
                    <td>{item.num}</td>

                    <td>{item.word_kor}</td>
                    <td className="blank"></td>
                    <td className="blank"></td>
                    {/* <td></td> */}
                  </tr>
                ))}
            </tbody>
          </>
        )}
      </table>
    </div>
    // <div className="side-space"></div>
    // </main>
  );
}
