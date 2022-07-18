import * as React from "react";
import * as ModalStyles from "../../styles/components/index/easter_eggs_modal.module.scss"
import { faEgg } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Modal = () => {
  return (
    <div className={ModalStyles.modal}>
    {/* <div className={ModalStyles.modal_header}>
      <h2>Horror Collection</h2>

    </div> */}
    <div className={ModalStyles.modal_body}>
      
      <h3><FontAwesomeIcon icon={faEgg}/> Easter Eggs</h3>
        <p className={ModalStyles.easteregg}>Horror film gallery/collection
          <p className={ModalStyles.riddle}>You'll like me if you get to know me, I give you my word. Never mind what haunts me, its just Damocles' Sword.</p>
        </p>
        <p className={ModalStyles.easteregg}>Instagram art profile
          <p className={ModalStyles.riddle}>A programmers favorite tool, hidden among an author's console. If reading this makes you feel like a fool, try inspecting what torments your soul.</p>
        </p>
    </div>
  </div>
  );
};

export default Modal;