import axios from "axios";
import React, { useState, useContext } from "react";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import "./recipeCard.css";
import AuthContext from "../store/authContext";
import {BarLoader} from "react-spinners";


const RecipeCard = ({ recipes, getRecipes }) => {
  console.log(recipes)
  const {userId, token} = useContext(AuthContext)
  const [loading, setLoading]=useState(true)
 

  const deleteRecipe= id => {
    window.confirm("Are you sure you want to delete this recipe?")
    axios.delete(`http://localhost:8900/recipes/${id}`,{
      headers: {
        authorization: token
      }
    })
    .then(()=>{
     alert("Delete succesfully")

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
              <ul className="ingredients-list">
                {recipe.ingredients.split(", ").map((i)=>{
                  return <li>{i}</li>
                })}
              </ul>
              <h5 className="subheader">Directions:</h5>
              <h5>{recipe.directions}</h5>
              <h5 className="subheader">Notes:</h5>
              <h5>{recipe.notes}</h5>
              
            </div>
            <div className="btns-container">
              {/* <button className="inputForm-btns" id="editBtn" type="button">
                Edit or Add a Note
              </button> */}
              {console.log(recipe)}
              <button className="inputForm-btns" onClick={()=> deleteRecipe(recipe.recipeId)}><DeleteOutlineIcon />         Delete</button>
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
