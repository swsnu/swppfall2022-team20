import React, { useState } from "react";
import axios from "axios";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

const Register = () => {
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
    console.log(profile);
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
    axios
      .post("http://127.0.0.1:8000/api/clothes/signup/", user)
      .then((res: any) => {
        if (res) {
          localStorage.clear();
          localStorage.setItem("token", res.data.session_key);
          window.location.replace("/");
        } else {
          setProfile({
            username: "",
            password: "",
            nickname: "",
            email: "",
            length: "",
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
          <input
            data-testid="username"
            id="username"
            name="username"
            onChange={handleInform}
          />
        </p>
        <p>
          Password:
          <input
            id="password"
            type="password"
            name="password"
            onChange={handleInform}
          />
        </p>
        <p>
          Nickname:
          <input id="nickname" name="nickname" onChange={handleInform} />
        </p>
        <p>
          Email:
          <input id="email" name="email" onChange={handleInform} />
        </p>
      </div>
      <div>
        <h2>size</h2>
        <p>
          length:
          <input id="length" name="length" onChange={handleInform} />
        </p>
        <p>
          waist size:
          <input id="waist" name="waist_size" onChange={handleInform} />
        </p>
        <p>
          thigh size:
          <input id="thigh" name="thigh_size" onChange={handleInform} />
        </p>
        <p>
          calf size:
          <input id="calf" name="calf_size" onChange={handleInform} />
        </p>
      </div>
      <button onClick={clickSubmit}>submit</button>
    </div>
  );
};
export default Register;
