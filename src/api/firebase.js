// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { get, getDatabase, ref, set } from "firebase/database";

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
  return set(ref(db, `voca-notes/note${inputTitle}/`), {
    noteTitle: "note" + inputTitle,
    createdTime,
    id: createdTimeNum,
  });
}

export async function addNewWord(noteTitle, num, word_eng, word_kor, id) {
  return set(ref(db, `voca-notes/${noteTitle}/wordList/` + word_eng), {
    num,
    word_eng,
    word_kor,
    id,
  });
}

export async function makeAnswerTitle(noteTitle, createdTime) {
  return set(ref(db, `online-test/test-${noteTitle}-${createdTime}/`), {
    createdTime,
    noteTitle,
  });
}

export async function makeAnswerList(
  noteTitle,
  createdTime,
  answer,
  isCorrect,
  item
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

export async function getNote(noteTitle) {
  return get(ref(db, `voca-notes/${noteTitle}/wordList`)).then((snapshot) => {
    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    }
    return [];
  });
}
