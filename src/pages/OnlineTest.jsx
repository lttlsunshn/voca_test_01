import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { makeAnswerTitle, makeAnswerList } from "../api/firebase";
import SortList from "../components/SortList";
import { useCreatedTime } from "../hooks/useCreatedTime";
import { SortDispatchContext, SortStateContext } from "../SortContext";
import { HiPrinter } from "react-icons/hi";
import { FaKeyboard } from "react-icons/fa";
import TestToggle from "../components/TestToggle";
import ReactToPrint from "react-to-print";

// React To Print 설치

export default function OnlineTest() {
  // console.log("ONLINE TEST !!!");

  const sortState = useContext(SortStateContext);
  const dispatch = useContext(SortDispatchContext);
  const { noteTitle } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get("sort");
  const toggle = searchParams.get("toggle");

  const navigate = useNavigate();

  const [testList, setTestList] = useState(sortState.vocaList);

  const answerObject = {};
  const answerList = [];

  const handleWordChange = (e, idx) => {
    answerObject[idx] = e.target.value;
  };

  const handleMarkableAnswer = () => {
    console.log("answerObject : ", answerObject);
    console.log(
      "Object.entries(answerObject) : ",
      Object.entries(answerObject)
    );

    Object.entries(answerObject).forEach((item) => {
      answerList[item[0]] = item[1];
    });
    console.log("answerList : ", answerList);

    makeAnswerTitle(noteTitle, createdTime);

    sortState.vocaList.map((item, idx) => {
      const answer = answerList[idx] === undefined ? "" : answerList[idx];

      const word = toggle === "meaning" ? item.word_kor : item.word_eng;
      const isCorrect =
        answerList[idx] !== undefined && word === answerList[idx]
          ? true
          : false;

      makeAnswerList(noteTitle, createdTime, answer, isCorrect, item, idx);
    });
  };

  const { createdTime } = useCreatedTime();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleMarkableAnswer();

    navigate(
      `/voca-notes/${noteTitle}/online-test/${createdTime}?sort=${sort}&toggle=${toggle}`
    );
  };

  const printRef = useRef();

  useEffect(() => {
    setTestList(sortState.vocaList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortState.sortType]);

  return (
    <>
      <div className="voca_note_header">
        <div className="voca_note_title">{noteTitle} Online TEST</div>
        <div className="button-list">
          <ReactToPrint
            trigger={() => (
              <button>
                <HiPrinter />
              </button>
            )}
            content={() => printRef.current}
          />
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
        <table className="voca_note" ref={printRef}>
          {toggle === "meaning" ? (
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
                  testList.map((item, idx) => (
                    <tr key={item.id}>
                      <td>{item.num}</td>
                      <td>{item.word_eng}</td>
                      <td>
                        <input
                          type="text"
                          name="answer"
                          placeholder="뜻을 적어주세요."
                          value={answerObject[item.num]}
                          onChange={(e) => handleWordChange(e, idx)}
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
