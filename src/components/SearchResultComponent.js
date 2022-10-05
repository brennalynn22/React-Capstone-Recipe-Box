import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import AuthContext from "../store/authContext";
import RecipeCard from "./RecipeCard";
import Header from "./Header";
import Footer from "./Footer";




const SearchResultComponent = () => {
  let {searchTerm} = useParams()
  console.log(searchTerm)
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
        const filteredRecipes = res.data.filter((recipe, index) => {
            let title = recipe.title.toLowerCase();
            let category = recipe.category.toLowerCase();
            let creator = recipe.creator.toLowerCase();
            let searchParams = searchTerm.toLowerCase();
            return title.includes(searchParams) || category.includes(searchParams)|| creator.includes(searchParams);
          })
        setRecipes(filteredRecipes)
      })
      .catch(err =>console.error(err))
  }
  useEffect(() => {
   getRecipes()
  }, [searchTerm]);
console.log(recipes)

  return (
    <div className="home-container">
      <Header></Header>
      <div className="recipeCard-header"> Search Results </div>
      <RecipeCard recipes={recipes} getRecipes={getRecipes} setRecipes={setRecipes}/>
      <Footer></Footer>
    </div>
  )
}

export default SearchResultComponent