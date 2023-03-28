import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { getAnswerList } from "../api/firebase";

let correctNum = 0;

export default function ScoreResult() {
  const { noteTitle } = useParams();
  const { timeTitle } = useParams();
  console.log("noteTitle", noteTitle);
  console.log("timeTitle ", timeTitle);

  const { data: scoreResult } = useQuery(
    [`test-${noteTitle}-${timeTitle}/answer-list/`],

    () => getAnswerList(noteTitle, timeTitle)
  );

  scoreResult && console.log("score result : ", scoreResult);

  correctNum =
    scoreResult && scoreResult.filter((item) => item.isCorrect).length;

  console.log("correctNum : ", correctNum);

  return (
    <>
      <div className="voca_note_header">
        <div className="voca_note_title">{noteTitle} Online TEST Result</div>
      </div>
      <form>
        <table className="voca_note">
          <thead>
            <tr>
              <th>번호</th>
              <th>영어 단어</th>
              <th>뜻</th>
              <th>답</th>
              <th>O/X</th>
            </tr>
          </thead>
          <tbody>
            {scoreResult &&
              scoreResult.map((item) => (
                <tr key={item.id}>
                  <td>{item.num}</td>
                  <td>{item.word_eng}</td>
                  <td>{item.word_kor}</td>
                  <td>{item.answer}</td>
                  <td>{item.isCorrect ? "O" : "X"}</td>
                </tr>
              ))}
          </tbody>
        </table>
        RESULT : {scoreResult && correctNum} /{" "}
        {scoreResult && scoreResult.length}
      </form>
    </>
  );
}
