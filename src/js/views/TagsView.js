export class TagsView {
  constructor() {
    this.$ingredientsListContainer = document.getElementById("ingredients-list");
    this.$appliancesListContainer = document.getElementById("appliances-list");
    this.$ustensilsListContainer = document.getElementById("ustensils-list");

    this.$tagsSelectedContainer = document.getElementById("tags-selected");
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

  createTagSelectedHTML(tagTypes, TagLabel) {
    return `
      <li class="inline-block rounded-lg bg-amber-300">
        <button class="flex items-center gap-8 p-4" aria-label="Supprimer le tag ${TagLabel}" data-value="${encodeURIComponent(TagLabel)}" data-tag-type="${tagTypes}">
        <span class="first-letter:uppercase">${TagLabel}</span>
          <svg
            class="text-neutral-900"
            width="14"
            height="13"
            viewBox="0 0 14 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 11.5L7 6.5M7 6.5L2 1.5M7 6.5L12 1.5M7 6.5L2 11.5"
              stroke="currentColor"
              stroke-width="2.16667"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
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

  renderTagSelected(tagTypes, tag) {
    tag = decodeURIComponent(tag);
    this.$tagsSelectedContainer.insertAdjacentHTML("beforeend", this.createTagSelectedHTML(tagTypes, tag));
  }
}
