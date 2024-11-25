export class RecipesController {
  constructor(model, recipesView, tagsView) {
    this.model = model; // Handles data and logic
    this.recipesView = recipesView; // Handles rendering recipes
    this.tagsView = tagsView; // Handles rendering tags
  }

  // Initializes the app and sets up event listeners
  init() {
    this.updateView(); // Show all recipes initially
    this.setupTagsMenusInteractions();

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

  // Updates recipes list, counter and tags
  updateView() {
    this.recipesView.renderRecipes(this.model.filteredRecipes);
    this.recipesView.renderCounter(this.model.filteredRecipes.length);

    const tags = this.model.getTags();
    this.tagsView.renderTagsLists(tags);
  }

  // Manages opening/closing of menus and handling clicks on options
  setupTagsMenusInteractions() {
    const menus = document.querySelectorAll("[data-menu]");

    menus.forEach((menu) => {
      const button = menu.querySelector("button");
      const dropdown = menu.querySelector("div");
      const optionsList = dropdown.querySelector("ul");

      // Listens for clicks to open/close the menu
      button.addEventListener("click", () => {
        // Close all other menus
        menus.forEach((m) => {
          if (m !== menu) {
            this.tagMenuToggle(m.querySelector("div"), m.querySelector("button"), false); // Close other menus
          }
        });

        // Toggle the current menu
        this.tagMenuToggle(dropdown, button, dropdown.hasAttribute("hidden")); // If it's open, close it, if it's closed, open it
      });

      // Handles clicks on options inside the menu
      optionsList.addEventListener("click", (event) => {
        if (event.target.tagName.toLowerCase() === "button") {
          this.handleTagClick(event.target);
          this.tagMenuToggle(dropdown, button, false);
        }
      });
    });
  }

  // Handles the opening/closing of a filter menu
  tagMenuToggle(dropdown, button, open) {
    button.setAttribute("aria-expanded", open);
    if (open) {
      dropdown.removeAttribute("hidden");
      button.classList.replace("rounded-lg", "rounded-t-lg");
    } else {
      dropdown.setAttribute("hidden", true);
      button.classList.replace("rounded-t-lg", "rounded-lg");
    }
  }

  // Handles the action when an option button is clicked
  handleTagClick(button) {
    const tagValue = button.dataset.value;
    console.log("Tag clicked:", tagValue);
    this.updateView();
  }
}
