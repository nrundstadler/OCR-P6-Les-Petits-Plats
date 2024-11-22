export class RecipesController {
  constructor(model, view) {
    this.model = model; // Handles data and logic
    this.view = view; // Handles rendering
  }

  // Initializes the app and sets up event listeners
  init() {
    this.updateView(); // Show all recipes initially

    // Listen for user input in the search bar
    const $searchInput = document.getElementById("recipes-search");
    $searchInput.addEventListener("input", (e) => {
      this.handleSearch(e.target.value);
    });
  }

  // Handles the search logic
  handleSearch(query) {
    this.model.searchRecipes(query); // Filter recipes based on the query
    this.updateView(); // Update the view with filtered recipes
  }

  // Updates recipes list and counter
  updateView() {
    this.view.renderRecipes(this.model.filteredRecipes);
    this.view.renderCounter(this.model.filteredRecipes.length);
  }
}
