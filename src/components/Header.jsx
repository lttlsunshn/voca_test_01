import React from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import Sidebar from "./Sidebar";
import Menubar from "./Menubar";

export default function Header() {
  return (
    <div className="header">
      <Link to="/">
        <p>VOCA TEST</p>
      </Link>
      <div className="header_menu">
        <GiHamburgerMenu />
        <div className="menubar">
          <Menubar />
        </div>
      </div>
    </div>
  );
}
