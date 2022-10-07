import React, { useEffect, useState, useContext } from "react";
import Header from "../Header";
import RecipeCard from "../RecipeCard";
import axios from "axios";
import AuthContext from "../../store/authContext";
import Footer from "../Footer";
import { BarLoader } from "react-spinners";

const DisplayAllRecipeComponent = () => {
  const { token, userId } = useContext(AuthContext);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(()=>{
  //   setLoading(true);
  //   setTimeout(()=>{
  //     setLoading(false)
  //   }, 2000)
  // },[])

  const baseURL = "http://localhost:8900";
  const getRecipes =  async() => {
    console.log(userId);
    const res =await
   axios
      .get(`${baseURL}/recipes/${userId}`, {
        headers: {
          authorization: token,
        },
      })
      .then((res) => {
        console.table(res.data);
        setRecipes([...res.data]);
        setTimeout(()=>{
          setLoading(false)
        }, 1000)
        
      })
      .catch((err) => console.error(err));
    // setLoading(false);
  };
  useEffect(() => {
    getRecipes();
  }, [userId]);
  console.log(recipes);

  

  // if (loading) return <BarLoader color="#81b29a" />;
  // if(recipes.length ===0) return <h2>"Not Found"</h2>
  return (
    <div className="home-container">
      <Header></Header>
      <div className="recipeCard-header">All of Your Recipes</div>

      {loading ? (
        <BarLoader color="#81b29a"  height={8}
        width={200}/>
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

export default DisplayAllRecipeComponent;
