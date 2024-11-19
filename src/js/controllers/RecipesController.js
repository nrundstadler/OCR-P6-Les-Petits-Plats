import { renderRecipesList } from "../components/recipesDisplay.js";
import { renderRecipesCounter } from "../components/recipesCounter.js";

export class RecipesController {
  constructor(recipes) {
    this.recipes = recipes;
  }

  showRecipes() {
    renderRecipesList(this.recipes);
    renderRecipesCounter(this.recipes.length);
  }
}
