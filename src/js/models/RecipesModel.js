export class RecipesModel {
  constructor(recipes) {
    this.recipes = recipes; // Initial list of all recipes
    this.filteredRecipes = recipes; // List of filtered recipes, initially equal to all recipes
  }

  searchRecipes(query) {
    query = this.cleanQuery(query);

    // If query is less than 3 characters, show all recipes
    if (query.length < 3) {
      this.filteredRecipes = this.recipes;
    } else {
      this.filteredRecipes = this.recipes.filter((recipe) => {
        return (
          this.isInName(recipe, query) || this.isInDescription(recipe, query) || this.isInIngredients(recipe, query)
        );
      });
    }
  }

  // Clean the query
  // (remove spaces before and after the query, convert to lowercase, and prevent XSS attacks)
  cleanQuery(query) {
    return query.trim().toLowerCase().replace(/[<>]/g, "");
  }

  // Check if the query matches the recipe name
  isInName(recipe, query) {
    return recipe.name.toLowerCase().includes(query);
  }

  // Check if the query matches the recipe description
  isInDescription(recipe, query) {
    return recipe.description.toLowerCase().includes(query);
  }

  // Check if the query matches any ingredient in the recipe
  isInIngredients(recipe, query) {
    return recipe.ingredients.some((item) => item.ingredient.toLowerCase().includes(query));
  }

  // Retrieves unique filter options for ingredients, appliances, and ustensils
  // by iterating over all recipes and extracting the data
  getTags() {
    const tags = {
      ingredients: new Set(),
      appliances: new Set(),
      ustensils: new Set(),
    };

    this.filteredRecipes.forEach((recipe) => {
      recipe.ingredients.forEach((ingredient) => tags.ingredients.add(ingredient.ingredient.toLowerCase()));
      tags.appliances.add(recipe.appliance.toLowerCase());
      recipe.ustensils.forEach((ustensil) => tags.ustensils.add(ustensil.toLowerCase()));
    });

    return {
      ingredients: [...tags.ingredients].sort((a, b) => a.localeCompare(b)),
      appliances: [...tags.appliances].sort((a, b) => a.localeCompare(b)),
      ustensils: [...tags.ustensils].sort((a, b) => a.localeCompare(b)),
    };
  }
}
