import Axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [inform, setInform] = useState<any>({
    username: "",
    password: "",
  });
  const { username, password } = inform;
  const navigate = useNavigate();
  const onClickRegister = () => {
    navigate("/register");
  };
  const handleInform = (e: any) => {
    setInform((prevState: any) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };
  const clickSignin = () => {
    if (inform.username === "ohj" && inform.password === "ohj") {
      navigate("/main");
    } else {
      alert("wrong");
    }
  };
  const onSubmit = (e: any) => {
    e.preventDefault();
    const user = {
      username: inform.username,
      password: inform.password,
    };
    Axios.post("https://localhost:3000/api/user", user)
      .then((res: any) => {
        if (res.data.key) {
          localStorage.clear();
          localStorage.setItem("token", res.data.key);
          window.location.replace("/");
        } else {
          setInform({
            username: "",
            password: "",
          });
          localStorage.clear();
        }
      })
      .catch((err: any) => {
        console.clear();
        alert("wrong");
      });
  };

  return (
    <div>
      <button onClick={() => navigate("/")}>Home</button>
      <h2>Login</h2>
      <p>
        ID:
        <input name="username" value={username} onChange={handleInform} />
      </p>

      <p>
        PWD:
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleInform}
        />
      </p>
      <button onClick={onClickRegister}>Register</button>
      <button onClick={onSubmit}>Sign In</button>
    </div>
  );
};
export default SignUp;
