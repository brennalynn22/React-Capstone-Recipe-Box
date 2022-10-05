require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
const { SERVER_PORT } = process.env;

const { sequelize } = require("./util/database");
const { User } = require("./models/user");
const{Recipe}= require("./models/recipes");

const { login, register } = require("./controllers/auth-server");
const { isAuthenticated } = require("./middleware/isAuthenticated");
const {
  deleteRecipe,
  addRecipe,
  getAllUserRecipes,
  editRecipe,
} = require("./controllers/recipesController");
const user = require("./models/user");


app.use(express.json());
app.use(cors());

User.hasMany(Recipe, {foreignKey:'userId', onDelete:'CASCADE'});
Recipe.belongsTo(User, {foreignKey:'userId', onDelete:'CASCADE'});

app.post("/auth/login", login);
app.post("/auth/register", register);

//add post for comments, 
//or should get also have isAuth...
app.get("/recipes/:userId", getAllUserRecipes);
app.post("/recipes", isAuthenticated, addRecipe);
app.put("/recipes/:id", isAuthenticated, editRecipe);
app.delete("/recipes/:id", isAuthenticated, deleteRecipe);

sequelize
  .sync()
  .then(() => {
   
    app.listen(SERVER_PORT, () =>
      console.log(`dB sync successful & listening on port ${SERVER_PORT}`)
    );
  })
  .catch((err) => console.log(err));
