import React, { useState } from "react";
import ItemModal from "./ItemModal";
const ImageShow = (props: any) => {
  const [modalOpen, setModalOpen] = useState(false);
  const showModal = () => {
    setModalOpen(true);
  };
  return (
    <div>
      <img
        data-testid="image"
        className="Mainimage"
        alt="img"
        src={props.src}
        onClick={showModal}
      ></img>
      {modalOpen && (
        <ItemModal
          id={props.id}
          src={props.src}
          setModalOpen={setModalOpen}
          URL={props.URL}
          name={props.name}
        />
      )}
      <h2>{props.name}</h2>
    </div>
  );
};
export default ImageShow;
