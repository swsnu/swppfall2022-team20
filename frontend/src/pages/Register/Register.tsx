import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Registerprofile from "./Register_profile";
import Registersize from "./Register_size";
import RegisterAll from "./RegisterAll";

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
      <div>
        <RegisterAll />
      </div>
    </>
  );
};
export default Register;
