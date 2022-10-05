import React from "react";
import Header from "../Header";
import "./profile.css";
import { Link } from "react-router-dom";
import Footer from "../Footer";

const Profile = ({ recipes }) => {
  return (
    <div>
      <Header></Header>
      <div className="home-container">
        <div className="profile-title">Welcome</div>
        <p className="about">
          {" "}
          The days spent looking all over the kitchen for that one recipe are
          over. Enter all your favorite recipes into The Recipe Box to quickly
          find it again.{" "}
        </p>
        <div className="category-container">
          <div className="contents">Table of Contents</div>
          <Link to={"/category/bread"}>
            <button className="category-btn">Bread</button>
          </Link>
          <Link to={"/category/breakfast"}>
            <button className="category-btn">Breakfast</button>
          </Link>
          <Link to={"/category/drinks"}>
            <button className="category-btn">Drinks</button>
          </Link>
          <Link to={"/category/soup-salads-side"}>
            <button className="category-btn">Soup, Salads, and Sides</button>
          </Link>
          <Link to={"/category/main"}>
            <button className="category-btn">Main</button>
          </Link>
          <Link to={"/category/sweets"}>
            <button className="category-btn">Sweets</button>
          </Link>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Profile;
