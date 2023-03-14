import React, { useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import { addNewWord } from "../api/firebase";

export default function AddWord({ modalOpen, setModalOpen, lengthNum }) {
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
  console.log("# :", lengthNum);
  const nextNum = useRef(lengthNum + 1);

  const handleAddWord = () => {
    const id = uuid();
    const newWord = {
      id,
      num: nextNum.current,
      word_eng,
      word_kor,
    };

    addNewWord(newWord, word_eng);

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
      id="modal"
    >
      <form onSubmit={handleSubmit} className="modal-window">
        <span className="modal-close" id="closeModal" onClick={closeModal}>
          X
        </span>
        <div className="add_word_head">
          <div className="add_word_title">단어 추가</div>
        </div>
        <table className="input_area">
          <tbody>
            <tr>
              <th>영어 단어</th>
              <td>
                <input
                  type="text"
                  name="word_eng"
                  placeholder="Write a new word...(ex)chair"
                  value={word_eng}
                  onChange={handleWordChange}
                />
              </td>
            </tr>
            <tr>
              <th>단어 뜻</th>
              <td>
                <input
                  type="text"
                  name="word_kor"
                  placeholder="Write a meaning"
                  value={word_kor}
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
