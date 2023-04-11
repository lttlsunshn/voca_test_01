import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { SortDispatchContext, SortStateContext } from "../SortContext";

export default function SortList({ wordList }) {
  const sortState = useContext(SortStateContext);
  const dispatch = useContext(SortDispatchContext);
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get("sort");
  const toggle = searchParams.get("toggle");

  const { noteTitle } = useParams();

  const [checked, setChecked] = useState(sort);

  let path;
  // console.log("sortState.mode : ", sortState.mode);

  const mode = sortState.mode;
  switch (mode) {
    case "test":
      path = "/online-test";

      break;
    case "print":
      path = "/print-page";
      break;
    default:
      path = "";
  }

  // console.log("path : ", path);

  const handleSort = (e) => {
    const sortValue = e.target.value;
    // console.log("sortValue : ", sortValue);

    dispatch({ type: `${sortValue}Sort`, wordList, mode });
    navigate(
      `/voca-notes/${noteTitle}${path}?sort=${sortValue}&toggle=${toggle}`
    );
  };

  const handleChange = (e) => {
    setChecked(e.target.value);
  };

  useEffect(() => {
    if (sortState.mode === "note") {
      dispatch({ type: "ascSort", wordList });
      setChecked("asc");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noteTitle]);

  return (
    <>
      <div className="sort" onClick={handleSort}>
        <input
          id="btn_sort_asc"
          type="radio"
          name="sort_btn"
          value="asc"
          onChange={handleChange}
          checked={checked === "asc"}
        />
        <label htmlFor="btn_sort_asc">오름차순</label>
      </div>

      <div className="sort" onClick={handleSort}>
        <input
          id="btn_sort_desc"
          type="radio"
          name="sort_btn"
          value="desc"
          onChange={handleChange}
          checked={checked === "desc"}
        />
        <label htmlFor="btn_sort_desc">내림차순</label>
      </div>

      <div className="sort" onClick={handleSort}>
        <input
          id="btn_sort_random"
          type="radio"
          name="sort_btn"
          value="random"
          onChange={handleChange}
          checked={checked === "random"}
        />
        <label htmlFor="btn_sort_random">랜덤</label>
      </div>
    </>
  );
}
