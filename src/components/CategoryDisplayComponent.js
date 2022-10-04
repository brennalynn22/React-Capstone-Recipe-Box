import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import AuthContext from "../store/authContext";
import RecipeCard from "./RecipeCard";
import Header from "./Header";

const CategoryDisplay = () => {
  let { category } = useParams();
  console.log(category);
  const { token, userId } = useContext(AuthContext);
  const [recipes, setRecipes] = useState([]);

  const baseURL = "http://localhost:8900";
  const getRecipes = () => {
    console.log(userId);
    axios
      .get(`${baseURL}/recipes/${userId}`, {
        headers: {
          authorization: token,
        },
      })
      .then((res) => {
        console.table(res.data);
        const filteredRecipes = res.data.filter((recipe, index) => {
          return recipe.category.toLowerCase().includes(category.toLowerCase());
        });
        setRecipes(filteredRecipes);
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    getRecipes();
  }, [category]);
  console.log(recipes);

  return (
    <div className="home-container">
      <Header></Header>
      {/* <div className="recipeCard-header"> {`category`} </div> */}
      <RecipeCard
        recipes={recipes}
        getRecipes={getRecipes}
        setRecipes={setRecipes}
      />
    </div>
  );
};

export default CategoryDisplay;
