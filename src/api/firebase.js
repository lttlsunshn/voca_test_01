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
  try {
    await set(ref(db, `voca-notes/${createdTimeNum}`), {
      noteTitle: inputTitle,
      createdTime,
      id: createdTimeNum,
    });
  } catch (error) {
    console.error("Error occurred while adding a new note: ", error);
  }
}

export async function getNote(noteId) {
  let snapshot;

  try {
    snapshot = await get(ref(db, `voca-notes/${noteId}`));
  } catch (error) {
    snapshot = [];
    console.error("Error occurred while getting a note.", error);
  }
  return snapshot.val();
}

export async function updateNote(noteModify, noteIdModify, inputTitle) {
  try {
    await update(ref(db, `voca-notes/${noteIdModify}/`), {
      ...noteModify,
      noteTitle: inputTitle,
    });
  } catch (error) {
    return console.error(
      `Error occcured while updating note ${inputTitle}.`,
      error
    );
  }
}
export async function deleteNote(noteTitle) {
  try {
    await remove(ref(db, `voca-notes/${noteTitle}`));
  } catch (error) {
    return console.error(
      `Error occured while deleting note ${noteTitle}.`,
      error
    );
  }
}

export async function addNewWord(noteId, word_eng, num, word_kor, id) {
  try {
    await set(ref(db, `voca-notes/${noteId}/wordList/` + word_eng), {
      num,
      word_eng,
      word_kor,
      id,
    });
  } catch (error) {
    return console.error(
      `Error occured while adding a new word ${word_eng}. `,
      error
    );
  }
}

export async function modifyWord(noteId, word_eng, num, word_kor, id) {
  try {
    await update(ref(db, `voca-notes/${noteId}/wordList/` + word_eng), {
      num,
      word_eng,
      word_kor,
      id,
    });
  } catch (error) {
    return console.error(`Error occured while modifying a word. `, error);
  }
}

export async function deleteWord(noteId, word_eng) {
  try {
    await remove(ref(db, `voca-notes/${noteId}/wordList/` + word_eng));
  } catch (error) {
    return console.error(`Error occured while deleting a word. `, error);
  }
}

export async function makeAnswerTitle(noteId, createdTime) {
  try {
    await set(ref(db, `online-test/test-${noteId}-${createdTime}`), {
      createdTime,
      noteId,
    });
    console.log("An answer Title was made successfully. ");
  } catch (error) {
    console.error(`Error occured while making an answer title.`, error);
  }
}

export async function makeAnswerList(
  noteId,
  createdTime,
  answer,
  isCorrect,
  item,
  idx
) {
  try {
    await set(
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
    console.log("An answer List was made successfully.");
  } catch (error) {
    console.error("Error occurred while making answer list:", error);
  }
}

export async function getAnswerList(noteId, timeTitle) {
  let snapshot;

  try {
    snapshot = await get(
      ref(db, `online-test/test-${noteId}-${timeTitle}/answer-list`)
    );
  } catch (error) {
    snapshot = [];
    console.error("Error occurred while getting notes", error);
  }

  return Object.values(snapshot.val());
}

export async function getNotes() {
  let snapshot;

  try {
    snapshot = await get(ref(db, "voca-notes"));
  } catch (error) {
    snapshot = [];
    console.error("Error occurred while getting notes", error);
  }

  return snapshot.val();
}
