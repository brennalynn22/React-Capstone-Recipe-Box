import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/authContext";
import Header from "../Header";
import "./addRecipe.css";

const AddRecipeComponent = () => {
  const { token, userId } = useContext(AuthContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [creator, setCreator] = useState("");
  const[category, setCategory]=useState('')
  const [ingredients, setIngredients] = useState("");
  const [directions, setDirections] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("ASDFGFGHJK");
    axios
      .post(
        "http://localhost:8900/recipes",
        { title, creator, category, ingredients, directions, notes, userId },
        { headers: { authorization: token } }
      )
      .then(() => {
        alert("Recipe successfully added");
        navigate("/Recipes");
      })
      .catch((err) => {
        console.log(err);
        alert("Error, recipe could not be added");
      });
  };

  return (
    <div className="home-container">
      <Header />
      <div className="addRecipe-container">
        <div className="addRecipe-title"> Add a Recipe</div>
        <form className="addRecipe-form" onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="title" id="recipeHeader">
            Recipe:
          </label>
          <input
            type="text"
            id="title"
            placeholder="Enter recipe title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="creator" id="creatorHeader">
            From:
          </label>
          <input
            type="text"
            id="creator"
            placeholder="Who is it from?"
            value={creator}
            onChange={(e) => setCreator(e.target.value)}
          />
          <div className="radio-container">
            <label htmlFor="category" id="categoryHeader">
          Category:
        </label>
        <label>
        <input
          type="radio"
          id="category"
          name="category"
          value="Bread"
          // checked={{e.state.selectedOption === "Bread"}}
          onChange={(e) => setCategory(e.target.value)}
        /> Bread </label>
        <label>
        <input
          type="radio"
          id="category"
          name="category"
          value="Breakfast"
          // checked={{e.state.selectedOption === "Breakfast"}}
          onChange={(e) => setCategory(e.target.value)}
        /> Breakfast </label>
        <label>
        <input
          type="radio"
          id="category"
          name="category"
          value="Drinks"
          // checked={{e.state.selectedOption === "Drinks"}}
          onChange={(e) => setCategory(e.target.value)}
        /> Drinks </label>
        <label>
        <input
          type="radio"
          id="category"
          name="category"
          value="Main"
          // checked={{e.state.selectedOption === Maint"}}
          onChange={(e) => setCategory(e.target.value)}
        /> Main </label>
        <label>
        <input
          type="radio"
          id="category"
          name="category"
          value="Soup, Salad, and Sides"
          // checked={{e.state.selectedOption === "Soup, Salad, and Sides"}}
          onChange={(e) => setCategory(e.target.value)}
        /> Soup, Salad, and Sides </label>
        <label>
        <input
          type="radio"
          id="category"
          name="category"
          value="Sweets"
          // checked={{e.state.selectedOption === "Sweets"}}
          onChange={(e) => setCategory(e.target.value)}
        /> Sweets </label>
        </div>

          <label htmlFor="ingredients">Ingredients:</label>
          <textarea
            type="text"
            className="textareaContainer"
            id="ingredients"
            placeholder="Enter ingredients separated by commas..."
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            rows="5"
          ></textarea>

          <label htmlFor="directions">Directions:</label>
          <textarea
            type="text"
            className="textareaContainer"
            id="directions"
            placeholder="Enter directions..."
            value={directions}
            onChange={(e) => setDirections(e.target.value)}
            rows="5"
          ></textarea>

          <label htmlFor="Notes">Notes:</label>
          <textarea
            type="text"
            className="textareaContainer"
            id="notes"
            placeholder="Add notes or comments..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows="2"
          ></textarea>
          <button id="addRecipeBtn">Add Recipe</button>
        </form>
      </div>
    </div>
  );
};

export default AddRecipeComponent;
