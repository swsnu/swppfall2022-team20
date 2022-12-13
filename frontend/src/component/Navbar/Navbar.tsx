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
          <NavLink className="navLinkClick" to="/main">
            Home
          </NavLink>
        </div>
        <div>
          <NavLink className="navLinkClick" to="/scrap">
            Scrapped item
          </NavLink>
        </div>
        <div>
          <h3 className="navLinkClick" id="change" onClick={handleClick}>
            Profile
            {click ? "⌃" : "⌄"}
          </h3>
          <div>{click && <Dropdown />}</div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
