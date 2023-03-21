// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { get, getDatabase, ref, set } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

export async function addNewNote(inputTitle) {
  return set(ref(db, `voca-notes/note${inputTitle}/`), {
    noteTitle: "note" + inputTitle,
  });
}

export async function addNewWord(noteTitle, id, num, word_eng, word_kor) {
  return set(ref(db, `voca-notes/${noteTitle}/wordList/` + word_eng), {
    id,
    num,
    word_eng,
    word_kor,
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
  return get(ref(db, `voca-notes/note-${noteTitle}`)).then((snapshot) => {
    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    }
    return [];
  });
}
