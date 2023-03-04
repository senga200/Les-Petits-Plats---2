
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












function handleSearchInput() {
    const input = searchInput.value.trim().toLowerCase();
    if (input.length >= 3) {
      ingredientsTab = [];
      for (const recipe of recipesTab) {
        for (const ingredient of recipe.ingredients) {
          if (ingredient.ingredient.toLowerCase().includes(input)) {
            if (!ingredientsTab.includes(ingredient.ingredient)) {
              ingredientsTab.push(ingredient.ingredient);
            }
          }
        }
      }
      result = [];
      for (let i = 0; i < recipesTab.length; i++) {
        const recipe = recipesTab[i];
        if (recipe.name.toLowerCase().includes(input) ||
            recipe.description.toLowerCase().includes(input)) {
          result.push(recipe);
        } else {
          for (let j = 0; j < recipe.ingredients.length; j++) {
            const ingredient = recipe.ingredients[j];
            if (ingredient.ingredient.toLowerCase().includes(input)) {
              result.push(recipe);
              break;
            }
          }
        }
      }
      if (result.length > 0) {
        displayResults(result);  
        getIngredients(result);
      } else {
        grid.innerHTML = '<p class="error-message">Aucune recette ne correspond à votre critère de recherche</p>';
      }
    } else if (input.length === 0) {
      ingredientsTab = [];
      displayResults(recipesTab);
      getIngredients(recipesTab);
    }
    console.log("ingredientsTab searchbar principale : " + ingredientsTab);
  }
  
  
  searchInput.addEventListener("input", handleSearchInput);
  console.log("test");
  //********BARRE DE RECHERCHE INGREDIENTS********//
  //////////////////////////////////////////////////
  //recuperer la liste de tous ingredients et les afficher dans la div ingredients et supprimer les doublons
  
  async function getIngredients(result) {
    try {
      ingredientsList.appendChild(ulIngredients); //creer la liste des ingredients
      allIngredients = [];
      
      (result).forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
          if (!allIngredients.includes(ingredient.ingredient.toLowerCase())) {
            allIngredients.push(ingredient.ingredient.toLowerCase());
          }
        });
      });
      allIngredients.sort(function(a, b) {
        return a.toLowerCase().localeCompare(b.toLowerCase());
      });
      // Supprimer tous les elements li de la liste
      ulIngredients.innerHTML = '';
      // Ajouter les elements li triés à la liste
      allIngredients.forEach(ingredient => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${ingredient}</strong>`;
        ulIngredients.appendChild(li);
      });
      console.log("total ingrédients : ", allIngredients.length);
    } catch (error) {
      console.error(error);
    }
  }
  
  searchInputTagIngredient.addEventListener("input", function() {
    const input = searchInputTagIngredient.value;
    // On filtre les recettes contenant les ingrédients correspondants
    if (input.length >= 3) {
      //recherche dans les ingredients
      const result = recipesTab.filter(recipe =>
        recipe.ingredients.some(ingredient =>
          ingredient.ingredient.toLowerCase().includes(input.toLowerCase())
        ));
      if (result.length > 0) {
        displayResults(result);console.log("le result ingredient : " +result);
      console.log("tableau ingredientTab : " +ingredientsTab);
      } else {
        grid.innerHTML = "Aucune recette ne correspond à votre critère de recherche";
      }
    } else {
      displayResults(recipesTab);
    }      
  });