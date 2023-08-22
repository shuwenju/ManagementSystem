import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import RoleContext from "../data/RoleContext";
import "../css/Login.css";
import animationGif from "../media/login-animation.gif";
import goatHead from "../media/goat-head.png";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [userFullName, setUserFullName] = useState(""); // Added state for user's full name
  const navigate = useNavigate();
  const { setRole } = useContext(RoleContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setUserFullName(""); // Clear previous user full name

    try {
      const response = await axios.post(
        "https://localhost:44343/api/authentication/login",
        {
          username,
          password,
        }
      );

      const { token, role } = response.data;

      localStorage.setItem("jwtToken", token);
      localStorage.setItem("role", role);
      setRole(role);

      if (role === "Admin") {
        navigate("/admin");
      } else {
        // Get user information using /api/Authentication/users
        const usersResponse = await axios.get(
          "https://localhost:44343/api/Authentication/users",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const users = usersResponse.data;
        const loggedInUser = users.find((user) => user.userName === username);

        if (loggedInUser) {
          const fullName = `${loggedInUser.firstName} ${loggedInUser.lastName}`;
          setUserFullName(fullName);

          // Store userFullName in localStorage
          localStorage.setItem("userFullName", fullName);
        } else {
          setErrorMessage("User not found in the employee list.");
        }

        navigate("/user");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const { title, status } = error.response.data;

        if (status === 401) {
          if (title === "Unauthorized: Account is locked") {
            setErrorMessage("Your account is locked. Please contact support.");
          } else {
            setErrorMessage("Invalid username or password.");
          }
        } else {
          setErrorMessage("An error occurred during login.");
        }
      } else {
        setErrorMessage("An error occurred during login.");
      }
    }
  };

  return (
    <div className="page-container">
      <div className="left-section">
        <img className="gif" src={animationGif} alt="Animation" />
      </div>
      <div className="right-section">
        <div className="top-right">
          <img className="goat-head" src={goatHead} alt="Goat Head" />
          <p className="login-title">RAM Inventory Manager</p>
        </div>
        <div className="bottom-right">
          <p className="login-text">Sign in with your account</p>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {userFullName && (
            <p className="welcome-message">Welcome, {userFullName}!</p>
          )}
          <form onSubmit={handleLogin} className="login-form">
            <input
              className="login-input"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="login-input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="login-button">
              Sign in
            </button>
          </form>

          <div style={{ marginTop: "10px" }}>
            <Link to="/forgotPassword">Forgot password?</Link>
          </div>

          <div style={{ marginTop: "30px" }}>
            <Link to="/tracking">Track an order</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
