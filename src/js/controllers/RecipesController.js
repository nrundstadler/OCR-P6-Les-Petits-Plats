import { renderRecipesList } from "../components/recipesDisplay.js";
import { renderRecipesCounter } from "../components/recipesCounter.js";

export class RecipesController {
  constructor(recipes) {
    this.recipes = recipes;
    this.filteredRecipes = recipes;
  }

  showRecipes() {
    renderRecipesList(this.filteredRecipes);
    renderRecipesCounter(this.filteredRecipes.length);
  }

  searchRecipes(query) {
    // Remove spaces before/after and convert query to lowercase
    query = query.trim().toLowerCase();

    // If query is less than 3 characters, show all recipes
    if (query.length < 3) {
      this.filteredRecipes = this.recipes;
    } else {
      this.filteredRecipes = this.recipes.filter((recipe) => {
        // Check if any of the criteria match, return true immediately when found
        return (
          recipe.name.toLowerCase().includes(query) ||
          recipe.description.toLowerCase().includes(query) ||
          recipe.ingredients.some((ingredient) => ingredient.ingredient.toLowerCase().includes(query))
        );
      });
    }

    this.showRecipes(); // Show filtered recipes
  }
}
