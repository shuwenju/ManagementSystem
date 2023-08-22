import "../css/Login.css";
import animationGif from "../media/login-animation.gif";
import goatHead from "../media/goat-head.png";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import RoleContext from "../data/RoleContext";
import {Link} from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Added state for error message
  const navigate = useNavigate();
  const { setRole } = useContext(RoleContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear any previous error messages

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

          <div style={{ marginTop: '10px' }}>
            <Link to="/forgotPassword">Forgot password?</Link>
          </div>

          <div style={{ marginTop: '30px' }}>
            <Link to="/tracking">Track an order</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
