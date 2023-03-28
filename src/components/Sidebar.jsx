import React, { useState } from "react";
import { FaListUl } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdOutlineStickyNote2 } from "react-icons/md";
import { getNotes } from "../api/firebase";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import AddNote from "./AddNote";

export default function Sidebar() {
  const { data: vocaNotes } = useQuery(["voca-notes"], getNotes);
  // vocaNotes && console.log("vocaNotes : ", vocaNotes);

  const [modalOpen, setModalOpen] = useState(false);

  const showModal = () => {
    setModalOpen(true);
  };

  const navigate = useNavigate();

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
                className="notes_list_item"
                onClick={() => {
                  navigate(`/voca-notes/${item.noteTitle}`);
                }}
              >
                <span className="notes_list_item_icon">
                  <MdOutlineStickyNote2 />
                </span>
                {item.noteTitle}
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
