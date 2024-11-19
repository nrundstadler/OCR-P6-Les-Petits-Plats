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
      // Create an empty array to contain filtered recipes
      this.filteredRecipes = [];

      // Loop through each recipe
      for (let i = 0; i < this.recipes.length; i++) {
        const recipe = this.recipes[i];

        // Check if the recipe matches the query
        let matchFound = false;

        // Check if the name or description matches
        if (recipe.name.toLowerCase().includes(query) || recipe.description.toLowerCase().includes(query)) {
          matchFound = true;
        } else {
          // Check if any ingredient matches the query
          for (let j = 0; j < recipe.ingredients.length; j++) {
            if (recipe.ingredients[j].ingredient.toLowerCase().includes(query)) {
              matchFound = true;
              break; // Exit the loop early if a match is found
            }
          }
        }

        // If a match is found, add the recipe to the filtered list
        if (matchFound) {
          this.filteredRecipes.push(recipe);
        }
      }
    }

    this.showRecipes(); // Show filtered recipes
  }
}
