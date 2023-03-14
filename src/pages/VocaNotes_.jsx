import React from "react";
import AddWord from "../components/AddWord";

const initialData = [
  {
    num: 1,
    word_eng: "circle",
    word_kor: "원",
    input_date: "20230101",
    id: 1,
  },
  {
    num: 2,
    word_eng: "culture",
    word_kor: "문화",
    input_date: "20230102",
    id: 2,
  },
  {
    num: 3,
    word_eng: "unstoppable",
    word_kor: "막을 수 없는",
    input_date: "20230103",
    id: 3,
  },
  {
    num: 4,
    word_eng: "cloud",
    word_kor: "구름",
    input_date: "20230104",
    id: 4,
  },
  {
    num: 5,
    word_eng: "cloudy",
    word_kor: "흐린",
    input_date: "20230105",
    id: 5,
  },
  {
    num: 6,
    word_eng: "pale",
    word_kor: "창백한, 연한",
    input_date: "20230106",
    id: 6,
  },
  {
    num: 7,
    word_eng: "pale blue",
    word_kor: "연한 파랑색",
    input_date: "20230106",
    id: 7,
  },
  {
    num: 8,
    word_eng: "cycle",
    word_kor: "자전거, 주기",
    input_date: "20230107",
    id: 8,
  },
  {
    num: 9,
    word_eng: "thumbnail",
    word_kor: "엄지손톱",
    input_date: "20230107",
    id: 9,
  },
  {
    num: 10,
    word_eng: "attention",
    word_kor: "집중, 주목",
    input_date: "20230108",
    id: 10,
  },
];

export default function VocaNotes() {
  return (
    <div>
      <h1 className="voca_note_title">
        <b>Voca Notes</b>
      </h1>
      <table>
        <thead>
          <tr>
            <th>번호</th>
            <th>영어 단어</th>
            <th>뜻</th>
          </tr>
        </thead>
        <tbody>
          {initialData.map((item) => (
            <tr key={item.id}>
              <td>{item.num}</td>
              <td>{item.word_eng}</td>
              <td>{item.word_kor}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn_new_word">단어 추가</button>
    </div>
  );
}
