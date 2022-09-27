import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { useContext } from "react";
import AuthContext from "./store/authContext";
import WelcomeComponent from "./components/welcomeComponent";
import Profile from "./components/profileComponents/profile";

function App() {
  const authCtx = useContext(AuthContext);
  console.log(authCtx.token);
  // for the routes do they work in cascading fashion..... want the welcom to only load if theres no token and if theres a token to go to the profile page
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={!authCtx.token ? <WelcomeComponent/> : <Navigate to= '/profile'/>} />
        <Route
          path='/profile'
          element={authCtx.token ? <Profile /> : <Navigate to= '/' />}
        />
      </Routes>
    </div>
  );
}

export default App;
