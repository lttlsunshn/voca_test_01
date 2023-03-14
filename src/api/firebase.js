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

export async function addNewWord(newWord, word_eng) {
  return set(ref(db, "words/" + word_eng), {
    newWord,
  });
}

export async function getWords() {
  return get(ref(db, "words")).then((snapshot) => {
    if (snapshot.exists()) {
      // console.log(snapshot.val());
      return Object.values(snapshot.val());
    }
    return [];
  });
}
