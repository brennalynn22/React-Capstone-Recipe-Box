import React, { useState, useContext } from "react";
import "./header.css";
import AuthContext from "../store/authContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink } from "react-router-dom";
import RecipeCard from "./RecipeCard";

const Header = ({ recipes }) => {
  const [username] = useState(localStorage.getItem("username"));
  const [search, setSearch] = useState();
  const authCtx = useContext(AuthContext);

 

  const styleActiveLink = ({ isActive }) => {
    return {
      color: isActive ? "rgb(242, 204, 143)" : "",
    };
  };

  return (
    <div className="header">
      <h2 className="headerTitle">The Recipe Box</h2>
      <div className="logout-container">
        <p className="loggedInState">{username ? `Hi, ${username}` : "Hi"}</p>
        <p className="logout-Btn" onClick={() => authCtx.logout()}>
          Logout
        </p>
      </div>
      <div className="main-nav">
        <NavLink style={styleActiveLink} to="/profile">
          Home
        </NavLink>
        <NavLink style={styleActiveLink} to="/AddRecipe">
          Add a Recipe
        </NavLink>
        <NavLink style={styleActiveLink} to="/Recipes">
          Show all
        </NavLink>
        <div className="search-input">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <NavLink
           to={`/SearchResults/${search}`}
           >Search</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Header;
