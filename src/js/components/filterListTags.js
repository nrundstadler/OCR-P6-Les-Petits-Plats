// Function to filter the list of tags based on the input value
const filterListTags = (inputElement, listElement) => {
  // Convert the search term to lowercase and trim any extra spaces
  const searchTerm = inputElement.value.toLowerCase().trim();

  // Select all list items
  const $items = listElement.querySelectorAll("li");

  $items.forEach(($item) => {
    const itemText = $item.textContent; // Get the text content of the item
    $item.hidden = !itemText.includes(searchTerm); // Hide item if it doesn't match tag search
  });
};

// Initialize the tag list filter functionality
export const initFilterListsTags = () => {
  // Get references to the input elements and the lists to be filtered
  const $ingredientSearch = document.getElementById("ingredient-search");
  const $applianceSearch = document.getElementById("appliance-search");
  const $ustensilSearch = document.getElementById("ustensil-search");

  const $ingredientsList = document.getElementById("ingredients-list");
  const $appliancesList = document.getElementById("appliances-list");
  const $ustensilsList = document.getElementById("ustensils-list");

  // Add event listeners to the search input elements for real-time filtering
  $ingredientSearch.addEventListener("input", () => {
    filterListTags($ingredientSearch, $ingredientsList);
  });

  $applianceSearch.addEventListener("input", () => {
    filterListTags($applianceSearch, $appliancesList);
  });

  $ustensilSearch.addEventListener("input", () => {
    filterListTags($ustensilSearch, $ustensilsList);
  });

  // Function to handle focusout and clicks on list items
  // Function to handle focusout and clicks on list items
  const handleFocusOut = ($inputElement, $listElement) => {
    const dropdownParent = $inputElement.closest(".dropdown");

    // Handle focusout event when the input field loses focus
    $inputElement.addEventListener("focusout", (event) => {
      // Check if the focus has moved outside the dropdown parent
      if (!event.relatedTarget || !dropdownParent.contains(event.relatedTarget)) {
        $inputElement.value = ""; // Clear the search field
        filterListTags($inputElement, $listElement); // Reset the list visibility
      }
    });

    // Handle clicks on buttons inside the list
    $listElement.addEventListener("click", (event) => {
      if (event.target.tagName.toLowerCase() === "button") {
        $inputElement.value = ""; // Clear the search field
      }
    });
  };

  handleFocusOut($ingredientSearch, $ingredientsList);
  handleFocusOut($applianceSearch, $appliancesList);
  handleFocusOut($ustensilSearch, $ustensilsList);
};
