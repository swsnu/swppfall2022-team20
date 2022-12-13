import React, { useEffect, useRef, useState } from "react";
import { reqComment } from "../../apis/get";
import { postComment } from "../../apis/post";
import "./ReviewModal.css";
const ReviewModal = ({ reviewId, photo, reviewContent, setModalOpen }: any) => {
  const [data, setData] = useState<any>([]);
  const [content, setContent] = useState<string>("");
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
  const clickAdd = () => {
    postComment({
      username: localStorage.getItem("username"),
      review_id: reviewId,
      content: content,
    })
      .then((response: any) => {
        console.log(response);
        setData(response);
        setLoading(false);
      })
      .catch(() => {
        alert("잘못된 접근입니다");
      });
  };
  const onContentChange = (e: any) => {
    setContent(e.target.value);
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
          <div>{reviewContent}</div>
          <div>
            <div className="commentTitle">Comments</div>
            {data.map((comment: any) => (
              <div className="commentList" key={comment.id}>
                {comment.content}
              </div>
            ))}
          </div>
          <div>
            <input className="reviewcontent" onChange={onContentChange}></input>
            <button id="submit" onClick={clickAdd}>
              Add
            </button>
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
