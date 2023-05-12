import React from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import Menubar from "./Menubar";

export default function Header() {
  return (
    <div className="header">
      <Link to="/">
        <span className="logo_title">
          {/* <img
            src="images/logo_voca_test.png"
            alt="logo_voca_test"
            width={35}
          ></img> */}
          <h1>VOCA TEST</h1>
        </span>
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
