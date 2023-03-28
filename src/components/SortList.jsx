import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SortDispatchContext, SortStateContext } from "../SortContext";

export default function SortList({ wordList }) {
  const sortState = useContext(SortStateContext);
  const dispatch = useContext(SortDispatchContext);

  const { noteTitle } = useParams();
  console.log("noteTitle : ", noteTitle);

  const handleSortAsc = () => {
    let ascWordList = wordList && [...wordList];

    wordList &&
      ascWordList.sort(function (a, b) {
        return a.num - b.num;
      });

    dispatch({ type: "ascSort", ascWordList });
    console.log("ascending sort");
  };

  const handleSortDesc = () => {
    let descWordList = wordList && [...wordList];
    wordList &&
      descWordList.sort(function (a, b) {
        return b.num - a.num;
      });

    dispatch({ type: "descSort", descWordList });
    console.log("descending sort");
  };

  const handleSortRandom = () => {
    const shuffleList = (arr) => {
      for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor((i + 1) * Math.random());
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    };

    let randomWordList = wordList && shuffleList(wordList);

    dispatch({ type: "randomSort", randomWordList });
    console.log("random sort");
  };

  useEffect(() => {
    handleSortAsc();
  }, [noteTitle, wordList]);

  return (
    <>
      <div className="sort-btn-list">
        <button className="sort" onClick={handleSortAsc}>
          오름차순
        </button>
        <button className="sort" onClick={handleSortDesc}>
          내림차순
        </button>
        <button className="sort" onClick={handleSortRandom}>
          랜덤
        </button>
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
          {sortState.vocaList &&
            sortState.vocaList.map((item) => (
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
