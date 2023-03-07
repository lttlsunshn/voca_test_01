import React from "react";
import { FaListUl } from "react-icons/fa";
import { FiFilePlus } from "react-icons/fi";
import { HiPrinter } from "react-icons/hi";
import { FaKeyboard } from "react-icons/fa";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="nav_notes">
        <div className="dropdown">
          <div className="dropdown_trigger">
            <span className="icon_notes">
              <FaListUl />
            </span>
            단어장 목록
          </div>
          <div className="dropdown_content">
            <p>단어장 01</p>
            <p>단어장 02</p>
            <p>단어장 03</p>
          </div>
        </div>
        <div className="new_note">
          <span className="icon_new_note">
            <FiFilePlus />
          </span>
          새 단어장{" "}
        </div>
      </div>
      <div className="button-list">
        <button>
          <HiPrinter />
        </button>
        <button>
          <FaKeyboard />
        </button>
      </div>
    </header>
  );
}
