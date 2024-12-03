import { initFilterListsTags } from "../components/filterListTags.js";

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
    this.setupTagsSelectedInteractions();

    // Listen for user input in the search bar
    const $searchInput = document.getElementById("recipes-search");
    $searchInput.addEventListener("input", (e) => {
      this.handleSearch(e.target.value);
    });

    initFilterListsTags();
  }

  // Handles the search logic
  handleSearch(query) {
    this.model.query = query;
    this.model.searchRecipes(); // Filter recipes based on the query
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
    const menus = document.querySelectorAll("[data-tags-type]");

    menus.forEach((menu) => {
      const tagType = menu.getAttribute("data-tags-type");
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
          this.handleToggleTag(event.target.dataset.value, tagType, "add");
          this.tagsView.renderTagSelected(tagType, event.target.dataset.value);
          this.tagMenuToggle(dropdown, button, false);
        }
      });
    });
  }

  // Listen for clicks on selected tags to remove them
  setupTagsSelectedInteractions() {
    const $tagsSelectedContainer = document.getElementById("tags-selected");
    $tagsSelectedContainer.addEventListener("click", (e) => {
      if (e.target.closest("button")) {
        const $button = e.target.closest("button");
        const $li = e.target.closest("li");

        this.handleToggleTag($button.dataset.value, $button.getAttribute("data-tag-type"), "remove");
        if ($li) $li.remove();
      }
    });
  }

  // Handles the opening/closing of a filter menu
  tagMenuToggle(dropdown, button, open) {
    button.setAttribute("aria-expanded", open);
    if (open) {
      dropdown.removeAttribute("hidden");
      button.classList.replace("rounded-lg", "rounded-t-lg");
    } else {
      dropdown.setAttribute("hidden", "");
      button.classList.replace("rounded-t-lg", "rounded-lg");
    }
  }

  // Handles adding or removing a tag from the selected tags
  handleToggleTag(tagValue, tagTypes, action) {
    this.model.addOrRemoveTagSelected(tagTypes, tagValue, action);
    this.model.searchRecipes();
    this.updateView();
  }
}
