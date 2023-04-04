import React, { useContext, useEffect, useState } from "react";
import { SortDispatchContext, SortStateContext } from "../SortContext";

export default function TestToggle() {
  const sortState = useContext(SortStateContext);
  const dispatch = useContext(SortDispatchContext);

  const [checked, setChecked] = useState("meaning");

  const handleChange = (e) => {
    // console.log("e.target.value :", e.target.value);
    setChecked(e.target.value);
  };

  const handleToggle = () => {
    dispatch({ type: `${checked}` });
  };

  // console.log("sortState.toggle", sortState.toggle);

  useEffect(() => {
    handleToggle();
  }, [checked]);

  return (
    <>
      <div className="toggle" onClick={handleToggle}>
        <input
          id="btn_toggle_spell"
          type="radio"
          name="test-toggle"
          value="spell"
          onChange={handleChange}
          checked={checked === "spell"}
        />
        <label for="btn_sort_asc">철자</label>
      </div>

      <div className="toggle" onClick={handleToggle}>
        <input
          id="btn_toggle_meaning"
          type="radio"
          name="test-toggle"
          value="meaning"
          onChange={handleChange}
          checked={checked === "meaning"}
        />
        <label for="btn_sort_desc">뜻</label>
      </div>
    </>
  );
}
