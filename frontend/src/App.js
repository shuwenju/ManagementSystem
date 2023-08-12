import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserPanel from "./components/UserPanel";
import AdminPanel from "./components/AdminPanel";
import Login from "./components/Login";
import { useState } from "react";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/page1" element={<Page1 />} />
      </Routes>
    </Router>
  );
}

export default App;
