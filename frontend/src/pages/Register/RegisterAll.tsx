import React, { useState } from "react";
import Axios from "axios";

const RegisterAll = () => {
  const [profile, setProfile] = useState<any>({
    username: "",
    password: "",
    nickname: "",
    email: "",
    chest_size: "",
    waist_size: "",
    thigh_size: "",
    calf_size: "",
  });
  const handleInform = (e: any) => {
    setProfile((prevState: any) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };
  const clickSubmit = (e: any) => {
    e.preventDefault();
    console.log(profile);
    const user = {
      username: profile.username,
      password: profile.password,
      nickname: profile.nickname,
      email: profile.email,
      chest_size: profile.chest_size,
      waist_size: profile.waist_size,
      thigh_size: profile.thigh_size,
      calf_size: profile.calf_size,
    };
    Axios.post("../../../public/test.json", user)
      .then((res: any) => {
        if (res.data.key) {
          localStorage.clear();
          localStorage.setItem("token", res.data.key);
          window.location.replace("/");
        } else {
          setProfile({
            username: "",
            password: "",
            nickname: "",
            email: "",
            chest_size: "",
            waist_size: "",
            thigh_size: "",
            calf_size: "",
          });
        }
      })
      .catch((err: any) => {
        console.log(err.message);

        alert("wrong");
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
          <input type="password" name="password" onChange={handleInform} />
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
      <div>
        <h2>size</h2>
        <p>
          chest size:
          <input name="chest_size" onChange={handleInform} />
        </p>
        <p>
          waist size:
          <input name="waist_size" onChange={handleInform} />
        </p>
        <p>
          thigh size:
          <input name="thigh_size" onChange={handleInform} />
        </p>
        <p>
          calf size:
          <input name="calf_size" onChange={handleInform} />
        </p>
      </div>
      <button onClick={clickSubmit}>submit</button>
    </div>
  );
};
export default RegisterAll;
