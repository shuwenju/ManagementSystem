import React, { useState } from "react";
import "./CSS/UserSidebar.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiFillHome } from "react-icons/ai";
import { AiFillDollarCircle } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { BsBoxFill } from "react-icons/bs";
import { BsPersonPlusFill } from "react-icons/bs";
import { AiFillSetting } from "react-icons/ai";
import { Link } from "react-router-dom";

const UserSideBar = () => {
  const [sideBarOpen, setSideBarOpen] = useState(false);

  return sideBarOpen ? (
    <div className="sideBarOpen">
      <div className="hamburgerBG">
        <GiHamburgerMenu
          style={{ color: "white" }}
          size={28}
          className="hamburger"
          onClick={() => setSideBarOpen(!sideBarOpen)}
        />
      </div>
      <div className="list">
        <ul>
          <Link to="/page1">
            <div className="listItem">
              <AiFillHome />
              <li>Dashboard</li>
            </div>
          </Link>
          <Link to="/page2">
            <div className="listItem">
              <AiFillDollarCircle />
              <li>Create Order</li>
            </div>
          </Link>
          <div className="listItem">
            <AiOutlineSearch />
            <li>Item Search</li>
          </div>
          <div className="listItem">
            <BsBoxFill />
            <li>Orders</li>
          </div>
          <div className="listItem">
            <BsPersonPlusFill />
            <li>Add Customer</li>
          </div>
          <div className="listItem">
            <AiFillSetting />
            <li>Settings</li>
          </div>
        </ul>
      </div>
    </div>
  ) : (
    <div className="sideBar">
      <div className="hamburgerBG">
        <GiHamburgerMenu
          style={{ color: "white" }}
          size={28}
          className="hamburger"
          onClick={() => setSideBarOpen(!sideBarOpen)}
        />
      </div>
    </div>
  );
};

export default UserSideBar;
