import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SortDispatchContext } from "../SortContext";

export default function SortList({ wordList }) {
  const dispatch = useContext(SortDispatchContext);

  const { noteTitle } = useParams();

  const handleSortAsc = () => {
    let ascWordList = wordList && [...wordList];

    ascWordList &&
      ascWordList.sort(function (a, b) {
        return a.num - b.num;
      });

    dispatch({ type: "ascSort", ascWordList });
    console.log("ascending sort");
  };

  const handleSortDesc = () => {
    let descWordList = wordList && [...wordList];

    descWordList &&
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
    wordList && handleSortAsc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noteTitle]);

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
    </>
  );
}
