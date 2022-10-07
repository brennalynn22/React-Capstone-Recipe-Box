import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import AuthContext from "../store/authContext";
import RecipeCard from "./RecipeCard";
import Header from "./Header";
import Footer from "./Footer";
import {BarLoader} from "react-spinners";




const SearchResultComponent = () => {
  let {searchTerm} = useParams()
  console.log(searchTerm)
  const { token, userId } = useContext(AuthContext);
  const [ recipes, setRecipes ] = useState([]);
  const [loading, setLoading]=useState(true);
  const[loadedData, setLoadedData]=useState();
  // useEffect(()=>{
  //   setLoading(true);
  //   setTimeout(()=>{
  //     setLoading(false)
  //   }, 2000)
  // },[])

  const baseURL = "http://localhost:8900";
  const getRecipes = async()=>{
    setLoading(true);
    console.log(userId)
    const res  = await
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
        setTimeout(()=>{
          setLoading(false)
        }, 1000)
      })
      .catch(err =>console.error(err))
      // setLoading(false)
  }
  useEffect(() => {
   getRecipes()
  }, [searchTerm]);
console.log(recipes)

// if (loading) return <BarLoader color="##3d3d5b" />
// if(recipes.length ===0) return <h2>"Not Found"</h2>

  return (
    <div className="home-container">
      <Header></Header>
      <div className="recipeCard-header"> Search Results </div>
      { loading ? ( 
        <BarLoader color="81b29a" height={8}
        width={200}/>
      ) : (
      <RecipeCard recipes={recipes} getRecipes={getRecipes} setRecipes={setRecipes}/>
       )} 
      <Footer></Footer>
    </div>
  )
}

export default SearchResultComponent