import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getNotes } from "../api/firebase";

export default function VocaNotes() {
  const { data: vocaNotes } = useQuery(["voca-notes"], getNotes);
  vocaNotes && console.log("vocaNotes : ", vocaNotes);

  return (
    <div>
      <h1 className="voca_note_title">
        <b>Voca Notes</b>
      </h1>
      <h2>단어장을 선택하세요.</h2>
    </div>
  );
}
