import React, { useContext, useEffect, useState } from "react";
import { FaListUl } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
import { RiDeleteBin4Line } from "react-icons/ri";
import { RiPencilFill } from "react-icons/ri";
import { MdOutlineStickyNote2 } from "react-icons/md";
import { deleteNote, getNotes } from "../api/firebase";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import AddNote from "./AddNote";
import ModifyNote from "./ModifyNote";
import { SortDispatchContext, SortStateContext } from "../SortContext";

export default function Sidebar() {
  const [isHoverId, setIsHoverId] = useState(null);
  const sortState = useContext(SortStateContext);
  const dispatch = useContext(SortDispatchContext);

  const { data: vocaNotes } = useQuery(["voca-notes"], getNotes);
  // vocaNotes && console.log("vocaNotes : ", vocaNotes);
  // !vocaNotes && console.log("No vocaNotes! ");

  const vocaNotesList = vocaNotes && Object.values(vocaNotes);
  // vocaNotesList && console.log("vocaNotesList : ", vocaNotesList);

  // const [noteTitleModify, setNoteTitleModify] = useState("");
  const [noteIdModify, setNoteIdModify] = useState("");

  const [modalOpenAdd, setModalOpenAdd] = useState(false);
  const showModalAdd = () => {
    setModalOpenAdd(true);
  };

  const [modalOpenModify, setModalOpenModify] = useState(false);
  const showModalModify = (e) => {
    console.log(e.currentTarget.value);

    // setNoteTitleModify(e.currentTarget.value);
    setNoteIdModify(e.currentTarget.value);
    setModalOpenModify(true);
  };

  const navigate = useNavigate();

  const handleMouseOver = (e) => {
    setIsHoverId(e.target.id);
  };

  const handleMouseLeave = (e) => {
    setIsHoverId("");
  };

  const handleDeleteNote = (e) => {
    const ok = window.confirm(
      `NOTE ${e.currentTarget.value}를 삭제하시겠습니까?`
    );

    if (ok) {
      deleteNote(e.currentTarget.value);
      navigate("/voca-notes");
      window.location.reload();
      // console.log(e.currentTarget.value);
    }
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
        {vocaNotesList &&
          vocaNotesList.map((item, index) => (
            <p
              key={item.id}
              className="notes_list_items"
              onMouseOver={handleMouseOver}
              onMouseLeave={handleMouseLeave}
              value={item.id}
            >
              <span
                className="item_list"
                id={item.id}
                onClick={() => {
                  dispatch({ type: "note" });
                  navigate(`/voca-notes/${item.id}?sort=asc&toggle=meaning`);
                }}
              >
                <span className="note_icon">
                  <MdOutlineStickyNote2 />
                </span>
                {item.noteTitle}
              </span>

              <span
                className={
                  "btns_list" +
                  (Number(isHoverId) === item.id ? " visible" : "")
                }
                id="btns_note"
              >
                <button
                  id="btn_mod_note"
                  // value={item.noteTitle}
                  value={item.id}
                  onClick={showModalModify}
                >
                  <RiPencilFill />
                </button>
                <button
                  id="btn_del_note"
                  value={item.id}
                  onClick={handleDeleteNote}
                >
                  <RiDeleteBin4Line />
                </button>
              </span>
            </p>
          ))}
      </div>
      <div className="new_note2" onClick={showModalAdd}>
        <span className="icon_add_note">
          <IoMdAddCircleOutline />
        </span>
      </div>
      <section>
        {modalOpenAdd && (
          <AddNote
            modalOpenAdd={modalOpenAdd}
            setModalOpenAdd={setModalOpenAdd}
          />
        )}
      </section>

      <section>
        {modalOpenModify && (
          <ModifyNote
            modalOpenModify={modalOpenModify}
            setModalOpenModify={setModalOpenModify}
            noteIdModify={noteIdModify}
          />
        )}
      </section>
    </>
  );
}
