import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { makeAnswerTitle, makeAnswerList, getNote } from "../api/firebase";
import SortList from "../components/SortList";
import { useCreatedTime } from "../hooks/useCreatedTime";
import { HiPrinter } from "react-icons/hi";
import { FaKeyboard } from "react-icons/fa";
import TestToggle from "../components/TestToggle";
import { useReactToPrint } from "react-to-print";
import { useQuery } from "@tanstack/react-query";
import {
  SortDispatchContext,
  SortStateContext,
} from "../components/SortContext";

export default function OnlineTest() {
  const sortState = useContext(SortStateContext);
  const dispatch = useContext(SortDispatchContext);
  const { noteId } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get("sort");
  const toggle = searchParams.get("toggle");

  const navigate = useNavigate();

  const [testList, setTestList] = useState(sortState.vocaList);
  const [placeholder, setPlaceholder] = useState("");

  const { data: vocaNote } = useQuery([`voca-notes/${noteId}/`], () =>
    getNote(noteId)
  );

  const answerObject = {};
  const answerList = [];

  const handleWordChange = (e, idx) => {
    answerObject[idx] = e.target.value;
  };

  // 채점하기
  const handleMarkableAnswer = () => {
    Object.entries(answerObject).forEach((item) => {
      answerList[item[0]] = item[1];
    });

    const answerArr = Array.from(answerList);

    makeAnswerTitle(noteId, createdTime);

    sortState.vocaList.forEach((item, idx) => {
      const answer = answerArr[idx] === undefined ? "" : answerArr[idx];
      const word = toggle === "meaning" ? item.word_kor : item.word_eng;
      const isCorrect = word === answer ? true : false;

      makeAnswerList(noteId, createdTime, answer, isCorrect, item, idx);
    });
  };

  const { createdTime } = useCreatedTime();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleMarkableAnswer();

    navigate(
      `/voca-notes/${noteId}/online-test/${createdTime}?sort=${sort}&toggle=${toggle}`
    );
  };

  const printRef = useRef();

  const handlePrint = useReactToPrint({
    onBeforeGetContent: () => {
      dispatch({ type: "print" });

      return new Promise((resolve) => {
        setPlaceholder("");
        resolve();
      });
    },
    onAfterPrint: () => {
      dispatch({ type: "test" });
      setPlaceholder(`${toggle === "meaning" ? "뜻을" : "철자를"} 입력하세요.`);
    },
    content: () => printRef.current,
  });

  useEffect(() => {
    setTestList(sortState.vocaList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortState.sortType]);

  useEffect(() => {
    setPlaceholder(`${toggle === "meaning" ? "뜻을" : "철자를"} 입력하세요.`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortState.toggle]);

  return (
    <>
      <div className="voca_note_header">
        <div className="voca_note_title">{vocaNote.noteTitle} Online TEST</div>
        <div className="button-list">
          <button onClick={handlePrint}>
            <HiPrinter />
          </button>
          <button id="test_btn_disabled">
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
        <div ref={printRef}>
          <div id="table_title">{vocaNote.noteTitle} Online TEST</div>
          <table className="voca_note">
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
                            placeholder={placeholder}
                            value={answerObject[idx]}
                            onChange={(e) => handleWordChange(e, idx)}
                            autoComplete="off"
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
                    testList.map((item, idx) => (
                      <tr key={item.id}>
                        <td>{item.num}</td>
                        <td>{item.word_kor}</td>
                        <td>
                          <input
                            type="text"
                            name="answer"
                            placeholder={placeholder}
                            value={answerObject[idx]}
                            onChange={(e) => handleWordChange(e, idx)}
                            autoComplete="off"
                          />
                        </td>
                        <td></td>
                      </tr>
                    ))}
                </tbody>
              </>
            )}
          </table>
        </div>
        <button className="btn_save_word" type="submit" onClick={handleSubmit}>
          제출
        </button>
      </form>
    </>
  );
}
