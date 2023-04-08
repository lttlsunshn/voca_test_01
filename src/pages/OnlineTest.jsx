import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { makeAnswerTitle, makeAnswerList } from "../api/firebase";
import SortList from "../components/SortList";
import { useCreatedTime } from "../hooks/useCreatedTime";
import { SortStateContext } from "../SortContext";
import { HiPrinter } from "react-icons/hi";
import { FaKeyboard } from "react-icons/fa";
import TestToggle from "../components/TestToggle";

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

    answerArr.forEach((item, idx) => {
      item === undefined ? (answerSheet[idx] = "") : (answerSheet[idx] = item);
    });

    makeAnswerTitle(noteTitle, createdTime);

    sortState.vocaList.forEach((item, idx) => {
      const answer = answerList[idx] === undefined ? "" : answerList[idx];
      const word =
        sortState.toggle === "meaning" ? item.word_kor : item.word_eng;
      const isCorrect =
        answerList[idx] !== undefined && word === answerList[item.num - 1]
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
      <div className="list-options">
        <div className="test-toggle">
          <TestToggle />
        </div>
        <div className="sort-btn-list">
          {testList && <SortList wordList={testList} />}
        </div>
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
                  <th></th>
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
                {testList &&
                  testList.map((item) => (
                    <tr key={item.id}>
                      <td>{item.num}</td>
                      <td>{item.word_kor}</td>
                      <td>
                        <input
                          type="text"
                          name="answer"
                          placeholder="철자를 적어주세요."
                          value={answerObject[item.num]}
                          onChange={(e) => handleWordChange(e, item.num)}
                        />
                      </td>
                      <td></td>
                    </tr>
                  ))}
              </tbody>
            </>
          )}
        </table>
        <button className="btn_save_word" type="submit" onClick={handleSubmit}>
          제출
        </button>
      </form>
    </>
  );
}
