import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../component/Navbar/Navbar";
import ImageShow from "../../component/MainImage/ImageShow";
import { clothesType, reqClothes } from "../../apis/get";

const Main = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<any>([]);
  // useEffect로 axios 한번만 호출
  const setClothes = async () => {
    const username = localStorage.getItem("username");
    const response = await reqClothes(username);
    setData(response);
  };
  useEffect(() => {
    setClothes().catch((err: any) => {
      alert(err.message);
    });
  }, []);
  if (localStorage.getItem("loggedIn") === "true") {
    return (
      <div>
        <Navbar />
        <div>Main</div>
        <div>
          {data.map((d: clothesType) => (
            <ImageShow
              key={d.price}
              id={d.id}
              src={d.photo}
              name={d.name}
              URL={d.URL}
              size={d.named_size}
              WholeData={data}
            />
          ))}
        </div>
      </div>
    );
  } else {
    navigate("/");
    return <></>;
  }
};
export default Main;
