import React, { createContext, useReducer } from "react";

const initialList = {
  vocaList: [],
  sortType: "",
};

function sortReducer(state, action) {
  switch (action.type) {
    case "ascSort":
      return { ...state, vocaList: action.ascWordList, sortType: "asc" };
    case "descSort":
      return { ...state, vocaList: action.descWordList, sortType: "desc" };
    case "randomSort":
      return { ...state, vocaList: action.randomWordList, sortType: "random" };
    case "onlineTest":
      return { ...state, vocaList: action.wordList };
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
