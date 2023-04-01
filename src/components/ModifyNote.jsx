import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { modifyNote, getNote, deleteNote } from "../api/firebase";
import { useCreatedTime } from "../hooks/useCreatedTime";
// import { useCreatedTime } from "../hooks/useCreatedTime.js";

export default function ModifyNote({
  modalOpenModify,
  setModalOpenModify,
  noteTitleModify,
}) {
  const [inputTitle, setInputTitle] = useState("");
  const navigate = useNavigate();
  const { modifiedTime } = useCreatedTime();
  console.log("modifiedTime : ", modifiedTime);

  const { data: noteModify } = useQuery(
    [`voca-notes/${noteTitleModify}/`],
    () => getNote(noteTitleModify)
  );

  console.log("noteTitleModify : ", noteTitleModify);
  console.log("noteModify : ", noteModify);

  const closeModalModify = () => {
    setModalOpenModify(false);
  };

  const handleWordChange = (e) => {
    const { value } = e.target;
    setInputTitle(value);
  };

  const handleReset = () => {
    setInputTitle("");
  };

  const handleModifyNote = () => {
    console.log("noteModify : ", noteModify);
    console.log("noteTitleModify : ", noteTitleModify);
    console.log("inputTitle : ", inputTitle);

    modifyNote(noteModify, inputTitle, modifiedTime);
    deleteNote(noteTitleModify);
    handleReset();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.currentTarget.value);

    const ok = window.confirm(
      `NOTE ${e.currentTarget.value}의 제목을 수정하시겠습니까?`
    );

    if (ok) {
      handleModifyNote();
      closeModalModify();
      navigate(`voca-notes/${inputTitle}`);
      window.location.reload();
    }
  };

  return (
    <div
      className={"modal-background" + (modalOpenModify ? " active" : "")}
      id="modal_modify_note"
    >
      <form onSubmit={handleSubmit} className="modal-window">
        <div className="add_note_head">
          <div className="add_note_title">단어장 제목 수정</div>
          <span
            className="modal-close"
            id="closeModal"
            onClick={closeModalModify}
          >
            <AiFillCloseCircle />
          </span>
        </div>
        <table className="input_area">
          <tbody>
            <tr>
              <th>현재 제목</th>
              <td>{noteTitleModify}</td>
            </tr>
            <tr>
              <th>바꿀 제목</th>
              <td>
                <input
                  type="text"
                  name="note_title"
                  placeholder="단어장 제목을 바꿔 주세요."
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
