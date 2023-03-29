import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { makeAnswerTitle, makeAnswerList } from "../api/firebase";
import SortList from "../components/SortList";
import { useCreatedTime } from "../hooks/useCreatedTime";
import { SortStateContext } from "../SortContext";
import { HiPrinter } from "react-icons/hi";
import { FaKeyboard } from "react-icons/fa";

export default function OnlineTest() {
  const sortState = useContext(SortStateContext);
  // console.log("OnlineTest sortState : ", sortState);
  // console.log("sortType : ", sortState.sortType);
  // !sortState.vocaList && console.log("NO TEST VocaList");
  const { noteTitle } = useParams();

  const navigate = useNavigate();

  const [testList, setTestList] = useState(sortState.vocaList);

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

  useEffect(() => {
    setTestList(sortState.vocaList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortState.sortType]);

  return (
    <>
      <div className="voca_note_header">
        <div className="voca_note_title">{noteTitle} TEST</div>
      </div>
      <div className="button-list">
        <button
          onClick={() => {
            window.open(
              `/voca-notes/${noteTitle}/print-page/`,
              "print",
              "width=800, height=900"
            );
          }}
        >
          <HiPrinter />
        </button>
        <button>
          <FaKeyboard />
        </button>
      </div>

      {testList && <SortList wordList={testList} />}
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
            {testList &&
              testList.map((item) => (
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
