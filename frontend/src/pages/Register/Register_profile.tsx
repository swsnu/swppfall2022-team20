import React, { useState, useEffect, useRef } from "react";
const Registerprofile = () => {
  const [profile, setProfile] = useState<any>({
    username: "",
    password: "",
    nickname: "",
    email: "",
  });
  const profileRef = useRef(profile);
  useEffect(() => {
    profileRef.current = profile;
  }, [profile]);
  useEffect(() => {
    return () => {
      console.log("unmount 시 출력", profileRef.current);
    };
  }, []);
  const handleInform = (e: any) => {
    setProfile((prevState: any) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  return (
    <div>
      <div>
        <h2>profile</h2>
        <p>
          ID:
          <input name="username" onChange={handleInform} />
        </p>
        <p>
          Password:
          <input name="password" onChange={handleInform} />
        </p>
        <p>
          Nickname:
          <input name="nickname" onChange={handleInform} />
        </p>
        <p>
          Email:
          <input name="email" onChange={handleInform} />
        </p>
      </div>
    </div>
  );
};
export default Registerprofile;
