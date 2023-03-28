import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="header">
      <Link to="/">
        <p>VOCA TEST</p>
      </Link>
    </div>
  );
}
