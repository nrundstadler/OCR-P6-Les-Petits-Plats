export class RecipesModel {
  constructor(recipes) {
    this.recipes = recipes; // Initial list of all recipes
    this.filteredRecipes = recipes; // List of filtered recipes, initially equal to all recipes

    // Object containing sets of selected tags for filtering recipes (tags with encodeURIComponent)
    this.tagsSelected = { ingredients: new Set(), appliances: new Set(), ustensils: new Set() };

    this.query = "";
  }

  searchRecipes() {
    const query = this.cleanQuery(this.query);

    // Step 1: Filter recipes based on the search query
    if (query.length < 3) {
      this.filteredRecipes = this.recipes; // Show all recipes if query is too short
    } else {
      this.filteredRecipes = this.recipes.filter((recipe) => {
        return (
          this.isInName(recipe, query) || this.isInDescription(recipe, query) || this.isInIngredients(recipe, query)
        );
      });
    }

    // Step 2: Filter recipes based on selected tags
    this.filteredRecipes = this.filteredRecipes.filter((recipe) => {
      // Check if the recipe matches all selected tags
      return this.matchTags(recipe);
    });
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

  matchTags(recipe) {
    // Check ingredients
    if (
      this.tagsSelected.ingredients.size > 0 &&
      ![...this.tagsSelected.ingredients].every((tag) =>
        recipe.ingredients.some((ingredient) => ingredient.ingredient.toLowerCase() === decodeURIComponent(tag)),
      )
    ) {
      return false;
    }

    // Check appliances
    if (
      this.tagsSelected.appliances.size > 0 &&
      ![...this.tagsSelected.appliances].every((tag) => recipe.appliance.toLowerCase() === decodeURIComponent(tag))
    ) {
      return false;
    }

    // Check ustensils
    if (
      this.tagsSelected.ustensils.size > 0 &&
      ![...this.tagsSelected.ustensils].every((tag) =>
        recipe.ustensils.some((ustensil) => ustensil.toLowerCase() === decodeURIComponent(tag)),
      )
    ) {
      return false;
    }

    return true;
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
      recipe.ingredients.forEach((ingredient) => {
        const ingredientName = ingredient.ingredient.toLowerCase();
        if (!this.tagsSelected.ingredients.has(encodeURIComponent(ingredientName))) {
          tags.ingredients.add(ingredientName);
        }
      });

      const applianceName = recipe.appliance.toLowerCase();
      if (!this.tagsSelected.appliances.has(encodeURIComponent(applianceName))) {
        tags.appliances.add(applianceName);
      }

      recipe.ustensils.forEach((ustensil) => {
        const ustensilName = ustensil.toLowerCase();
        if (!this.tagsSelected.ustensils.has(encodeURIComponent(ustensilName))) {
          tags.ustensils.add(ustensilName);
        }
      });
    });

    return {
      ingredients: [...tags.ingredients].sort((a, b) => a.localeCompare(b)),
      appliances: [...tags.appliances].sort((a, b) => a.localeCompare(b)),
      ustensils: [...tags.ustensils].sort((a, b) => a.localeCompare(b)),
    };
  }

  addOrRemoveTagSelected(tagType, tagValue, action) {
    // Check if the tag type is valid
    if (!this.tagsSelected[tagType]) {
      console.error(`Invalid tag type: ${tagType}`);
      return;
    }

    // Add the tag to the corresponding Set
    if (action === "add") {
      this.tagsSelected[tagType].add(tagValue);
    } else if (action === "remove") {
      this.tagsSelected[tagType].delete(tagValue);
    }
  }
}
