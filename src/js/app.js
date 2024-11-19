import { recipes as recipesData } from "./data/recipes.js";
import { RecipesController } from "./controllers/RecipesController.js";

function initApp() {
  const recipesController = new RecipesController(recipesData);

  // Instant search (triggered as soon as the user types)
  const searchInput = document.getElementById("recipes-search");
  searchInput.addEventListener("input", (e) => {
    recipesController.searchRecipes(e.target.value);
  });

  // Display all recipes by default
  recipesController.showRecipes();
}

initApp();
