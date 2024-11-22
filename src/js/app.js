import { recipes as recipesData } from "./data/recipes.js";
import { RecipesModel } from "./models/RecipesModel.js";
import { RecipesView } from "./views/RecipesView.js";
import { RecipesController } from "./controllers/RecipesController.js";

function initApp() {
  const model = new RecipesModel(recipesData); // Create the model
  const view = new RecipesView(); // Create the view
  const controller = new RecipesController(model, view); // Create the controller

  controller.init(); // Initialize the app
}

initApp();
