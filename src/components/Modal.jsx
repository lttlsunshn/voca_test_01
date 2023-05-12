import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";

export default function Modal({
  children,
  title,
  modalOpen,
  closeModal,
  handleSubmit,
}) {
  return (
    <div
      className={"modal-background" + (modalOpen ? " active" : "")}
      id="modal"
    >
      <form onSubmit={handleSubmit} className="modal-window">
        <div className="add_note_head">
          <div className="add_note_title">{title}</div>
          <span className="modal-close" id="closeModal" onClick={closeModal}>
            <AiFillCloseCircle />
          </span>
        </div>
        {children}
        <button className="btn_save" type="submit">
          저장
        </button>
      </form>
    </div>
  );
}
