import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { getNote } from "../api/firebase";
import SortList from "../components/SortList";
import { SortStateContext } from "../SortContext";

export default function PrintPage() {
  const sortState = useContext(SortStateContext);
  // console.log("PRINT vocaList : ", sortState.vocaList);
  const { noteTitle } = useParams();
  // console.log("noteTitle : ", noteTitle);

  const { data: wordList } = useQuery(
    [`voca-notes/${noteTitle}/wordList`],
    () => getNote(noteTitle)
  );

  wordList && console.log("wordList : ", wordList);
  !wordList && console.log("NO LIST");

  return (
    <div className="print-page">
      <div className="voca_note_header">
        <div className="voca_note_title">{noteTitle}</div>
      </div>
      {wordList && <SortList wordList={wordList} />}
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
    </div>
  );
}
