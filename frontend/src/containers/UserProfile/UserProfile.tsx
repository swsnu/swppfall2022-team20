import React, { useState, useEffect } from "react";
import Navbar from "../../component/Navbar/Navbar";
import { editProfile, reqProfile, profileType } from "../../apis/user";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>({});
  const handleInform = (e: any) => {
    setProfile((prevState: any) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };
  const user = {
    username: localStorage.getItem("username"),
    password: localStorage.getItem("password"),
  };
  const getProfile = async (user: any) => {
    const response = await reqProfile(user.username);
    setProfile(response);
  };
  useEffect(() => {
    getProfile(user).catch((err: any) => {
      alert(err.message);
    });
  }, []);
  const clickEdit = (e: any) => {
    e.preventDefault();
    editProfile(profile)
      .then(() => {
        navigate("/main");
      })
      .catch(() => {
        alert("잘못된 접근입니다");
      });
  };
  return (
    <div>
      <Navbar />
      User profile
      <div>
        <div>
          username:
          <input
            name="username"
            value={profile.username}
            onChange={handleInform}
          ></input>
        </div>
        <div>
          nickname:
          <input
            name="nickname"
            value={profile.nickname}
            onChange={handleInform}
          ></input>
        </div>
        <div>
          email:
          <input
            name="email"
            value={profile.email}
            onChange={handleInform}
          ></input>
        </div>
        <div>
          length:
          <input
            name="length"
            value={profile.length}
            onChange={handleInform}
          ></input>
        </div>
        <div>
          waist:
          <input
            name="waist_size"
            value={profile.waist_size}
            onChange={handleInform}
          ></input>
        </div>
        <div>
          thigh:
          <input
            name="thigh_size"
            value={profile.thigh_size}
            onChange={handleInform}
          ></input>
        </div>
        <div>
          calf:
          <input
            name="calf_size"
            value={profile.calf_size}
            onChange={handleInform}
          ></input>
        </div>
      </div>
      <div>
        <button className="button" onClick={clickEdit}>
          Edit
        </button>
      </div>
    </div>
  );
};
export default UserProfile;
