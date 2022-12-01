import React, { useState } from "react";

const HowRegisterModal = (props: any) => {
  return (
    <div>
      {props.isOpen && (
        <div className="HowRegContainer">
          <div>How to measure your size</div>
          <div>
            length
            <img
              className="HowRegImg"
              alt="length"
              src="../../image/Length.png"
            ></img>
          </div>
          <div>
            waist
            <img className="HowRegImg" alt="waist" src="img/Waist.png"></img>
          </div>
          <div>
            thigh
            <img className="HowRegImg" alt="thigh" src="img/Thigh.png"></img>
          </div>
          <div>
            calf
            <img className="HowRegImg" alt="calf" src="img/Calf.png"></img>
          </div>
        </div>
      )}
    </div>
  );
};
export default HowRegisterModal;
