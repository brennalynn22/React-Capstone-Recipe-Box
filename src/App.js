import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { useContext } from "react";
import AuthContext from "./store/authContext";

import WelcomeComponent from "./components/welcomeComponent";
import Profile from "./components/profileComponents/Profile";
import AddRecipe from "./components/addRecipeComponents/AddRecipeComponent";
import DisplayAllRecipes from "./components/displayRecipeComponent/DisplayAllRecipeComponent";
import SearchResultComponent from "./components/SearchResultComponent";
import CategoryDisplayComponent from "./components/CategoryDisplayComponent";

function App() {
  const authCtx = useContext(AuthContext);
  console.log(authCtx.token);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            !authCtx.token ? <WelcomeComponent /> : <Navigate to="/profile" />
          }
        />
        <Route
          path="/profile"
          element={authCtx.token ? <Profile /> : <Navigate to="/" />}
        />
        <Route
          path="/AddRecipe"
          element={authCtx.token ? <AddRecipe /> : <Navigate to="/" />}
        />
        <Route
          path="/Recipes"
          element={authCtx.token ? <DisplayAllRecipes /> : <Navigate to="/" />}
        />
        <Route
          path="/SearchResults/:searchTerm"
          element={
            authCtx.token ? <SearchResultComponent /> : <Navigate to="/" />
          }
        />
        <Route
          path="/Chapter/:category"
          element={
            authCtx.token ? <CategoryDisplayComponent /> : <Navigate to="/" />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
