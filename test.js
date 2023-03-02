
//faire un addEventListener sur la valeur de l'input searchInput 
//-si input.length >= 3 alors on filtre les recettes en filtrant la valeur de l'input dans le nom, la description et les ingredients. 
//-si le champs est vide on affiche toutes les recettes, 
//-si le champs a une valeur qui correspond à une recette on affiche la ou les recettes, et on stock le resultat dans une variable appelée InputResult qui sera utilisée pour le tri des ingredients
//-si le champs a une valeur qui ne correspond à aucune recette on affiche un message d'erreur 


// searchInput.addEventListener("input", function() {
//   const input = searchInput.value.trim().toLowerCase();
//   if (input.length >= 3) {

//     // Vérifier si le texte entré correspond à un ingrédient pour tableau 2
//     ingredientsTab = [];
//     for (const recipe of recipesTab) {
//       for (const ingredient of recipe.ingredients) {
//         if (ingredient.ingredient.toLowerCase().includes(input)) {
//           if (!ingredientsTab.includes(ingredient.ingredient)) {
//             ingredientsTab.push(ingredient.ingredient);
//           }
//         }
//       }
//     }

//     // Vérifier si le texte entré correspond à un ustensile pour tableau 2
//     ustensilsTab = [];
//     for (const recipe of recipesTab) {
//       for (const utensil of recipe.ustensils) {
//         if (utensil.toLowerCase().includes(input)) {
//           if (!ustensilsTab.includes(utensil)) {
//             ustensilsTab.push(utensil);
//           }
//         }
//       }
//     }

//     // Vérifier si le texte entré correspond à un appareil pour tableau 1
//     appliancesTab = [];
//     for (const recipe of recipesTab) {
//       if (recipe.appliance.toLowerCase().includes(input)) {
//         if (!appliancesTab.includes(recipe.appliance)) {
//           appliancesTab.push(recipe.appliance);
//         }
//       }
//     }

//     // Afficher les éléments correspondants dans les listes
//     ingredientsList.innerHTML = "";
//     for (const ingredient of ingredientsTab) {
//       const li = document.createElement("li");
//       li.textContent = ingredient;
//       ingredientsList.appendChild(li);
//     }
//     ustensilsList.innerHTML = "";
//     for (const utensil of ustensilsTab) {
//       const li = document.createElement("li");
//       li.textContent = utensil;
//       ustensilsList.appendChild(li);
//     }
//     appliancesList.innerHTML = "";
//     for (const appliance of appliancesTab) {
//       const li = document.createElement("li");
//       li.textContent = appliance;
//       appliancesList.appendChild(li);
//     }
//   } else if (input.length === 0) {
//     displayResults(recipesTab);
//      ingredientsList.innerHTML = "";
//      ustensilsList.innerHTML = "";
//      appliancesList.innerHTML = "";
//   }
// });



