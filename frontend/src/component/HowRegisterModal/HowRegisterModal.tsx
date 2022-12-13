import React, { useState } from "react";
import "./HowRegisterModal.css";
const HowRegisterModal = (props: any) => {
  return (
    <div>
      {props.isOpen && (
        <div className="HowRegContainer">
          <div>
            length
            <br />
            <img className="HowRegImg" alt="length" src="img/Length.png"></img>
          </div>
          <div>
            waist
            <br />
            <img className="HowRegImg" alt="waist" src="img/Waist.png"></img>
          </div>
          <div>
            thigh
            <br />
            <img className="HowRegImg" alt="thigh" src="img/Thigh.png"></img>
          </div>
          <div>
            calf
            <br />
            <img className="HowRegImg" alt="calf" src="img/Calf.png"></img>
          </div>
        </div>
      )}
    </div>
  );
};
export default HowRegisterModal;
