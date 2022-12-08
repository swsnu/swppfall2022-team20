import React, { useState, useEffect, useRef } from "react";
import { sendPostReview } from "../../apis/post";
const AddReview = ({ setAddopen }: any) => {
  const formData = new FormData();
  const [content, setContent] = useState<string>("");
  const [file, setFile] = useState<string | Blob>("");
  const closeModal = () => {
    setAddopen(false);
  };
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // 이벤트 핸들러 함수
    const handler = (e: any) => {
      // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setAddopen(false);
      }
    };

    // 이벤트 핸들러 등록
    document.addEventListener("mousedown", handler);

    return () => {
      // 이벤트 핸들러 해제
      document.removeEventListener("mousedown", handler);
    };
  });
  const onImgChange = async (e: any) => {
    setFile(e.target.files[0]);
  };

  const clickAdd = () => {
    formData.append("content", content);
    formData.append("file", file);
    console.log(
      formData,
      localStorage.getItem("username"),
      localStorage.getItem("pants_id")
    );
    sendPostReview(
      formData,
      localStorage.getItem("username"),
      localStorage.getItem("pants_id")
    )
      .then(() => {
        console.log("success");
        setAddopen(false);
      })
      .catch(() => {
        alert("잘못된 접근입니다");
      });
  };
  const onContentChange = (e: any) => {
    setContent(e.target.value);
  };
  return (
    <div className="outer">
      <div ref={modalRef} className="container">
        <p>Add Review</p>
        <div className="leftcontent">
          <input
            type="file"
            name="file"
            accept="image/*"
            onChange={onImgChange}
          ></input>
        </div>
        <div className="rightcontent">
          <textarea
            className="reviewcontent"
            onChange={onContentChange}
          ></textarea>
          <button id="submit" onClick={clickAdd}>
            Add
          </button>
          <button id="change" onClick={closeModal}>
            back
          </button>
        </div>
      </div>
    </div>
  );
};
export default AddReview;
// 해야하는 것 content나 현시간 입력 받아서 setNewreview에 저장