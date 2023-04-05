import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { AiFillCloseCircle } from "react-icons/ai";
import { deleteWord, modifyWord } from "../api/firebase";

export default function ModifyWord({
  modalOpenModifyWord,
  setModalOpenModifyWord,
  wordModify,
}) {
  // console.log("wordModify : ", wordModify);

  const { noteTitle } = useParams();
  const [modifiedWord, setModifiedWord] = useState({
    word_eng: "",
    word_kor: "",
  });
  // const navigate = useNavigate();

  const closeModalModifyWord = () => {
    setModalOpenModifyWord(false);
  };

  const { word_eng, word_kor } = modifiedWord; // 비구조화 할당을 통해 값 추출

  const handleWordChange = (e) => {
    const { value, name } = e.target;
    setModifiedWord({
      ...modifiedWord,
      [name]: value,
    });
  };

  const handleReset = () => {
    setModifiedWord({
      word_eng: "",
      word_kor: "",
    });
  };

  // const nextNum = useRef(lengthNum + 1);
  // const num = nextNum.current;
  const handleModifyWord = () => {
    const num = wordModify.num;
    const id = wordModify.id;
    console.log("modified Eng : ", word_eng);
    console.log("modified Kor : ", word_kor);

    deleteWord(noteTitle, wordModify.word_eng);
    modifyWord(noteTitle, word_eng, num, word_kor, id);

    // nextNum.current += 1;
    handleReset();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const ok = window.confirm(
      `${wordModify.word_eng} ${wordModify.word_kor}을 ${word_eng} ${word_kor}(으)로 수정하시겠습니까?`
    );

    if (ok) {
      handleModifyWord();
      closeModalModifyWord();
      window.location.reload();
    }
  };

  return (
    <div
      className={"modal-background" + (modalOpenModifyWord ? " active" : "")}
      id="modal_modify_word"
    >
      <form onSubmit={handleSubmit} className="modal-window">
        <div className="add_note_head">
          <div className="add_note_title">단어 수정</div>
          <span
            className="modal-close"
            id="closeModal"
            onClick={closeModalModifyWord}
          >
            <AiFillCloseCircle />
          </span>
        </div>
        <table className="input_area">
          <tbody>
            <tr>
              <th>철자 수정</th>
              <td>
                <input
                  type="text"
                  name="word_eng"
                  placeholder={`${wordModify.word_eng}`}
                  value={word_eng}
                  onChange={handleWordChange}
                />
              </td>
            </tr>
            <tr>
              <th>뜻 수정</th>
              <td>
                <input
                  type="text"
                  name="word_kor"
                  placeholder={`${wordModify.word_kor}`}
                  value={word_kor}
                  onChange={handleWordChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button className="btn_save_word" type="submit">
          저장
        </button>
      </form>
    </div>
  );
}
