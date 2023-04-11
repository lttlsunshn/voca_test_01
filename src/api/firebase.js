// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { get, getDatabase, ref, remove, set } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  // databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  databaseURL:
    "https://voca-test-01-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export async function addNewNote(inputTitle, createdTime, createdTimeNum) {
  return set(ref(db, `voca-notes/${inputTitle}`), {
    noteTitle: inputTitle,
    createdTime,
    id: createdTimeNum,
  });
}

export async function getNote_(noteTitle) {
  return get(ref(db, `voca-notes/${noteTitle}/wordList`)).then((snapshot) => {
    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    }
    return [];
  });
}

export async function getNote(noteTitle) {
  return get(ref(db, `voca-notes/${noteTitle}`)).then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val();
    }
    return [];
  });
}

export async function modifyNote(noteModify, inputTitle, modifiedTime) {
  return set(ref(db, `voca-notes/${inputTitle}/`), {
    ...noteModify,
    noteTitle: inputTitle,
    // modifiedTime,
  });
}

export async function deleteNote(noteTitle) {
  return remove(ref(db, `voca-notes/${noteTitle}`));
}

export async function addNewWord(noteTitle, word_eng, num, word_kor, id) {
  console.log("add new word");
  return set(ref(db, `voca-notes/${noteTitle}/wordList/` + word_eng), {
    num,
    word_eng,
    word_kor,
    id,
  });
}

export async function modifyWord(noteTitle, word_eng, num, word_kor, id) {
  console.log("modify word");
  return set(ref(db, `voca-notes/${noteTitle}/wordList/` + word_eng), {
    num,
    word_eng,
    word_kor,
    id,
  });
}

export async function deleteWord(noteTitle, word_eng) {
  return remove(ref(db, `voca-notes/${noteTitle}/wordList/` + word_eng));
}

export async function makeAnswerTitle(noteTitle, createdTime) {
  return set(ref(db, `online-test/test-${noteTitle}-${createdTime}`), {
    createdTime,
    noteTitle,
  });
}

export async function makeAnswerList(
  noteTitle,
  createdTime,
  answer,
  isCorrect,
  item,
  idx
) {
  return set(
    ref(
      db,
      `online-test/test-${noteTitle}-${createdTime}/answer-list/` + item.num
    ),
    {
      answer,
      isCorrect,
      num: item.num,
      word_eng: item.word_eng,
      word_kor: item.word_kor,
      order: idx,
    }
  );
}

export async function getAnswerList(noteTitle, timeTitle) {
  return get(
    ref(db, `online-test/test-${noteTitle}-${timeTitle}/answer-list`)
  ).then((snapshot) => {
    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    }
    return [];
  });
}

export async function getNotes() {
  return get(ref(db, "voca-notes")).then((snapshot) => {
    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    }
    return [];
  });
}
