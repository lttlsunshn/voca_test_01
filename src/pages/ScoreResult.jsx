import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getAnswerList, getNote } from "../api/firebase";
import { SortDispatchContext, SortStateContext } from "../SortContext";
import { FaArrowLeft } from "react-icons/fa";

let correctNum = 0;

export default function ScoreResult() {
  const sortState = useContext(SortStateContext);
  const dispatch = useContext(SortDispatchContext);
  const navigate = useNavigate();

  const { noteId } = useParams();
  const { timeTitle } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get("sort");
  const toggle = searchParams.get("toggle");

  const { data: vocaNote } = useQuery(
    [`voca-notes/${noteId}/`],
    () => getNote(noteId) // 객체로 가져오기
  );

  const { data: scoreResult } = useQuery(
    [`test-${noteId}-${timeTitle}/answer-list/`],
    () => getAnswerList(noteId, timeTitle)
  );

  if (sort === "random") {
    scoreResult &&
      scoreResult.sort(function (a, b) {
        return a.order - b.order;
      });
  }

  if (sort === "desc") {
    scoreResult &&
      scoreResult.sort(function (a, b) {
        return a.order - b.order;
      });
  }

  scoreResult && console.log("score result : ", scoreResult);

  correctNum =
    scoreResult && scoreResult.filter((item) => item.isCorrect).length;

  const handleBackBtn = () => {
    dispatch({ type: "test" });
    navigate(`/voca-notes/${noteId}/online-test?sort=${sort}&toggle=${toggle}`);
  };

  return (
    <>
      <div className="voca_note_header">
        <div className="voca_note_title">
          {vocaNote && vocaNote.noteTitle} Online TEST Result
        </div>
        <div className="button-list">
          <button onClick={handleBackBtn}>
            <FaArrowLeft />
          </button>
        </div>
      </div>
      <div className="list-options">
        <div className="toggle" id="toggle-spell-disabled">
          <input id="btn_toggle_spell" type="radio" name="test-toggle" />
          <label htmlFor="btn_toggle_spell" value="spell">
            철자
          </label>
        </div>
        <div className="toggle" id="toggle-meaning-disabled">
          <input id="btn_toggle_meaning" type="radio" name="test-toggle" />
          <label htmlFor="btn_toggle_meaning">뜻</label>
        </div>
        <div className="sort-btn-list">
          <div className="sort_disabled">
            <input id="btn_sort_asc" type="radio" name="sort_btn" />
            <label htmlFor="btn_sort_asc">오름차순</label>
          </div>
          <div className="sort_disabled">
            <input id="btn_sort_desc" type="radio" name="sort_btn" />
            <label htmlFor="btn_sort_desc">내림차순</label>
          </div>
          <div className="sort_disabled">
            <input id="btn_sort_random" type="radio" name="sort_btn" />
            <label htmlFor="btn_sort_random">랜덤</label>
          </div>
        </div>
      </div>
      <form>
        {toggle === "meaning" ? (
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
                    <td>
                      {item.isCorrect ? (
                        <span style={{ color: "lightseagreen" }}>
                          {item.answer}
                        </span>
                      ) : (
                        <strike style={{ color: "salmon" }}>
                          {item.answer}
                        </strike>
                      )}
                    </td>
                    <td>{item.isCorrect ? "O" : "X"}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <table className="voca_note">
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
                        <span style={{ color: "lightseagreen" }}>
                          {item.answer}
                        </span>
                      ) : (
                        <strike style={{ color: "salmon" }}>
                          {item.answer}
                        </strike>
                      )}
                    </td>
                    <td>{item.isCorrect ? "O" : "X"}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}

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
