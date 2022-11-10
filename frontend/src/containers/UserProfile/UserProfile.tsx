import React, { useState, useEffect } from "react";
import Axios from "axios";
import Navbar from "../../component/Navbar/Navbar";
const UserProfile = () => {
  const [profile, setProfile] = useState();
  /*Axios.get("http://127.0.0.1:8000/api/clothes/user/", {
    params: {
      session_key: localStorage.getItem("token"),
    },
  }).then((res: any) => {
    setProfile(res.data);
    console.log(res.data);
  });*/
  useEffect(() => {
    Axios.get("http://127.0.0.1:8000/api/clothes/user/", {
      params: {
        session_key: localStorage.getItem("token"),
      },
    }).then((res: any) => {
      setProfile(res.data);
      console.log(res.data);
    });
  });
  return (
    <div>
      <Navbar />
      this is profile
      <p>user</p>
    </div>
  );
};
export default UserProfile;
