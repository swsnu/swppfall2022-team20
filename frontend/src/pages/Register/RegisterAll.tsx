import React, { useState } from "react";

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
  const clickSubmit = () => {
    console.log(profile);
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
