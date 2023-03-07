import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="header">
      {/* <Link to="/"> */}
      <Link to="/voca-notes">
        <p className="flex items-center">VOCA TEST</p>
      </Link>
    </div>
  );
}
