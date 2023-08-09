import React, { useState } from "react";
import "./CSS/AdminSidebar.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiFillHome } from "react-icons/ai";
import { AiFillDollarCircle } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { BsBoxFill } from "react-icons/bs";
import { BsPersonPlusFill } from "react-icons/bs";
import { AiFillSetting } from "react-icons/ai";
import { BiHardHat } from "react-icons/bi";
import { Link } from "react-router-dom";

const AdminSideBar = () => {
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
          {/* WRAP EVERY LI TAG WITH LINK TAG AS SEEN UNDER. YOU NEED TO WRAP THE DIVS */}
          <Link to="/page1">
            <div className="listItem">
              <AiFillHome />
              <li>Dashboard</li>
            </div>
          </Link>
          <Link to="/page2">
            <div className="listItem">
              <AiFillDollarCircle color="" />
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
            <BiHardHat />
            <li>Add Employee</li>
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

export default AdminSideBar;
