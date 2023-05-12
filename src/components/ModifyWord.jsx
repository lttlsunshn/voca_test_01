import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { deleteWord, modifyWord } from "../api/firebase";
import Modal from "./Modal";

export default function ModifyWord({
  modalOpenModifyWord,
  setModalOpenModifyWord,
  wordModify,
}) {
  const { noteId } = useParams();
  const [modifiedWord, setModifiedWord] = useState({
    modified_eng: "",
    modified_kor: "",
  });

  let word_eng = "";
  let word_kor = "";

  const closeModalModifyWord = () => {
    setModalOpenModifyWord(false);
  };

  const { modified_eng, modified_kor } = modifiedWord;

  const handleWordChange = (e) => {
    const { value, name } = e.target;

    setModifiedWord({
      ...modifiedWord,
      [name]: value,
    });
  };

  const handleReset = () => {
    setModifiedWord({
      modified_eng: "",
      modified_kor: "",
    });
  };

  const handleModifyWord = () => {
    const num = wordModify.num;
    const id = wordModify.id;

    word_eng = modified_eng ? modified_eng : wordModify.word_eng;
    word_kor = modified_kor ? modified_kor : wordModify.word_kor;

    deleteWord(noteId, wordModify.word_eng);
    modifyWord(noteId, word_eng, num, word_kor, id);

    handleReset();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const ok = window.confirm(
      `${wordModify.word_eng} ${wordModify.word_kor}을 ${modified_eng} ${modified_kor}(으)로 수정하시겠습니까?`
    );

    if (ok) {
      handleModifyWord();
      closeModalModifyWord();
      window.location.reload();
    }
  };

  return (
    <Modal
      title={"단어장 수정"}
      modalOpen={modalOpenModifyWord}
      closeModal={closeModalModifyWord}
      handleSubmit={handleSubmit}
    >
      <table className="input_area">
        <tbody>
          <tr>
            <th>철자 수정</th>
            <td>
              <input
                type="text"
                name="modified_eng"
                placeholder={`${wordModify.word_eng}`}
                value={modified_eng}
                onChange={handleWordChange}
                autoComplete="off"
                autoFocus
              />
            </td>
          </tr>
          <tr>
            <th>뜻 수정</th>
            <td>
              <input
                type="text"
                name="modified_kor"
                placeholder={`${wordModify.word_kor}`}
                value={modified_kor}
                onChange={handleWordChange}
                autoComplete="off"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </Modal>
  );
}
