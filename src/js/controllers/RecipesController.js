import { renderRecipesList } from "../components/recipesDisplay.js";
import { renderRecipesCounter } from "../components/recipesCounter.js";

export class RecipesController {
  constructor(recipes) {
    this.recipes = recipes; // Initial list of all recipes
    this.filteredRecipes = recipes; // List of filtered recipes, initially equal to all recipes
  }

  showRecipes() {
    renderRecipesList(this.filteredRecipes);
    renderRecipesCounter(this.filteredRecipes.length);
  }

  searchRecipes(query) {
    query = this.cleanQuery(query);

    // If query is less than 3 characters, show all recipes
    if (query.length < 3) {
      this.filteredRecipes = this.recipes;
    } else {
      this.filteredRecipes = this.recipes.filter((recipe) => {
        // Check if any of the criteria match, return true immediately when found
        return (
          this.isInName(recipe, query) || this.isInDescription(recipe, query) || this.isInIngredients(recipe, query)
        );
      });
    }

    this.showRecipes(); // Show filtered recipes
  }

  // Helper method to clean the query
  // (remove extra spaces, convert to lowercase, and prevent XSS attacks)
  cleanQuery(query) {
    return query.trim().toLowerCase().replace(/[<>]/g, "");
  }

  // Helper method to check if the query matches the recipe name.
  isInName(recipe, query) {
    return recipe.name.toLowerCase().includes(query);
  }

  // Helper method to check if the query matches the recipe description.
  isInDescription(recipe, query) {
    return recipe.description.toLowerCase().includes(query);
  }

  // Helper method to check if the query matches any ingredient in the recipe.
  isInIngredients(recipe, query) {
    return recipe.ingredients.some((ingredient) => ingredient.ingredient.toLowerCase().includes(query));
  }
}
