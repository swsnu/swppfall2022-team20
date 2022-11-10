import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Registerprofile from "./Register_profile";
import Registersize from "./Register_size";

const Register = () => {
  const navigate = useNavigate();
  const regList: any = {
    0: <Registerprofile />,
    1: <Registersize />,
  };
  const [list, setList] = useState<number>(0);
  const clickHandler = (id: number) => {
    setList(id);
  };
  return (
    <>
      <div>
        <button onClick={() => navigate("/")}>Home</button>
      </div>

      <h2>Register</h2>
      <div>{regList[list]}</div>
      <button onClick={() => clickHandler(0)}>back</button>
      <button onClick={() => clickHandler(1)}>next</button>
      <div>
        <button>submit</button>
      </div>
    </>
  );
};
export default Register;
