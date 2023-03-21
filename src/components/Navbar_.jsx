import React from "react";

import { getNotes } from "../api/firebase";
import { useQuery } from "@tanstack/react-query";

export default function Navbar() {
  const { data: vocaNotes } = useQuery(["voca-notes"], getNotes);
  vocaNotes && console.log("vocaNotes : ", vocaNotes);

  return (
    <>
      <header className="navbar">
        <div className="nav_notes"></div>
      </header>
    </>
  );
}
