function createIngredientsHTML(ingredients) {
  return ingredients
    .map((item) => {
      const { ingredient, quantity, unit } = item;
      const quantityText = quantity ? `${quantity} ${unit || ""}` : null;

      return `
        <li class="flex flex-col">
          <span>${ingredient}</span>
          ${quantityText ? `<span class="text-neutral-500">${quantityText}</span>` : ""}
        </li>
      `;
    })
    .join("");
}

function createRecipeImageHTML(imageUrl, name) {
  return `
    <img
      class="h-[250px] w-full rounded-t-lg object-cover"
      src="assets/images/recettes/${imageUrl}"
      alt="Image de la recette ${name}"
    />
  `;
}

function createRecipeHTML(recipe) {
  return `
          <article class="relative rounded-lg bg-white text-sm shadow-lg" aria-label="Recette : ${recipe.name}">
          ${createRecipeImageHTML(recipe.image, recipe.name)}
            <div class="mx-4 px-5 py-8">
              <h2 class="font-display text-lg">${recipe.name}</h2>
              <p
                class="absolute right-4 top-4 rounded-full bg-amber-300 px-4 py-2 text-xs"
                aria-label="Temps de préparation : ${recipe.time} minutes"
              >
              ${recipe.time}min
              </p>
              <h3 class="mb-4 mt-8 text-xs font-bold uppercase tracking-widest text-neutral-500">Recette</h3>
              <p class="text-sm line-clamp-4">
                ${recipe.description}
              </p>
              <h3 class="mb-4 mt-8 text-xs font-bold uppercase tracking-widest text-neutral-500">Ingrédients</h3>
              <ul class="grid grid-cols-2 gap-4">
                ${createIngredientsHTML(recipe.ingredients)}
              </ul>
            </div>
          </article>
  `;
}

export function renderRecipesList(recipes) {
  const recipeListContainer = document.getElementById("recipe-list");

  if (recipes.length === 0) {
    recipeListContainer.innerHTML =
      "<p>Aucune recette ne correspond à votre critère... Vous pouvez chercher 'tarte aux pommes', 'poisson', etc...</p>";
    return;
  }

  const recipeItems = recipes.map(createRecipeHTML).join("");

  recipeListContainer.innerHTML = `
    <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:gap-16">
      ${recipeItems}
    </div>
  `;
}
