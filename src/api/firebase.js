// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { get, getDatabase, ref, remove, set, update } from "firebase/database";

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
  // return set(ref(db, `voca-notes/${inputTitle}`), {
  return set(ref(db, `voca-notes/${createdTimeNum}`), {
    noteTitle: inputTitle,
    createdTime,
    id: createdTimeNum,
  });
}

export async function getNote(noteId) {
  return get(ref(db, `voca-notes/${noteId}`)).then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val();
    }
    return [];
  });
}

export async function updateNote(noteModify, noteIdModify, inputTitle) {
  return update(ref(db, `voca-notes/${noteIdModify}/`), {
    ...noteModify,
    noteTitle: inputTitle,
  });
}
export async function deleteNote(noteTitle) {
  return remove(ref(db, `voca-notes/${noteTitle}`));
}

export async function addNewWord(noteId, word_eng, num, word_kor, id) {
  console.log("add new word");
  return set(ref(db, `voca-notes/${noteId}/wordList/` + word_eng), {
    num,
    word_eng,
    word_kor,
    id,
  });
}

export async function modifyWord(noteId, word_eng, num, word_kor, id) {
  console.log("update word");

  return update(ref(db, `voca-notes/${noteId}/wordList/` + word_eng), {
    num,
    word_eng,
    word_kor,
    id,
  });
}

export async function deleteWord(noteId, word_eng) {
  return remove(ref(db, `voca-notes/${noteId}/wordList/` + word_eng));
}

export async function makeAnswerTitle(noteId, createdTime) {
  return set(ref(db, `online-test/test-${noteId}-${createdTime}`), {
    createdTime,
    noteId,
  });
}

export async function makeAnswerList(
  noteId,
  createdTime,
  answer,
  isCorrect,
  item,
  idx
) {
  return set(
    ref(
      db,
      `online-test/test-${noteId}-${createdTime}/answer-list/` + item.num
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

export async function getAnswerList(noteId, timeTitle) {
  return get(
    ref(db, `online-test/test-${noteId}-${timeTitle}/answer-list`)
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
      // console.log("snapshot.val() : ", snapshot.val());

      // return Object.values(snapshot.val());
      return snapshot.val();
    }
    return [];
  });
}
