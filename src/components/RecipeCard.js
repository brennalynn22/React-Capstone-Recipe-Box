import axios from "axios";
import React, { useState, useEffect, useContext, useCallback } from "react";

import "./recipeCard.css";
import AuthContext from "../store/authContext";


const RecipeCard = ({ recipes, getRecipes }) => {
  const {userId, token} = useContext(AuthContext)


  const deleteRecipe= id => {
    window.confirm("Are you sure you want to delete this recipe?")
    axios.delete(`http://localhost:8900/recipes/${id}`,{
      headers: {
        authorization: token
      }
    })
    .then(()=>{
     alert("Delete succesfully")
    //  .location.reload()

     getRecipes()
    })
    .catch((err)=>{ 
      console.log(err)
    })
  }


  return (
    <div className="recipe-container" >
      {recipes.length !==0 ? (
        recipes.map((recipe, index) => (
          <div className="recipe-card">
            <div className="title-container">
              <h3 className="recipeStamp">Recipe:</h3>
              <h3 className="recipeTitle">{recipe.title}</h3>
            </div>
            <h4 className="from-container">From: {recipe.creator}</h4>
            <h5 className="category-display"> {recipe.category}</h5>

            <div className="instructions-container">
              <h5 className="subheader">Ingredients:</h5>
              <li className="ingredients-list">
                <h5>{recipe.ingredients}</h5>
              </li>
              <h5 className="subheader">Directions:</h5>
              <h5>{recipe.directions}</h5>
              <h5 className="subheader">Notes:</h5>
              <h5>{recipe.notes}</h5>
              
            </div>
            <div className="btns-container">
              <button className="inputForm-btns" id="editBtn" type="button">
                Edit or Add a Note
              </button>
              {console.log(recipe)}
              <button className="inputForm-btns" onClick={()=> deleteRecipe(recipe.recipeId)}>Delete</button>
            </div>
          </div>
        ))
      ) : (
        <h3> There are no recipes :( </h3>
      )}
    </div>
  );
};

export default RecipeCard;
