import React from "react";
import { NavLink } from "react-router-dom";
import "./Dropdown.css";
const Dropdown = () => {
  return (
    <ul className="menu">
      <li className="nav-item">
        <NavLink to="/profile" className="nav-links">
          User Profile
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/" className="nav-links">
          Logout
        </NavLink>
      </li>
    </ul>
  );
};
export default Dropdown;
