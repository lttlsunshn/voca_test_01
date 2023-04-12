import React, { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { addNewNote } from "../api/firebase";
import { useCreatedTime } from "../hooks/useCreatedTime.js";

export default function AddNote({ modalOpenAdd, setModalOpenAdd }) {
  const [inputTitle, setInputTitle] = useState("");
  const navigate = useNavigate();

  const { createdTime } = useCreatedTime();
  const createdTimeNum = Number(createdTime.split("_").join(""));

  console.log("createdTimeNum : ", createdTimeNum);

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
    <div
      className={"modal-background" + (modalOpenAdd ? " active" : "")}
      id="modal_add_note"
    >
      <form onSubmit={handleSubmit} className="modal-window">
        <div className="add_note_head">
          <div className="add_note_title">새 단어장 추가</div>
          <span className="modal-close" id="closeModal" onClick={closeModalAdd}>
            <AiFillCloseCircle />
          </span>
        </div>
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
