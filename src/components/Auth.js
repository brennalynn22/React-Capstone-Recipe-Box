import React, { useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../store/authContext";
import { NavLink } from "react-router-dom";

const Auth = ({ register, setRegister }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  //should I also have display

  const authCtx = useContext(AuthContext);

  const submitHandler = (e) => {
    e.preventDefault();
    let body;
    if (register) {
       body = {
        name,
        username,
        password,
      };
    } else {
      body = {
        username,
        password,
      };
    }
    

    const url = "http://localhost:8900/auth";

    axios
      .post(register ? `${url}/register` : `${url}/login`, body)
      .then((res) => {
        console.log(res.data);
        authCtx.login(res.data.token, res.data.exp, res.data.userId);
        return <NavLink to="/profile"/>
      })
      .catch((err) => {
        setMessage(err.response.data);
        setName("");
        setPassword("");
        setUsername("");
        console.log("error");
      });
  };

  return (
    <main>
      <form className="form-auth form" onSubmit={submitHandler}>
        {register && (
          <input
            className="form-input"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
        <input
          className="form-input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="form-input"
          type="text"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="form-btn">{!register ? "Login" : "Sign up"}</button>
      </form>
      {/* <p className='form-text' onClick={() => setRegister(!register)}>{!register ? 'Need an account?' : 'Already have an account?'}</p> */}
      <button className="form-btn" onClick={() => setRegister(!register)}>
        Need to {register ? "Login" : "Sign up"}?
      </button>
    </main>
  );
};

export default Auth;
