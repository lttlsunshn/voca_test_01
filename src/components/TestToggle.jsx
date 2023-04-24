import React, { useContext, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { SortDispatchContext } from "./SortContext";

export default function TestToggle() {
  const dispatch = useContext(SortDispatchContext);
  const navigate = useNavigate();

  const { noteId } = useParams();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get("sort");

  const [checked, setChecked] = useState("meaning");

  const handleChange = (e) => {
    setChecked(e.target.value);
  };

  const handleToggle = (e) => {
    dispatch({ type: `${e.target.value}` });
    navigate(
      `/voca-notes/${noteId}/online-test?sort=${sort}&toggle=${e.target.value}`
    );
  };

  return (
    <>
      <div className="toggle" id="toggle-spell" onClick={handleToggle}>
        <input
          id="btn_toggle_spell"
          type="radio"
          name="test-toggle"
          value="spell"
          onChange={handleChange}
          checked={checked === "spell"}
        />
        <label htmlFor="btn_toggle_spell" value="spell">
          철자
        </label>
      </div>
      <div className="toggle" id="toggle-meaning" onClick={handleToggle}>
        <input
          id="btn_toggle_meaning"
          type="radio"
          name="test-toggle"
          value="meaning"
          onChange={handleChange}
          checked={checked === "meaning"}
        />
        <label htmlFor="btn_toggle_meaning" value="meaning">
          뜻
        </label>
      </div>
    </>
  );
}
