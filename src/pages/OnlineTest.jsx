import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { makeAnswerTitle, makeAnswerList } from "../api/firebase";
import { useCreatedTime } from "../hooks/useCreatedTime";
import { SortStateContext } from "../SortContext";

export default function OnlineTest() {
  const sortState = useContext(SortStateContext);
  console.log("sortState.vocaList : ", sortState.vocaList);

  const { noteTitle } = useParams();

  const navigate = useNavigate();

  const answerList = {};
  const handleWordChange = (e, num) => {
    answerList[num] = e.target.value; // 미묘한 차이
  };

  const handleMarkableAnswer = () => {
    console.log("answerList : ", answerList);

    makeAnswerTitle(noteTitle, createdTime);

    sortState.vocaList.forEach((item) => {
      const answer = answerList[item.num];
      const isCorrect = item.word_kor === answerList[item.num] ? true : false;

      makeAnswerList(noteTitle, createdTime, answer, isCorrect, item);
    });
  };

  const { createdTime } = useCreatedTime();
  const handleSubmit = (e) => {
    e.preventDefault();

    handleMarkableAnswer();
    navigate(`/voca-notes/${noteTitle}/online-test/${createdTime}`);
  };

  return (
    <>
      <div className="voca_note_header">
        <div className="voca_note_title">{noteTitle} TEST</div>
      </div>
      <form>
        <table className="voca_note">
          <thead>
            <tr>
              <th>번호</th>
              <th>영어 단어</th>
              <th>뜻</th>
            </tr>
          </thead>
          <tbody>
            {sortState.vocaList.map((item) => (
              <tr key={item.id}>
                <td>{item.num}</td>
                <td>{item.word_eng}</td>
                <td>
                  <input
                    type="text"
                    name="answer"
                    placeholder="write a 뜻"
                    value={answerList[item.num]}
                    onChange={(e) => handleWordChange(e, item.num)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn_save_word" type="submit" onClick={handleSubmit}>
          제출
        </button>
      </form>
    </>
  );
}
