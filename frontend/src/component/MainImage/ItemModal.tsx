import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./ItemModal.css";
const ItemModal = ({ setModalOpen, URL, src, name, id }: any) => {
  const navigate = useNavigate();
  const closeModal = () => {
    setModalOpen(false);
  };
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // 이벤트 핸들러 함수
    const handler = (e: any) => {
      // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setModalOpen(false);
      }
    };

    // 이벤트 핸들러 등록
    document.addEventListener("mousedown", handler);

    return () => {
      // 이벤트 핸들러 해제
      document.removeEventListener("mousedown", handler);
    };
  });
  const clickName = () => {
    navigate(`/${id}/review`);
  };
  return (
    <div className="outer">
      <div ref={modalRef} className="container">
        <p>Item Detail</p>
        <img className="modalimg" alt="img" src={src}></img>
        <div className="rightcontent">
        <h3 onClick={clickName}>{name}</h3>
        <button id="change" onClick={closeModal}>
          back
        </button>
        <button onClick={() => window.open(URL, "_blank")}>visit</button>
        </div>
      </div>
    </div>
  );
};
export default ItemModal;
