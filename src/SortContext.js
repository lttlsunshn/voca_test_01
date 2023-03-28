import React, { createContext, useReducer } from "react";

const initialList = {
  vocaList: [],
};

function sortReducer(state, action) {
  switch (action.type) {
    case "ascSort":
      return { ...state, vocaList: action.ascWordList };
    case "descSort":
      return { ...state, vocaList: action.descWordList };
    case "randomSort":
      return { ...state, vocaList: action.randomWordList };

    default:
      return state;
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
