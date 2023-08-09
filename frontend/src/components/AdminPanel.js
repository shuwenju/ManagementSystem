import React from "react";
import Navbar from "./Navbar";
import AdminSideBar from "./AdminSideBar";
import "./CSS/Panel.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Page1 from "./Page1";
import Page2 from "./Page2";

const AdminPanel = () => {
  return (
    <Router>
      <>
        <Navbar />
        <AdminSideBar />
        <Routes>
          {/* WRAP ROUTE TAG AROUND AS FOLLOWS, INCLUDE THE "main" CLASS AS WELL TO MAKE PAGE FIT IN NAV PANEL */}
          {/* THE PATH IS THE NAME OF YOUR COMPONENT I.E. IF YOUR COMPONENT IS CALLED "OrderCreation.js", YOUR PATH WILL BE "/ordercreation" */}
          {/* TO FINISH ADDING YOUR PAGE INTO REACT ROUTER, PLEASE FOLLOW COMMENTS ON ADMINSIDEBAR AND USERSIDEBAR AFTER THIS */}
          {/* REMEMBER TO THE CHANGES FOR YOUR PAGES ON "AdminPanel.js" as well as "UserPanel.js", UNLESS YOUR PAGE IS A USER OR ADMIN ONLY PAGE */}
          <Route
            path="/page1"
            element={
              <div className="main">
                <Page1 />
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
export default AdminPanel;
