import React, { useRef, useState } from "react";
import { addNewWord } from "../api/firebase";
import { AiFillCloseCircle } from "react-icons/ai";
import { createUuid } from "../utils/createUuid";
// import { v4 as uuid } from "uuid";

export default function AddWord({
  modalOpen,
  setModalOpen,
  noteId,
  lengthNum,
}) {
  const closeModal = () => {
    setModalOpen(false);
  };

  const [newWord, setNewWord] = useState({
    word_eng: "",
    word_kor: "",
  });

  const { word_eng, word_kor } = newWord; // 비구조화 할당을 통해 값 추출

  const handleWordChange = (e) => {
    const { value, name } = e.target;
    setNewWord({
      ...newWord,
      [name]: value,
    });
  };

  const handleReset = () => {
    setNewWord({
      word_eng: "",
      word_kor: "",
    });
  };

  const nextNum = useRef(lengthNum + 1);
  const num = nextNum.current;
  const handleAddWord = () => {
    const id = createUuid().uuidv4;
    console.log("id : ", id);

    addNewWord(noteId, word_eng, num, word_kor, id);

    nextNum.current += 1;
    handleReset();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddWord();
    closeModal();
    window.location.reload();
  };

  return (
    <div
      className={"modal-background" + (modalOpen ? " active" : "")}
      id="modal_add_word"
    >
      <form onSubmit={handleSubmit} className="modal-window">
        <div className="add_word_head">
          <div className="add_word_title">새 단어 추가</div>
          <span className="modal-close" id="closeModal" onClick={closeModal}>
            <AiFillCloseCircle />
          </span>
        </div>
        <table className="input_area">
          <tbody>
            <tr>
              <th>번호</th>
              <td>{num}</td>
            </tr>
            <tr>
              <th>영어 단어</th>
              <td>
                <input
                  type="text"
                  name="word_eng"
                  placeholder=""
                  value={word_eng}
                  onChange={handleWordChange}
                  autoComplete="off"
                />
              </td>
            </tr>
            <tr>
              <th>단어 뜻</th>
              <td>
                <input
                  type="text"
                  name="word_kor"
                  placeholder=""
                  value={word_kor}
                  onChange={handleWordChange}
                  autoComplete="off"
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
