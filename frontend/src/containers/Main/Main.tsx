import axios from "axios";
import React, { useState, useEffect } from "react";
import Navbar from "../../component/Navbar/Navbar";
import ImageShow from "../../component/MainImage/ImageShow";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

const Main = () => {
  const [data, setData] = useState<any>([]);
  //useEffect로 axios 한번만 호출
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/clothes/main/").then((res: any) => {
      setData(res.data);
    });
  }, []);
  return (
    <div>
      <Navbar />
      <div>Main</div>
      <div>
        {data.map((d: any) => (
          <ImageShow
            key={d.id}
            id={d.id}
            src={d.photo}
            style={d.style}
            URL={d.URL}
          />
        ))}
      </div>
    </div>
  );
};
export default Main;
