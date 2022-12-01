import React, { useState, useEffect } from "react";
import Navbar from "../../component/Navbar/Navbar";
import ImageShow from "../../component/MainImage/ImageShow";
import { reqClothes } from "../../apis/get";

const Main = () => {
  const [data, setData] = useState<any>([]);
  // useEffect로 axios 한번만 호출
  const setClothes = async () => {
    const response = await reqClothes();
    setData(response);
  };
  useEffect(() => {
    setClothes().catch((err: any) => {
      alert(err.message);
    });
  }, []);
  return (
    <div>
      <Navbar />
      <div>Main</div>
      <div>
        {data.map((d: any) => (
          <ImageShow
            key={d.id}
            id={d.id}
            src={d.photo}
            style={d.style}
            URL={d.URL}
          />
        ))}
      </div>
    </div>
  );
};
export default Main;
