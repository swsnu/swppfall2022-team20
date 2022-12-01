import React, { useEffect, useState } from "react";
import Navbar from "../../component/Navbar/Navbar";
import { reviewClothes } from "../../apis/get";
const ItemReview = () => {
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
  console.log(reviewdata);
  return (
    <div>
      <Navbar />
      this is review
      <p>review</p>
    </div>
  );
};
export default ItemReview;
