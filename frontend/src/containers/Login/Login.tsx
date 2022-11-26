import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  localStorage.setItem("loggedIn", "false");
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

  const onSubmit = (e: any) => {
    e.preventDefault();
    const user = {
      username: inform.username,
      password: inform.password,
    };
    axios
      .post("/api/clothes/login/", user)
      .then((res: any) => {
        if (res !== null) {
          localStorage.clear();
          localStorage.setItem("username", user.username);
          localStorage.setItem("password", user.password);
          localStorage.setItem("loggedIn", "true");
          navigate("/main");
        } else {
          setInform({
            username: "",
            password: "",
          });
          localStorage.clear();
        }
      })
      .catch((err: any) => {
        alert(err.message);
      });
  };

  return (
    <div>
      <h2>Login</h2>
      <p>
        ID:
        <input
          className="loginInput"
          data-testid="username"
          name="username"
          value={username}
          onChange={handleInform}
        />
      </p>

      <p>
        PWD:
        <input
          type="password"
          className="loginInput"
          name="password"
          value={password}
          onChange={handleInform}
        />
      </p>
      <button
        className="button"
        data-testid="register"
        onClick={onClickRegister}
      >
        Register
      </button>
      <button className="button" data-testid="signin" onClick={onSubmit}>
        Sign In
      </button>
    </div>
  );
};
export default Login;
