import React, { useState, useContext } from "react";
import "./header.css";
import AuthContext from "../store/authContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink, Link, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
const Header = ({ recipes }) => {
  const [username] = useState(localStorage.getItem("username"));
  const [search, setSearch] = useState();
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const styleActiveLink = ({ isActive }) => {
    return {
      color: isActive ? "rgb(242, 204, 143)" : " rgb(61,61,91)",
      textDecoration: "none",
    };
  };
  const handleClick = () => {
    navigate(`/searchResults/${search}`);
    setSearch("");
  };

  return (
    <header className="header">
      <h2 className="headerTitle">The Recipe Box</h2>
      <div className="logout-container">
        <p className="loggedInState">{username ? `Hi, ${username}` : "Hi"}</p>
        <p className="logout-Btn" onClick={() => authCtx.logout()}>
          Logout
        </p>
      </div>
      <div className="main-nav">
        <div className="nav-links">
          <NavLink to="/profile" className="navlink-text">
            Home
          </NavLink>
          <NavLink
            // style={styleActiveLink}
            to="/addRecipe"
            className="navlink-text"
          >
            Add a Recipe
          </NavLink>
          <NavLink
            // style={styleActiveLink}
            to="/recipes"
            className="navlink-text"
          >
            Show all
          </NavLink>
        </div>
        <div className="search-wrapper">
          <input
            className="searchbar"
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          {/* <Link to={`/SearchResults/${search}`}> */}
          <div className="search-btn" onClick={handleClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bibi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
          {/* <SearchIcon className="searchIcon" onClick={handleClick}/> */}
          </div>
          {/* </Link> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
