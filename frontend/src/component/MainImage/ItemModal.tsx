import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { analyze } from "../../apis/get";
import "./ItemModal.css";

const ItemModal = ({ setModalOpen, URL, src, name, id, size }: any) => {
  const navigate = useNavigate();
  const [data, setData] = useState<any>([]);
  const [analysis, setAnalysis] = useState<any>([]);
  const [loading, setLoading] = useState<any>(true);
  const getAnalysis = async () => {
    const response = await analyze({
      username: localStorage.getItem("username"),
      clothes_id: id,
    });
    setData(response);
    console.log(response);
    console.log(data);
  };
  useEffect(() => {
    getAnalysis().catch((err: any) => {
      alert(err.message);
    });
    setAnalysis(data[0]);
    setLoading(false);
  }, []);

  const closeModal = () => {
    setModalOpen(false);
  };
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // 이벤트 핸들러 함수
    const handler = (e: any) => {
      // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
      if (modalRef.current !== null && !modalRef.current.contains(e.target)) {
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
    localStorage.setItem("pants_id", id);
    navigate(`/${id}/review`);
  };
  return (
    <div className="outer">
      <div ref={modalRef} className="container">
        <p>Item Details</p>
        <img className="modalimg" alt="img" src={src}></img>
        <div className="rightcontent">
          <h3 onClick={clickName}>{name}</h3>
          <button id="change" onClick={closeModal}>
            back
          </button>
          <button onClick={() => window.open(URL, "_blank")}>visit</button>
          <div>
            {size.map((size: string) => (
              <button key={size} onClick={() => console.log("clicked")}>
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ItemModal;
