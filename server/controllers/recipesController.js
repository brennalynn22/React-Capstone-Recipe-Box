require("dotenv").config();
const { User } = require("../models/user");
const { Recipe } = require("../models/recipes");

module.exports = {
  //If I wanted ot add checks to make sure things werent empty
  addRecipe: async (req, res) => {
    try {
      const { title, creator, category ,ingredients, directions, notes, userId } =
        req.body;
      await Recipe.create({
        title,
        creator,
        category,
        ingredients,
        directions,
        notes,
        userId,
      });
      res.status(200).send("recipe added");
    } catch (error) {
      console.log(error);
      res.status(400).send("Cannot add recipe");
    }
  },
  
  getAllUserRecipes: async (req, res) => {
    try {
      const { userId } = req.params;
      console.log(userId)
      const recipes = await Recipe.findAll({
        where: { userId: userId },
        raw: true,
        include: [
          {
            model: User,
            required: true,
            attributes: [`username`],
          },
        ], 
      });
      console.log("these are all recipes", recipes)
      res.status(200).send(recipes);
    } catch (error) {
      console.log(error);
      console.log("error in getting user recipes");
      res.sendStatus(400);
    }
  },

  ///is this right and what would be passed in to update---key value pairs
  editRecipe: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, creator, category, ingredients, directions, notes } = req.body;
      await Recipe.update({title, creator, category, ingredients, directions, notes}, { where: { id: +id } });
      res.sendStatus(200);
      console.log("recipe changed");
    } catch (error) {
      console.log(error);
      console.log("error in updating recipe");
      res.sendStatus(400);
    }
  },
  //look into adding a pop up confirmation to delete
  deleteRecipe: async (req, res) => {
    try {
      const { id } = req.params;
      await Recipe.destroy({ where: { recipeId: id } });
      res.sendStatus(200);
      console.log("Recipe was deleted");
    } catch (error) {
      console.log("cannot delete");
      res.sendStatus(400);
    }
  },
};
