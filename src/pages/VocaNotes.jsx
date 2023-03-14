import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import AddWord from "../components/AddWord";
import { getWords } from "../api/firebase";

export default function VocaNotes() {
  const { data: words } = useQuery(["words"], getWords);
  words && console.log("words : ", words);

  const lengthNum = words && words.length;
  console.log("## :", lengthNum);
  const [modalOpen, setModalOpen] = useState(false);
  const showModal = () => {
    setModalOpen(true);
  };

  return (
    <div>
      <h1 className="voca_note_title">
        <b>Voca Notes</b>
      </h1>
      <table className="voca_note">
        <thead>
          <tr>
            <th>번호</th>
            <th>영어 단어</th>
            <th>뜻</th>
          </tr>
        </thead>
        <tbody>
          {words &&
            words.map((item) => (
              <tr key={item.newWord.id}>
                {/* <tr> */}
                <td>{item.newWord.num}</td>
                <td>{item.newWord.word_eng}</td>
                <td>{item.newWord.word_kor}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <button className="btn_new_word" onClick={showModal}>
        단어 추가
      </button>
      {modalOpen && (
        <AddWord
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          lengthNum={lengthNum}
        />
      )}
    </div>
  );
}
