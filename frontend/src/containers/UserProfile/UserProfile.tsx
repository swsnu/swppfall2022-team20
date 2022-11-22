import React, { useState, useEffect } from "react";
import Axios from "axios";
import Navbar from "../../component/Navbar/Navbar";
const UserProfile = () => {
  const [profile, setProfile] = useState<any>({
    /*
    username: localStorage.getItem("username"),
    password: localStorage.getItem("password"),
    length: "",
    waist_size: "",
    thigh_size: "",
    calf_size: "",*/
  });
  useEffect(() => {
    const user = {
      username: localStorage.getItem("username"),
      password: localStorage.getItem("password"),
    };
    Axios.post("http://127.0.0.1:8000/api/clothes/user/", user, {
      params: {
        session_key: localStorage.getItem("token"),
      },
    }).then((res: any) => {
      setProfile(res.data);
      /*profile.length = res.data.length;
      profile.waist_size = res.data.waist_size;
      profile.thigh_size = res.data.thigh_size;
      profile.calf_size = res.data.calf_size;*/
      console.log(profile);
    });
  }, []);
  const changeSize = (e: any) => {
    e.preventDefault();
    setProfile((prevState: any) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };
  const clickChange = () => {
    const user = {
      username: localStorage.getItem("username"),
      password: localStorage.getItem("password"),
    };
    Axios.put("http://127.0.0.1:8000/api/clothes/user/", profile)
      .then((res: any) => {
        console.log(res.data);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };
  console.log(profile);
  return (
    <div>
      <Navbar />
      User profile
      <div>
        username:<input value={profile.username}></input>
      </div>
      <div>
        length:
        <input
          name="length"
          value={profile.length}
          onChange={changeSize}
        ></input>
      </div>
      <div>
        waist:
        <input
          name="waist_size"
          value={profile.waist_size}
          onChange={changeSize}
        ></input>
      </div>
      <div>
        thigh:
        <input
          name="thigh_size"
          value={profile.thigh_size}
          onChange={changeSize}
        ></input>
      </div>
      <div>
        calf:
        <input
          name="calf_size"
          value={profile.calf_size}
          onChange={changeSize}
        ></input>
      </div>
      <button onClick={clickChange}>change</button>
    </div>
  );
};
export default UserProfile;
