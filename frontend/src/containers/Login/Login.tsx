import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { login, token } from "../../apis/user";

const Login = () => {
  localStorage.setItem("loggedIn", "false");
  const [inform, setInform] = useState<any>({
    username: "",
    password: "",
  });
  const { username, password } = inform;
  const navigate = useNavigate();
  useEffect(() => {
    token().catch((err: any) => {
      alert(err.message);
    });
  }, []);
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
    login(user)
      .then(() => {
        localStorage.clear();
        localStorage.setItem("username", user.username);
        localStorage.setItem("password", user.password);
        localStorage.setItem("loggedIn", "true");
        navigate("/main");
      })
      .catch((err: any) => {
        alert(err.message);
      });
  };

  return (
    <div>
      <h3 className="LoginTitle">Welcome to Stylestargram!</h3>
      <h2 className="LoginTitle2">Login</h2>
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
