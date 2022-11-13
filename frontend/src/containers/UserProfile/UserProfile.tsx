import React, { useState, useEffect } from "react";
import Axios from "axios";
import Navbar from "../../component/Navbar/Navbar";
const UserProfile = () => {
  const [profile, setProfile] = useState<any>();
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
      console.log(res.data);
    });
  }, []);
  return (
    <div>
      <Navbar />
      this is profile
      <div>
        
      </div>
    </div>
  );
};
export default UserProfile;
