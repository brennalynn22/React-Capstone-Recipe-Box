import "../App.css";
import { useState, useContext } from "react";
import Auth from "./Auth";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthContext from "../store/authContext";

 
function WelcomeComponent() {
  const authCtx = useContext(AuthContext);
  console.log(authCtx.token);
  const [view, setView] = useState("");
  const [register, setRegister] = useState(null);

  return (
    <div className="welcome-container">
      <div className="welcome">Welcome to</div>
      <div className="title"> The Recipe Box</div>
      <div className="auth-container">
        <h5
          className="auth-text"
          onClick={() => {
            setView("Auth");
            setRegister(true);
            return;
          }}
        >
          Sign-up
        </h5>
        <h5
          className="auth-text"
          onClick={() => {
            setView("Auth");
            setRegister(false);
          }}
        >
          Login
        </h5>
      </div>
      {view === "Auth" && (
        <Auth register={register} setRegister={setRegister} />
      )}
      
    </div>
  );
}

export default WelcomeComponent;
