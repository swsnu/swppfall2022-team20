import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar";

const NavBar1 = () => {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink to="/" className="nav-logo">
            StyleStargram
            <i className="fas fa-code"></i>
          </NavLink>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  "nav-links" + (isActive ? " active" : "")
                }
                onClick={handleClick}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  "nav-links" + (isActive ? " active" : "")
                }
                onClick={handleClick}
              >
                Add Item
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/scrap"
                className={({ isActive }) =>
                  "nav-links" + (isActive ? " active" : "")
                }
                onClick={handleClick}
              >
                Scrap
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  "nav-links" + (isActive ? " active" : "")
                }
                onClick={handleClick}
              >
                profile
              </NavLink>
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar1;
