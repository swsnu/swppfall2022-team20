import axios from "axios";
import Axios from "axios";
import React, { useState } from "react";
import Navbar from "./component/Navbar";
import Navbar1 from "./component/Navbar1";

const Main = () => {
  Axios.get("http://127.0.0.1:8000/api/clothes/user/", {
    withCredentials: true,
  })
    .then((res1: any) => {
      console.log(res1)
  })    
  return (
    <div>
      <Navbar />
      <div>Main</div>
      <div>page</div>
    </div>
  );
};
export default Main;
