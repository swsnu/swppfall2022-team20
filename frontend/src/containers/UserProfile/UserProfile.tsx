import React, { useState, useEffect } from "react";
import Navbar from "../../component/Navbar/Navbar";
import { editProfile, reqProfile, profileType } from "../../apis/user";
import { useNavigate } from "react-router-dom";
import "./UserProfile.css";
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
    if (window.confirm("Want to Edit your Profile?")) {
      editProfile(profile)
        .then(() => {
          navigate("/main");
        })
        .catch(() => {
          alert("잘못된 접근입니다");
        });
    }
  };
  return (
    <div>
      <Navbar />
      <div className="profileTitle">User profile</div>
      <div className="profileContainer">
        <div>
          username:
          <input
            className="profileInput"
            name="username"
            value={profile.username}
            onChange={handleInform}
          ></input>
        </div>
        <div>
          nickname:
          <input
            className="profileInput"
            name="nickname"
            value={profile.nickname}
            onChange={handleInform}
          ></input>
        </div>
        <div>
          email:
          <input
            className="profileInput"
            name="email"
            value={profile.email}
            onChange={handleInform}
          ></input>
        </div>
        <div>
          length:
          <input
            className="profileInput"
            name="length"
            value={profile.length}
            onChange={handleInform}
          ></input>
        </div>
        <div>
          waist:
          <input
            className="profileInput"
            name="waist_size"
            value={profile.waist_size}
            onChange={handleInform}
          ></input>
        </div>
        <div>
          thigh:
          <input
            className="profileInput"
            name="thigh_size"
            value={profile.thigh_size}
            onChange={handleInform}
          ></input>
        </div>
        <div>
          calf:
          <input
            className="profileInput"
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
