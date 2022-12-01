import React, { useState } from "react";
import axios from "axios";
import "./Register.css";
import { reqRegister } from "../../apis/user";
import HowRegisterModal from "../../component/HowRegisterModal/HowRegisterModal";

const Register = () => {
  const [qopen, setQopen] = useState<boolean>(false);
  const [profile, setProfile] = useState<any>({
    username: "",
    password: "",
    nickname: "",
    email: "",
    length: "",
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
    const user = {
      username: profile.username,
      password: profile.password,
      nickname: profile.nickname,
      email: profile.email,
      length: profile.length,
      waist_size: profile.waist_size,
      thigh_size: profile.thigh_size,
      calf_size: profile.calf_size,
    };
    reqRegister(user)
      .then(() => {
        localStorage.clear();
        window.location.replace("/");
      })
      .catch((err: any) => {
        alert(err.message);
      });
  };
  return (
    <div>
      <div>
        <h2>Register</h2>
        <p>
          ID:
          <input
            className="RegisterInput"
            data-testid="username"
            id="username"
            name="username"
            onChange={handleInform}
          />
        </p>
        <p>
          Password:
          <input
            className="RegisterInput"
            id="password"
            type="password"
            name="password"
            onChange={handleInform}
          />
        </p>
        <p>
          Nickname:
          <input
            className="RegisterInput"
            id="nickname"
            name="nickname"
            onChange={handleInform}
          />
        </p>
        <p>
          Email:
          <input
            className="RegisterInput"
            id="email"
            name="email"
            onChange={handleInform}
          />
        </p>
      </div>
      <div>
        <h2>size</h2>
        <p>
          length:
          <input
            className="RegisterInput"
            id="length"
            name="length"
            onChange={handleInform}
          />
        </p>
        <p>
          waist size:
          <input
            className="RegisterInput"
            id="waist"
            name="waist_size"
            onChange={handleInform}
          />
        </p>
        <p>
          thigh size:
          <input
            className="RegisterInput"
            id="thigh"
            name="thigh_size"
            onChange={handleInform}
          />
        </p>
        <p>
          calf size:
          <input
            className="RegisterInput"
            id="calf"
            name="calf_size"
            onChange={handleInform}
          />
        </p>
      </div>
      <button className="button" data-testid="submit" onClick={clickSubmit}>
        submit
      </button>
      <button onClick={() => setQopen((qopen) => !qopen)}>?</button>
      <HowRegisterModal isOpen={qopen} />
    </div>
  );
};
export default Register;
