import React, { useState } from "react";
import ItemModal from "./ItemModal";
import "./ImageShow.css";
const ImageShow = (props: any) => {
  const [modalOpen, setModalOpen] = useState(false);
  const showModal = () => {
    setModalOpen(true);
  };
  return (
    <div className="imageContainer">
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
          size={props.size}
          Data={props.WholeData}
        />
      )}
      <h3>{props.name}</h3>
      <h3>{props.recommendSize}</h3>
    </div>
  );
};
export default ImageShow;
