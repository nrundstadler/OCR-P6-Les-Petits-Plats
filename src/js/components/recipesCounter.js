export function renderRecipesCounter(count) {
  const recipesCounter = document.getElementById("recipes-counter");

  recipesCounter.textContent = `${count} recette${count > 1 ? "s" : ""}`;
}
