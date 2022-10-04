import React from "react";
import Header from "../Header";
import "./profile.css";
import RecipeCard from "../RecipeCard";

const Profile = ({recipes}) => {

  // let filtered = recipes.filter(recipe=>{
  //   return recipe.category=== 'Drinks'
  //   console.log(filtered)
  // });

  return (
    <div>
      <Header></Header>
      <div className="home-container">
        < div className="profile-title">Welcome</div>
        <p className="about"> The days spent looking all over the kitchen for that one recipe are over. Enter all your favorite recipes into The Recipe Box to quickly find it again. You can also edit and add notes, so you no longer have to guess which recipes you double or what is Jeff's favorite dish </p>
        <div className="category-container"> Table of Contents
          <button className="category-btn" 
          >Bread</button>
          <button className="category-btn">Breakfast</button>
          <button className="category-btn">Drinks</button>
          <button className="category-btn">Soup, Salads, and Sides</button>
          <button className="category-btn">Main</button>
          <button className="category-btn">Sweets</button>
 
        </div>
        

      </div>
    </div>
  );
};

export default Profile;
