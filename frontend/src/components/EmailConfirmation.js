import "./CSS/Login.css";
import animationGif from "./media/login-animation.gif";
import goatHead from "./media/goat-head.png";

function EmailConfirmation() {
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
          <p className="login-text">We sent an OTP to your email</p>
          <p>*we display his email here*</p>
          <button className="login-button">Login</button>
        </div>
      </div>
    </div>
  );
}

export default EmailConfirmation;
