import axios from "axios";
import Axios from "axios";
import React from "react";
import Navbar from "./component/Navbar";
import Navbar1 from "./component/Navbar1";

const Main = () => {
  Axios.get("http://127.0.0.1:8000/api/clothes/user/")
    .then((res: any) => {
      console.log(res)
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
