import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Dropdown from "../Dropdown/Dropdown";
import "./Nav.css";
const Navbar = () => {
  const [click, setClick] = useState<boolean>(false);
  const handleClick = () => {
    setClick(!click);
  };
  return (
    <>
      <nav>
        <h1 className="homeName">Stylestargram</h1>
        <div>
          <NavLink to="/main">Home</NavLink>
        </div>

        <div>
          <NavLink to="/scrap">scrapped item</NavLink>
        </div>
        <div>
          <h2 id="change" onClick={handleClick}>
            profile
          </h2>
          {click ? "⌃" : "⌄"}
          {click && <Dropdown />}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
