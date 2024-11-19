import { recipes as recipesData } from "./data/recipes.js";
import { RecipesController } from "./controllers/RecipesController.js";

function initApp() {
  const recipesController = new RecipesController(recipesData);

  recipesController.showRecipes();
}

initApp();
