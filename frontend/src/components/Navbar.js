import React from "react";
import "./Navbar.css";
import { BsPower } from "react-icons/bs";

const Navbar = () => {
  return (
    <nav className="nav">
      <a href="#">
        <img
          src="../RAMlogo.png"
          alt="RAM Inventory Management"
          className="logo"
        />
      </a>
      <div></div>
      <div className="userNav">
        <div className="userInfo">
          <img src="#" alt="" width={40} height={40} />
          {/* Change the Matthew Parker to user.name when prop drilling user from loggedin session */}
          <h6>Matthew Parker</h6>
        </div>
        <i className="powerIcon">
          <BsPower size={24} aria-label="logout" />
        </i>
      </div>
    </nav>
  );
};

export default Navbar;
