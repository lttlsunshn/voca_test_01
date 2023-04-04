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
  const { noteTitle } = useParams();

  const navigate = useNavigate();

  const [testList, setTestList] = useState(sortState.vocaList);

  const answerObject = {};
  const answerList = [];
  const answerSheet = [];

  const handleWordChange = (e, num) => {
    answerObject[num] = e.target.value;
  };

  const handleMarkableAnswer = () => {
    Object.entries(answerObject).forEach((item) => {
      answerList[item[0] - 1] = item[1];
    });

    const answerArr = Array.from(answerList);

    answerArr.map((item, idx) => {
      item === undefined ? (answerSheet[idx] = "") : (answerSheet[idx] = item);
    });

    makeAnswerTitle(noteTitle, createdTime);

    sortState.vocaList.forEach((item, idx) => {
      const answer = answerList[idx] === undefined ? "" : answerList[idx];
      const isCorrect =
        answerList[idx] !== undefined &&
        item.word_kor === answerList[item.num - 1]
          ? true
          : false;

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
        <div className="voca_note_title">{noteTitle} Online TEST</div>
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
                      placeholder="뜻을 적어주세요."
                      value={answerObject[item.num]}
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
