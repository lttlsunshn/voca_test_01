import React, { createContext, useReducer } from "react";

const initialList = {
  vocaList: [],
  sortType: "",
  mode: "note",
  // spellToggle: false,
  toggle: "meaning",
};

function sortReducer(state, action) {
  switch (action.type) {
    case "ascSort":
      return { ...state, vocaList: action.ascWordList, sortType: "asc" };
    case "descSort":
      return { ...state, vocaList: action.descWordList, sortType: "desc" };
    case "randomSort":
      return { ...state, vocaList: action.randomWordList, sortType: "random" };
    case "note":
      return { ...state, mode: "note" };
    case "test":
      return { ...state, mode: "test" };
    case "print":
      return { ...state, mode: "print" };
    case "spell":
      return { ...state, toggle: "spell" };
    case "meaning":
      return { ...state, toggle: "meaning" };
    default:
      return { ...state };
  }
}

export const SortStateContext = createContext();
export const SortDispatchContext = createContext();

export function SortProvider({ children }) {
  const [state, dispatch] = useReducer(sortReducer, initialList);

  return (
    <SortStateContext.Provider value={state}>
      <SortDispatchContext.Provider value={dispatch}>
        {children}
      </SortDispatchContext.Provider>
    </SortStateContext.Provider>
  );
}
