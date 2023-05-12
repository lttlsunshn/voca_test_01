import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addNewNote } from "../api/firebase";
import { useCreatedTime } from "../hooks/useCreatedTime.js";
import Modal from "./Modal";

export default function AddNote({ modalOpenAdd, setModalOpenAdd }) {
  const [inputTitle, setInputTitle] = useState("");
  const navigate = useNavigate();

  const { createdTime } = useCreatedTime();
  const createdTimeNum = Number(createdTime.split("_").join(""));

  const closeModalAdd = () => {
    setModalOpenAdd(false);
  };

  const handleWordChange = (e) => {
    const { value } = e.target;
    setInputTitle(value);
  };

  const handleReset = () => {
    setInputTitle("");
  };

  const handleAddNote = () => {
    addNewNote(inputTitle, createdTime, createdTimeNum);
    handleReset();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddNote();
    closeModalAdd();
    navigate(`voca-notes/${createdTimeNum}`);
    window.location.reload();
  };

  return (
    <Modal
      title={"단어장 제목"}
      modalOpen={modalOpenAdd}
      closeModal={closeModalAdd}
      handleSubmit={handleSubmit}
    >
      <table className="input_area">
        <tbody>
          <tr>
            <th>단어장 제목</th>
            <td>
              <input
                type="text"
                name="note_title"
                placeholder="단어장 제목을 적어 주세요."
                value={inputTitle}
                onChange={handleWordChange}
                autoComplete="off"
                autoFocus
              />
            </td>
          </tr>
        </tbody>
      </table>
    </Modal>
  );
}
