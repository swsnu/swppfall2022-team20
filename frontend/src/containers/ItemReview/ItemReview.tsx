import React, { useEffect, useState } from "react";
import Navbar from "../../component/Navbar/Navbar";
import { reviewClothes } from "../../apis/get";
import ReviewShow from "../../component/ReviewModal/ReviewShow";
import AddReview from "../../component/AddReview/AddReview";
const ItemReview = () => {
  const [addopen, setAddopen] = useState<boolean>(false);
  const [reviewdata, setReviewData] = useState<any>([]);
  const setReview = async () => {
    const response = await reviewClothes(localStorage.getItem("pants_id"));
    setReviewData(response);
  };
  useEffect(() => {
    setReview().catch((err: any) => {
      alert(err.message);
    });
  }, []);
  const clickOpen = () => {
    setAddopen(true);
  };
  console.log(reviewdata);
  return (
    <div>
      <Navbar />
      this is review
      <button onClick={clickOpen}>Add review</button>
      {addopen && <AddReview setAddopen={setAddopen} />}
      <div>
        {reviewdata.map((d: any) => (
          <ReviewShow key={d.id} content={d.content} photo={d.photo} />
        ))}
      </div>
    </div>
  );
};
export default ItemReview;
