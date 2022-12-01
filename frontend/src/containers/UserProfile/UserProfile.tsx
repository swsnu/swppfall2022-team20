import React, { useState, useEffect } from "react";
import Navbar from "../../component/Navbar/Navbar";
import { reqProfile } from "../../apis/user";

const UserProfile = () => {
  const [profile, setProfile] = useState<any>({});
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
  return (
    <div>
      <Navbar />
      User profile
      <div>
        username:<input value={profile.username}></input>
      </div>
      <div>
        length:
        <input name="length" value={profile.length}></input>
      </div>
      <div>
        waist:
        <input name="waist_size" value={profile.waist_size}></input>
      </div>
      <div>
        thigh:
        <input name="thigh_size" value={profile.thigh_size}></input>
      </div>
      <div>
        calf:
        <input name="calf_size" value={profile.calf_size}></input>
      </div>
    </div>
  );
};
export default UserProfile;
