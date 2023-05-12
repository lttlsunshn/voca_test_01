import React, { useRef, useState } from "react";
import { addNewWord } from "../api/firebase";
import { createUuid } from "../utils/createUuid";
import Modal from "./Modal";

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

  const { word_eng, word_kor } = newWord;

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
    <Modal
      title={"새 단어 추가"}
      modalOpen={modalOpen}
      closeModal={closeModal}
      handleSubmit={handleSubmit}
    >
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
                autoFocus
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
    </Modal>
  );
}
