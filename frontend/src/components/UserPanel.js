import React from "react";
import Navbar from "./Navbar";
import UserSideBar from "./UserSideBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./CSS/Panel.css";
//REMOVE PAGE1 AND PAGE2 IMPORTS WHEN ADDING REAL PAGES, THESE ARE JUST FOR TEST
import Page1 from "./Page1";
import Page2 from "./Page2";
import Login from "./Login";

const UserPanel = () => {
  return (
    <Router>
      <>
        <Navbar />
        <UserSideBar />
        <Routes>
          {/* WRAP ROUTE TAG AROUND AS FOLLOWS, INCLUDE THE "main" CLASS AS WELL TO MAKE PAGE FIT IN NAV PANEL */}
          {/* THE PATH IS THE NAME OF YOUR COMPONENT I.E. IF YOUR COMPONENT IS CALLED "OrderCreation.js", YOUR PATH WILL BE "/ordercreation" */}
          {/* TO FINISH ADDING YOUR PAGE INTO REACT ROUTER, PLEASE FOLLOW COMMENTS ON ADMINSIDEBAR AND USERSIDEBAR AFTER THIS */}
          {/* REMEMBER TO THE CHANGES FOR YOUR PAGES ON "AdminPanel.js" as well as "UserPanel.js", UNLESS YOUR PAGE IS A USER OR ADMIN ONLY PAGE */}
          <Route
            path="/page1"
            element={
              <div className="main">
                <Login />
              </div>
            }
          />
          <Route
            path="/page2"
            element={
              <div className="main">
                <Page2 />
              </div>
            }
          />
        </Routes>
      </>
    </Router>
  );
};
export default UserPanel;
