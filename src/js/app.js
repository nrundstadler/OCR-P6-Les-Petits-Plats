import { recipes as recipesData } from "./data/recipes.js";
import { RecipesModel } from "./models/RecipesModel.js";
import { RecipesView } from "./views/RecipesView.js";
import { TagsView } from "./views/TagsView.js";
import { RecipesController } from "./controllers/RecipesController.js";

function initApp() {
  const model = new RecipesModel(recipesData);
  const recipesView = new RecipesView();
  const tagsView = new TagsView();
  const controller = new RecipesController(model, recipesView, tagsView);

  controller.init(); // Initialize the app
}

initApp();
