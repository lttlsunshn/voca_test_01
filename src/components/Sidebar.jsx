import React, { useEffect, useState } from "react";
import { FaListUl } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
import { RiDeleteBin4Line } from "react-icons/ri";
import { RiPencilFill } from "react-icons/ri";
import { MdOutlineStickyNote2 } from "react-icons/md";
import { deleteNote, getNotes } from "../api/firebase";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import AddNote from "./AddNote";

export default function Sidebar() {
  // const [loading, setLoading] = useState(false);
  const { data: vocaNotes } = useQuery(["voca-notes"], getNotes);
  // vocaNotes && console.log("vocaNotes : ", vocaNotes);

  const [modalOpen, setModalOpen] = useState(false);

  const showModal = () => {
    setModalOpen(true);
  };

  const navigate = useNavigate();

  // const handleModifyNote = (e) => {
  //   console.log(e.currentTarget.value);
  //   deleteNote(e.currentTarget.value);

  //   window.location.reload();
  // };

  const handleDeleteNote = (e) => {
    // console.log(e.target.value);

    console.log(e.currentTarget.value);
    deleteNote(e.currentTarget.value);

    window.location.reload();
  };

  return (
    <>
      <div className="notes_list_title">
        <span className="icon_notes_list">
          <FaListUl />
        </span>
        단어장 목록
      </div>
      <div className="notes_list">
        {vocaNotes &&
          vocaNotes.map((item) => (
            <>
              <p
                key={item.id}
                className="notes_list_items"
                onClick={() => {
                  navigate(`/voca-notes/${item.noteTitle}`);
                }}
              >
                <span className="item_list">
                  <span className="notes_list_item_icon">
                    <MdOutlineStickyNote2 />
                  </span>
                  {item.noteTitle}
                </span>
                <span className="btns_list">
                  {/* <button
                    className="btn_mod_note"
                    value={item.noteTitle}
                    onClick={handleModifyNote}
                  >
                    <RiPencilFill />
                  </button> */}
                  <button
                    className="btn_del_note"
                    value={item.noteTitle}
                    onClick={handleDeleteNote}
                  >
                    <RiDeleteBin4Line />
                  </button>
                </span>
              </p>
            </>
          ))}
      </div>
      <div className="new_note2" onClick={showModal}>
        <span className="icon_add_note">
          <IoMdAddCircleOutline />
        </span>
      </div>
      <section>
        {modalOpen && (
          <AddNote modalOpen={modalOpen} setModalOpen={setModalOpen} />
        )}
      </section>
    </>
  );
}
