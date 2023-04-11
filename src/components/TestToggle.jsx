import React, { useContext, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { SortDispatchContext } from "../SortContext";

export default function TestToggle() {
  const dispatch = useContext(SortDispatchContext);
  const navigate = useNavigate();

  const { noteTitle } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get("sort");
  const toggle = searchParams.get("toggle");

  const [checked, setChecked] = useState("meaning");

  const handleChange = (e) => {
    // console.log("e.target : ", e.target);
    setChecked(e.target.value);
  };

  const handleToggleSpell = (e) => {
    dispatch({ type: "spell" });
    navigate(`/voca-notes/${noteTitle}/online-test?sort=${sort}&toggle=spell`);
  };

  const handleToggleMeaning = (e) => {
    dispatch({ type: "meaning" });
    navigate(
      `/voca-notes/${noteTitle}/online-test?sort=${sort}&toggle=meaning`
    );
  };

  return (
    <>
      <div className="toggle" id="toggle-spell" onClick={handleToggleSpell}>
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

      <div className="toggle" id="toggle-meaning" onClick={handleToggleMeaning}>
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
