import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import AuthContext from "../store/authContext";
import RecipeCard from "./RecipeCard";
import Header from "./Header";
import Footer from "./Footer";
import { BarLoader } from "react-spinners";


const CategoryDisplay = () => {
  let { category } = useParams();
  console.log(category);
  const { token, userId } = useContext(AuthContext);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);


  const baseURL = "http://localhost:8900";
  const getRecipes = async () => {
    console.log(userId);
    const res = await
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
        setTimeout(()=>{
          setLoading(false)
        }, 1000)
        
      })
      .catch((err) => console.error(err));
      // setLoading(false);
  };
  useEffect(() => {
    getRecipes();
  }, [category]);
  console.log(recipes);

  //   if (loading) return <BarLoader color="#81b29a" />;
  // if(recipes.length ===0) return <h2>"Not Found"</h2>

  return (
    <div className="home-container">
      <Header></Header>
      <div className="recipeCard-header"> {`${category}`} </div>
      {loading ? (
        <BarLoader color="#81b29a" />
      ) : (
      <RecipeCard
        recipes={recipes}
        getRecipes={getRecipes}
        setRecipes={setRecipes}
      />
      )}
      <Footer></Footer>
    </div>
  );
};

export default CategoryDisplay;
