import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Navbar from "../../component/Navbar/Navbar";
import ImageShow from "../../component/MainImage/ImageShow";

const Main = () => {
  const navigate = useNavigate();
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
  for (var i = 0; i < data.length; i++) {
    console.log(data[i].size);
  }
  if (localStorage.getItem("loggedIn") == "true") {
    return (
      <div>
        <Navbar />
        <div>
          {data.map((d: any) => {
            let recommendSize: string = "";
            d.size.map((s: any) => {
              if (
                // 길이는 괜찮으나 바지 통이나 와이드 레귤러 등 핏에 따라서 사이즈를 정해야 할듯
                parseInt(s.length) - parseInt(profile.length) < 3 &&
                parseInt(s.length) - parseInt(profile.length) > -1 &&
                parseInt(s.waist_size) - parseInt(profile.waist_size) < 8 &&
                parseInt(s.thigh_size) - parseInt(profile.thigh_size) < 3 &&
                parseInt(s.calf_size) - parseInt(profile.calf_size) < 3
              ) {
                recommendSize += s.named_size;
                recommendSize += " ";
              }
            });
            return (
              <ImageShow
                key={d.id}
                id={d.id}
                src={d.photo}
                name={d.name}
                URL={d.URL}
                recommendSize={recommendSize}
              />
            );
          })}
        </div>
      </div>
    );
  } else {
    navigate("/");
    return <></>;
  }
};
export default Main;
