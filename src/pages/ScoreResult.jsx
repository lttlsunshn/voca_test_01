import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { getAnswerList } from "../api/firebase";
import { SortStateContext } from "../SortContext";

let correctNum = 0;

export default function ScoreResult() {
  const sortState = useContext(SortStateContext);

  const { noteTitle } = useParams();
  const { timeTitle } = useParams();
  // console.log("noteTitle", noteTitle);
  // console.log("timeTitle ", timeTitle);

  const { data: scoreResult } = useQuery(
    [`test-${noteTitle}-${timeTitle}/answer-list/`],

    () => getAnswerList(noteTitle, timeTitle)
  );

  scoreResult && console.log("score result : ", scoreResult);

  correctNum =
    scoreResult && scoreResult.filter((item) => item.isCorrect).length;

  return (
    <>
      <div className="voca_note_header">
        <div className="voca_note_title">{noteTitle} Online TEST Result</div>
      </div>
      <form>
        <table className="voca_note">
          {sortState.toggle === "meaning" ? (
            <>
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
                      <td>
                        {item.isCorrect ? (
                          item.answer
                        ) : (
                          <strike>{item.answer}</strike>
                        )}
                      </td>
                      <td>{item.isCorrect ? "O" : "X"}</td>
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
                  <th>답</th>
                  <th>O/X</th>
                </tr>
              </thead>
              <tbody>
                {scoreResult &&
                  scoreResult.map((item) => (
                    <tr key={item.id}>
                      <td>{item.num}</td>
                      <td>{item.word_kor}</td>
                      <td>{item.word_eng}</td>
                      <td>
                        {item.isCorrect ? (
                          item.answer
                        ) : (
                          <strike>{item.answer}</strike>
                        )}
                      </td>
                      <td>{item.isCorrect ? "O" : "X"}</td>
                    </tr>
                  ))}
              </tbody>
            </>
          )}
        </table>
        <div id="score-result">
          <span id="correct-num">맞은 개수</span>
          <span>
            {scoreResult && correctNum} / {scoreResult && scoreResult.length}
          </span>
        </div>
      </form>
    </>
  );
}
