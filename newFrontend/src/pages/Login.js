import "../css/Login.css";
import animationGif from "../media/login-animation.gif";
import goatHead from "../media/goat-head.png";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); // Create a navigate function

    const handleLogin = async (e) => {
        // Perform login API call and get the JWT token
        e.preventDefault();
        try {
            const response = await axios.post(
                "https://localhost:44343/api/authentication/login",
                {
                    username,
                    password,
                }
            );

            const {token} = response.data;
            const {role} = response.data;

            // Store the token in localStorage
            localStorage.setItem("jwtToken", token);
            localStorage.setItem("role", role);

            if (role === "Admin") {
                navigate("/admin");
            } else {
                navigate("/user");
            }

            // try {
            //   // Attempt to access the admin endpoint
            //   await axios.get("https://localhost:44343/api/Admin/employees", {
            //     headers: {
            //       Authorization: `Bearer ${token}`,
            //     },
            //   });

            //   // If the call succeeds, navigate to admin dashboard
            //   navigate("/admin");
            // } catch (error) {
            //   // If the call fails, navigate to user page
            //   navigate("/user");
            // }
        } catch (error) {
            // Handle errors, e.g., show error message to the user.
        } //setJwtToken(token);
    };

    return (
        <div className="page-container">
            <div className="left-section">
                <img className="gif" src={animationGif}/>
            </div>
            <div className="right-section">
                <div className="top-right">
                    <img className="goat-head" src={goatHead}/>
                    <p className="login-title">RAM Inventory Manager</p>
                </div>
                <div className="bottom-right">
                    <p className="login-text">Sign in with your account</p>
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
                </div>
            </div>
        </div>
    );
}

export default Login;
