import React, { useEffect, useRef, useState } from "react";
import { reqComment } from "../../apis/get";
const ReviewModal = ({ reviewId, photo, content, setModalOpen }: any) => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);

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
  const setCommentData = async () => {
    const response = await reqComment({
      username: localStorage.getItem("username"),
      review_id: reviewId,
    });
    return response;
  };
  useEffect(() => {
    setCommentData()
      .then((response: any) => {
        console.log(response);
        setData(response);
        setLoading(false);
      })
      .catch((err: any) => {
        alert(err.message);
      });
  }, []);

  return (
    <div className="outer">
      <div ref={modalRef} className="container">
        <p>Item Review</p>
        <img className="modalimg" alt="img" src={photo}></img>
        <div className="rightcontent">
          <div>{content}</div>
          <div>
            <div>Comments</div>
            {data.map((comment: any) => (
              <span key={comment.id}>{comment.content}</span>
            ))}
          </div>
          <button id="change" onClick={closeModal}>
            back
          </button>
        </div>
      </div>
    </div>
  );
};
export default ReviewModal;
