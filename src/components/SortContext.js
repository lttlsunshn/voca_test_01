import React, { createContext, useReducer } from "react";

const initialList = {
  vocaList: [],
  sortType: "asc",
  mode: "note",
  testToggle: "meaning",
  answerList: [],
};

function sortReducer(state, action) {
  switch (action.type) {
    case "ascSort":
      return {
        ...state,
        vocaList: action.wordList.sort(function (a, b) {
          return a.num - b.num;
        }),
        sortType: "asc",
        mode: action.mode,
      };
    case "descSort":
      return {
        ...state,
        vocaList: action.wordList.sort(function (a, b) {
          return b.num - a.num;
        }),
        sortType: "desc",
        mode: action.mode,
      };
    case "randomSort":
      const shuffleList = (arr) => {
        for (let i = arr.length - 1; i > 0; i--) {
          let j = Math.floor((i + 1) * Math.random());
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
      };
      return {
        ...state,
        vocaList: shuffleList(action.wordList),
        sortType: "random",
        mode: action.mode,
      };
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
    case "submitAnswer":
      return { ...state, answerList: action.answerList };
    default:
      return { ...state };
  }
}

export const SortStateContext = createContext();
export const SortDispatchContext = createContext();

export default function SortProvider({ children }) {
  const [state, dispatch] = useReducer(sortReducer, initialList);

  return (
    <SortStateContext.Provider value={state}>
      <SortDispatchContext.Provider value={dispatch}>
        {children}
      </SortDispatchContext.Provider>
    </SortStateContext.Provider>
  );
}
