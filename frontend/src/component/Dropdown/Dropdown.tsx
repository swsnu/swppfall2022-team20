import React from "react";
import { NavLink } from "react-router-dom";
import "./Dropdown.css"
const Dropdown = () => {
  return (
    <ul className="menu">
      <li className="nav-item">
        <NavLink to="/profile" className="nav-links">
          user
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/profile" className="nav-links">
          size
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/" className="nav-links">
          logout
        </NavLink>
      </li>
    </ul>
  );
};
export default Dropdown;
