import React, { useState } from "react";
import ReviewModal from "./ReviewModal";
const ReviewShow = (props: any) => {
  const [modalOpen, setModalOpen] = useState(false);
  const showModal = () => {
    setModalOpen(true);
  };
  return (
    <div>
      <div>
        <img
          data-testid="image"
          alt="review"
          src={props.photo}
          onClick={showModal}
        ></img>
      </div>
      {modalOpen && (
        <ReviewModal
          reviewId={props.reviewId}
          photo={props.photo}
          content={props.reviewContent}
          setModalOpen={setModalOpen}
        />
      )}
      <div>{props.content}</div>
    </div>
  );
};
export default ReviewShow;
