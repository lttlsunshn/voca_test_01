import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { AiFillCloseCircle } from "react-icons/ai";
import { deleteWord, modifyWord } from "../api/firebase";

export default function ModifyWord({
  modalOpenModifyWord,
  setModalOpenModifyWord,
  wordModify,
}) {
  // console.log("wordModify : ", wordModify);

  const { noteTitle } = useParams();
  const [modifiedWord, setModifiedWord] = useState({
    modified_eng: "",
    modified_kor: "",
  });

  let word_eng = "";
  let word_kor = "";

  const closeModalModifyWord = () => {
    setModalOpenModifyWord(false);
  };

  const { modified_eng, modified_kor } = modifiedWord; // 비구조화 할당을 통해 값 추출

  const handleWordChange = (e) => {
    const { value, name } = e.target;
    // console.log(name, value);

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

    !modified_kor && console.log("값이 없어.");

    word_eng = modified_eng ? modified_eng : wordModify.word_eng;
    word_kor = modified_kor ? modified_kor : wordModify.word_kor;
    console.log("modified Kor_ : ", modified_kor);

    deleteWord(noteTitle, wordModify.word_eng);
    modifyWord(noteTitle, word_eng, num, word_kor, id);

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
    <div
      className={"modal-background" + (modalOpenModifyWord ? " active" : "")}
      id="modal_modify_word"
    >
      <form onSubmit={handleSubmit} className="modal-window">
        <div className="add_note_head">
          <div className="add_note_title">단어 수정</div>
          <span
            className="modal-close"
            id="closeModal"
            onClick={closeModalModifyWord}
          >
            <AiFillCloseCircle />
          </span>
        </div>
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
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button className="btn_save_word" type="submit">
          저장
        </button>
      </form>
    </div>
  );
}
