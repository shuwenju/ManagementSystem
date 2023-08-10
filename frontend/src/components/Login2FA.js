import "./CSS/login.css";
import animationGif from "./media/login-animation.gif";
import goatHead from "./media/goat-head.png";

function Login2FA() {
  return (
    <div className="page-container">
      <div className="left-section">
        <img className="gif" src={animationGif} />
      </div>
      <div className="right-section">
        <div className="top-right">
          <img className="goat-head" src={goatHead} />
          <p className="login-title">RAM Inventory Manager</p>
        </div>
        <div className="bottom-right">
          <p className="login-text">Use your One Time Password(OTP) and username</p>
          <form className="login-form">
            <input className="login-input" type="text" placeholder="Access Code" />
            <input
              className="login-input"
              type="text"
              placeholder="Username"
            />
            <button className="login-button">Sign in</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login2FA;
