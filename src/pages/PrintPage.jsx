import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { getNote } from "../api/firebase";

export default function PrintPage() {
  const { noteTitle } = useParams();
  console.log("noteTitle : ", noteTitle);

  const { data: wordList } = useQuery(
    [`voca-notes/${noteTitle}/wordList`],
    () => getNote(noteTitle)
  );

  wordList && console.log("wordList : ", wordList);
  !wordList && console.log("NO LIST");

  return (
    <>
      <div className="voca_note_header">
        <div className="voca_note_title"></div>
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
    </>
  );
}
