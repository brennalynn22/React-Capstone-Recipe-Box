import React, { useState, useContext } from "react";
import "./header.css";
import AuthContext from "../store/authContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink, Link , useNavigate} from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import RecipeCard from "./RecipeCard";

const Header = ({ recipes }) => {
  const [username] = useState(localStorage.getItem("username"));
  const [search, setSearch] = useState();
  const authCtx = useContext(AuthContext);
  const navigate=useNavigate();

  const styleActiveLink = ({ isActive }) => {
    return {
      color: isActive ? "rgb(242, 204, 143)" : " rgb(61,61,91)",
      textDecoration: "none"
    };
  };
  const handleClick= ()=>{
    navigate(`/searchResults/${search}`)
    setSearch('')
  }

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
          <NavLink style={styleActiveLink} to="/profile" className="home">
            Home
          </NavLink> 
          <NavLink style={styleActiveLink} to="/addRecipe" className="addARecipe">
            Add a Recipe
          </NavLink>
          <NavLink style={styleActiveLink} to="/recipes" className="showAll">
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
            <button className="searchbtn" onClick={handleClick}>
              <SearchIcon />
            </button>
          {/* </Link> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
