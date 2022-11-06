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
      <button onClick={clickSignin}>Sign In</button>
    </div>
  );
};
export default SignUp;
