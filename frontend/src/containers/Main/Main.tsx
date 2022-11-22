import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Navbar from "../../component/Navbar/Navbar";
import ImageShow from "../../component/MainImage/ImageShow";

const Main = () => {
  const navigate = useNavigate();
  console.log(localStorage.getItem("loggedIn"));
  const [profile, setProfile] = useState<any>({});
  useEffect(() => {
    const user = {
      username: localStorage.getItem("username"),
      password: localStorage.getItem("password"),
    };
    axios
      .post("http://127.0.0.1:8000/api/clothes/user/", user, {
        params: {
          session_key: localStorage.getItem("token"),
        },
      })
      .then((res: any) => {
        setProfile(res.data);
        console.log(res.data);
      });
  }, []);
  const [data, setData] = useState<any>([]);
  //useEffect로 axios 한번만 호출
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/clothes/main/").then((res: any) => {
      setData(res.data);
    });
  }, []);

  console.log(data);
  if (localStorage.getItem("loggedIn") == "true") {
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
              name={d.name}
              URL={d.URL}
            />
          ))}
        </div>
      </div>
    );
  } else {
    navigate("/");
  }
};
export default Main;
