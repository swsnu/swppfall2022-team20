import axios from "axios";
import Axios from "axios";
import React, { useState, useEffect } from "react";
import { renderIntoDocument } from "react-dom/test-utils";
import Navbar from "./component/Navbar";
import Navbar1 from "./component/Navbar1";

//const Photos: any[] = [];
const Main = () => {
  const [photos, setPhotos] = useState([]);
  Axios.get("http://127.0.0.1:8000/api/clothes/main/")
    .then((res: any) => res.data)
    .then((itemList) => itemList.map((obj: any) => obj.photo))
    .then((imgSrcList) => {
      setPhotos(imgSrcList);
    });
  return (
    <div>
      <Navbar />
      <div>Main</div>
      <div>
        {photos.map((photo) => (
          <img src={photo}></img>
        ))}
      </div>
    </div>
  );
};
export default Main;
