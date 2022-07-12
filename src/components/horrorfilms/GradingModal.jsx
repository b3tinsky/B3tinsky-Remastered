import React, {useState} from "react"
import { ReactDimmer } from 'react-dimmer'
import { useWindupString } from "windups"
import * as ModalStyles from "../../styles/components/horrorfilms/grading_modal.module.scss"


const Modal = () => {
  const [PurposeWindup] = useWindupString("I love watching horror movies, but there are so many that I wanted to make my own \"collection\" to remember which ones are worth watching again.",{
    pace: (char) => (char === " " ? 80 : 10),
  });
  const [LEGENDARYWindup] = useWindupString("These are must watch movies. They have impacted pop culture or the horror genre. Cult movies are also included.",{
    pace: (char) => (char === " " ? 80 : 10),
  });
  const [GOODWindup] = useWindupString("Good movies that are entertaining and/or scary. Good at aesthetics, actual horror or an original story/concept.",{
    pace: (char) => (char === " " ? 80 : 10),
  });
  const [MEHWindup] = useWindupString("Have something interesting like a big production, entertaining or full of jumpscares, but nothing that makes it stand out.",{
    pace: (char) => (char === " " ? 80 : 10),
  });
  const [BADWindup] = useWindupString("Bad production, boring, bad writing or borderline funny. A movie you would not want to watch.",{
    pace: (char) => (char === " " ? 80 : 10),
  });
  return (
    <div className={ModalStyles.modal}>
    {/* <div className={ModalStyles.modal_header}>
      <h2>Horror Collection</h2>

    </div> */}
    <div className={ModalStyles.modal_body}>
      <h3>Purpose</h3>
      <p>{PurposeWindup}</p>
      <h3>Grading</h3>
      <p>🟣<span style={{color: 'purple', fontWeight: 'bold'}}>LEGENDARY</span>: {LEGENDARYWindup}</p>
      <p>🟢<span style={{color: 'green', fontWeight: 'bold'}}>GOOD</span>: {GOODWindup}</p>
      <p>🟡<span style={{color: 'yellow', fontWeight: 'bold'}}>MEH</span>: {MEHWindup}</p>
      <p>🔴<span style={{color: 'red', fontWeight: 'bold'}}>BAD</span>: {BADWindup}</p>
    
    </div>
  </div>
  )
}

function GradingModal(props) {
  const [isModalOpen, setModal] = useState(true);

  const handleClick = () => {
    setModal((prevState) => !prevState);
  };

  return (
    <>
    <ReactDimmer isOpen={isModalOpen} exitDimmer={setModal} zIndex={100} blur={1.5} >
    </ReactDimmer>
    {isModalOpen && <Modal />}
    </>
       );
}

  export default GradingModal;