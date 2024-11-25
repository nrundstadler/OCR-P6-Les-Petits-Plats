export class TagsView {
  constructor() {
    this.$ingredientsListContainer = document.getElementById("ingredients-list");
    this.$appliancesListContainer = document.getElementById("appliances-list");
    this.$ustensilsListContainer = document.getElementById("ustensils-list");
  }

  createTagHTML(TagLabel) {
    return `
      <li>
        <button
          class="first-letter:uppercase w-full rounded-sm px-4 py-2 text-left outline-none hover:bg-amber-300 focus-visible:bg-amber-300 transition"
          data-value="${encodeURIComponent(TagLabel)}"
        >${TagLabel}</button>
      </li>
    `;
  }

  renderTagsLists(tagsOptions) {
    this.$ingredientsListContainer.innerHTML = tagsOptions.ingredients
      .map((ingredient) => this.createTagHTML(ingredient))
      .join("");

    this.$appliancesListContainer.innerHTML = tagsOptions.appliances
      .map((appliance) => this.createTagHTML(appliance))
      .join("");

    this.$ustensilsListContainer.innerHTML = tagsOptions.ustensils
      .map((ustensil) => this.createTagHTML(ustensil))
      .join("");
  }
}
