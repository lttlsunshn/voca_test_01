import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { getNote, updateNote } from "../api/firebase";
import { SortDispatchContext } from "./SortContext";

export default function ModifyNote({
  modalOpenModify,
  setModalOpenModify,
  noteIdModify,
}) {
  const [inputTitle, setInputTitle] = useState("");
  const navigate = useNavigate();
  const dispatch = useContext(SortDispatchContext);

  const { data: noteModify } = useQuery([`voca-notes/${noteIdModify}/`], () =>
    getNote(noteIdModify)
  );

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
    updateNote(noteModify, noteIdModify, inputTitle);

    handleReset();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const ok = window.confirm(
      `NOTE ${noteModify.noteTitle}의 제목을 ${inputTitle}로 수정하시겠습니까?`
    );

    if (ok) {
      handleModifyNote();
      closeModalModify();
      const noteTitle = inputTitle;
      dispatch({ type: "note", noteTitle });
      navigate(`voca-notes/${noteIdModify}`);
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
              <td>{noteModify.noteTitle}</td>
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
