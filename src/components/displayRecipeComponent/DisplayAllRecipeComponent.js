import React, { useEffect, useState, useContext } from "react";
import Header from "../Header";
// import "./displayAllRecipes.css";
import RecipeCard from "../RecipeCard";
import axios from "axios";
import AuthContext from "../../store/authContext";

const DisplayAllRecipeComponent = () => {
  const { token, userId } = useContext(AuthContext);
  const [ recipes, setRecipes ] = useState([]);

  const baseURL = "http://localhost:8900";
  const getRecipes =()=>{
    console.log(userId)
    axios.get(`${baseURL}/recipes/${userId}`, {
        headers: {
          authorization: token,
        },
      })
      .then((res)=>{
        console.table(res.data)
        setRecipes([...recipes, ...res.data])
      })
      .catch(err =>console.error(err))
  }
  useEffect(() => {
   getRecipes()
  }, [userId]);
console.log(recipes)
  return (
    <div className="home-container">
      <Header></Header>
      <div className="recipeCard-header">All of Your Recipes</div>
      <RecipeCard recipes={recipes} getRecipes={getRecipes} setRecipes={setRecipes}/>
    </div>
  );
};

export default DisplayAllRecipeComponent;
