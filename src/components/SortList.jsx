import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SortDispatchContext, SortStateContext } from "../SortContext";

export default function SortList({ wordList }) {
  const sortState = useContext(SortStateContext);
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
  const [checked, setChecked] = useState("sort_asc");

  const handleChange = (e) => {
    console.log("e.target.value :", e.target.value);
    setChecked(e.target.value);
  };

  useEffect(() => {
    wordList && handleSortAsc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noteTitle, sortState.mode]);

  return (
    <>
      <div className="sort-btn-list">
        <div className="sort" onClick={handleSortAsc}>
          <input
            id="btn_sort_asc"
            type="radio"
            name="sort_btn"
            value="sort_asc"
            onChange={handleChange}
            checked={checked === "sort_asc"}
          />
          <label for="btn_sort_asc">오름차순</label>
        </div>

        <div className="sort" onClick={handleSortDesc}>
          <input
            id="btn_sort_desc"
            type="radio"
            name="sort_btn"
            value="sort_desc"
            onChange={handleChange}
            checked={checked === "sort_desc"}
          />
          <label for="btn_sort_desc">내림차순</label>
        </div>

        <div className="sort" onClick={handleSortRandom}>
          <input
            id="btn_sort_random"
            type="radio"
            name="sort_btn"
            value="sort_random"
            onChange={handleChange}
            checked={checked === "sort_random"}
          />
          <label for="btn_sort_random">랜덤</label>
        </div>
      </div>
    </>
  );
}
