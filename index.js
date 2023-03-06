//test fetch 
// fetch("http://127.0.0.1:5500/recipes.js")
//   .then(response => response.json())
//   .then(recipes => {
//     console.table(recipes);
//   })
//   .catch(error => {
  //     console.error(error);
  //   });
  
  // recuperer les recettes à partir de recipes.js et retourner un tableau de recettes
  //et profiter pour vider le tableau pour afficher les resultats de la recherche
  "use strict";
  async function getRecipes() {
    try {
    const response = await fetch("recipes.json");
    //stockage des recettes dans une variable recipesTab
    const recipesTab = await response.json();
    console.table(recipesTab);
    // retourne les recipes dans le tableau recipesTab
    return recipesTab.recipes;
  } 
  catch (error) {
    console.error(error);
  }
}


//VARIABLES
//tableau de recettes
let recipesTab=[];
//  Barrre de recherche principale
const searchInput = document.getElementById("searchInput");
let results = [];
//container de toutes les recettes
const grid = document.querySelector(".grid-container");

//Barrre de recherche secondaire ingrédients 
const searchInputTagIngredient = document.getElementById("searchInputTagIngredient");
let allIngredients = [];//liste des ingrédients
let ingredientsTab = [];//tableau des ingredients selectionnés
const ingredientsList = document.querySelector("#ingredients");
const ulIngredients = document.createElement("ul");

//Barrre de recherche secondaire appareils
const searchInputTagAppliances = document.getElementById("searchInputTagAppareil");
let allAppliances= [];//liste des appareils
let appliancesTab = [];//
const appliancesList = document.querySelector("#appareils");
const ulAppliances = document.createElement("ul");

//barre de recherche secondaire ustensiles
const searchInputTagUstensils = document.getElementById("searchInputTagUstensile");
let allUstensils = [];//liste des ustensiles
let ustensilsTab = [];
const ulUstensils = document.createElement("ul");
const ustensilsList = document.querySelector("#ustensiles");



//recuperer la recette et l'afficher dans le DOM
async function getRecipe() {
  try {
    recipesTab = await getRecipes();
    grid.innerHTML = "";
    //pour chaque recette on appelle la factory que l'on stocke dans la variable recipeDetail et on applique la methode getRecipeDOM
    recipesTab.forEach(recipe => {
      const recipeDetail = recipeFactory(recipe);
      const recipeElement = recipeDetail.getRecipeDOM();
      grid.appendChild(recipeElement);
    });
    getIngredients(results);
    getAppliances(results);
    getUstensils(results);
  } catch (error) {
    console.error(error);
  }
}
//charger la recette  
getRecipe();


//AFFICHER UNIQUEMENT LE RESULTAT DE LA RECHERCHE DANS GRID//
function displayResults(results){
  grid.innerHTML = "";
  results.forEach(recipe => {
    const recipeDetail = recipeFactory(recipe);
    const recipeElement = recipeDetail.getRecipeDOM();
    grid.appendChild(recipeElement);
  }); 
  getIngredients(results);
  getAppliances(results);
  getUstensils(results);
}

//********BARRE DE RECHERCHE PRINCIPALE********//
/////////////////////////////////////////////////
/////////////////////////////////////////////////
//faire un addEventListener sur l'input de la barre de recherche principale (searchInput) pour :
//1- récupérer la valeur de l'input à partir de 3 caractères et la stocker dans une variable
//2- vérifier si la valeur de l'input correspond à un nom de recette ou à un ingrédient ou à un appareil ou à un ustensile
//3- afficher les résultats correspondants dans la grille
//4.afficher les ingredients, appareils et ustensiles correspondants aux recettes affichées dans la grille
//5. si la valeur de l'input est vide, afficher toutes les recettes
//6. si la valeur de l'input ne correspond à aucun résultat, afficher un message d'erreur

searchInput.addEventListener("input", function() {
  const input = searchInput.value.trim().toLowerCase();
  if (input.length >= 3) {
    // Vérifier si le texte entré correspond à un ingrédient
    //ingredientsList.innerHTML = "";//ajout un innerHTML pour vider la liste des ingredients
    ingredientsTab = [];//vide le tableau des ingredients selectionnés
    for (const recipe of recipesTab) {//pour chaque recette de recipesTab 
      for (const ingredient of recipe.ingredients) { //pour chaque ingredient de la recette 
        if (ingredient.ingredient.toLowerCase().includes(input)) { //si l'ingredient de la recette contient la valeur de l'input
          if (!ingredientsTab.includes(ingredient.ingredient)) {//si le tableau des ingredients selectionnés ne contient pas l'ingredient
            ingredientsTab.push(ingredient.ingredient);//ajouter l'ingredient au tableau ingredientsTab
          }
        }
      }
    }
    results = [];//vide le tableau des resultats
    for (const recipe of recipesTab) {//pour chaque recette de recipesTab
      for (const ingredient of recipe.ingredients) {//pour chaque ingredient de la recette 
        if (ingredientsTab.includes(ingredient.ingredient)) { //si le tableau des ingredients selectionnés contient l'ingredient
          if (!results.includes(recipe)) {//si le tableau des resultats ne contient pas la recette
            results.push(recipe);//ajouter la recette au tableau results
          }
        }
      }
    }
    // Vérifier si le texte entré correspond à un appareil
    //appliancesList.innerHTML = "";//ajout un innerHTML pour vider la liste des appareils
    appliancesTab = [];//vide le tableau des appareils selectionnés
    for (const recipe of recipesTab) {// pour chaque recette de recipesTab
      if (recipe.appliance.toLowerCase().includes(input)) {//si l'appareil de la recette contient la valeur de l'input
        if (!appliancesTab.includes(recipe.appliance)) {//si le tableau des appareils selectionnés ne contient pas l'appareil
          appliancesTab.push(recipe.appliance);//ajouter l'appareil au tableau appliancesTab
        }
      }
    }
    for (const recipe of recipesTab) {//pour chaque recette de recipesTab
      if (appliancesTab.includes(recipe.appliance)) {//si le tableau des appareils selectionnés contient l'appareil
        if (!results.includes(recipe)) {//si le tableau des resultats ne contient pas la recette
          results.push(recipe);//ajouter la recette au tableau results
        }
      }
    }
    // Vérifier si le texte entré correspond à un ustensile
    //ustensilsList.innerHTML = "";//ajout un innerHTML pour vider la liste des ustensiles
    ustensilsTab = [];//vide le tableau des ustensiles selectionnés
    for (const recipe of recipesTab) {//pour chaque recette de recipesTab
      for (const ustensil of recipe.ustensils) {//pour chaque ustensile de la recette
        if (ustensil.toLowerCase().includes(input)) {//si l'ustensile de la recette contient la valeur de l'input
          if (!ustensilsTab.includes(ustensil)) {//si le tableau des ustensiles selectionnés ne contient pas l'ustensile
            ustensilsTab.push(ustensil);//ajouter l'ustensile au tableau ustensilsTab
          }
        }
      }
    }
    for (const recipe of recipesTab) {//pour chaque recette de recipesTab
      for (const ustensil of recipe.ustensils) {//pour chaque ustensile de la recette
        if (ustensilsTab.includes(ustensil)) {//si le tableau des ustensiles selectionnés contient l'ustensile
          if (!results.includes(recipe)) {//si le tableau des resultats ne contient pas la recette
            results.push(recipe);//ajouter la recette au tableau results
          }
        }
      }
    }
    // Vérifier si le texte entré correspond à un nom de recette
    for (const recipe of recipesTab) {//pour chaque recette de recipesTab
      if (recipe.name.toLowerCase().includes(input)) {//si le nom de la recette contient la valeur de l'input
        if (!results.includes(recipe)) {//si le tableau des resultats ne contient pas la recette
          results.push(recipe);//ajouter la recette au tableau results
        }
      }
    }
  } else if (input.length === 0) {//si la valeur de l'input est vide
    results = recipesTab;//afficher toutes les recettes
  }
  //affichage des résultats
  if (results.length > 0) {//si le tableau des resultats contient des recettes
    results = [...new Set(results)];//recupère la liste des résultats de la recherche =" results"
    console.log("results input principal", results);
    displayResults(results);//affiche les résultats de la recherche dans la grille
    getIngredients(results);//sensé afficher les ingredients correspondants aux recettes affichées dans la grille
    getAppliances(results);//sensé afficher les appareils correspondants aux recettes affichées dans la grille
    getUstensils(results);//sensé afficher les ustensiles correspondants aux recettes affichées dans la grille
  } else { //sinon afficher un message d'erreur
  grid.innerHTML = '<p class="error-message">Aucune recette ne correspond à votre critère de recherche</p>';
  }
});



// //test 
// searchInput.addEventListener("input", function() {
//   const input = searchInput.value.trim().toLowerCase();
//   //recherche d'ingrédients
//   result = [];
//   if (input.length >= 3) {
//     for (const recipe of recipesTab) {
//       for (const ingredient of recipe.ingredients) {
//         if (ingredient.ingredient.toLowerCase().includes(input)) {
//           if (!result.includes(recipe)) {
//             result.push(recipe);
//           }
//         }
//       }
//     }
//   } else if (input.length === 0) {
//     result = recipesTab;
//   }
  
//   //affichage des résultats
//   if (result.length > 0) {
//     displayResults(result);
//     getIngredients(result);
//     getAppliances(result);
//     getUstensils(result);
//   } else {
//     grid.innerHTML = '<p class="error-message">Aucune recette ne correspond à votre critère de recherche</p>';
//   }
// });











// searchInput.addEventListener("input", function() {
//   const input = searchInput.value.trim().toLowerCase();
//   if (input.length >= 3) {
//   // Vérifier si le texte entré correspond à un ingrédient
//   //ingredientsList.innerHTML = "";//ajout un innerHTML pour vider la liste des ingredients
//   ingredientsTab = [];
//   for (const recipe of recipesTab) {
//   for (const ingredient of recipe.ingredients) {
//   if (ingredient.ingredient.toLowerCase().includes(input)) {
//   if (!ingredientsTab.includes(ingredient.ingredient)) {
//   ingredientsTab.push(ingredient.ingredient);
//   }
//   }
//   } console.log("input : " +input )
//   }
//   results = [];
//   for (const recipe of recipesTab) {
//   if (recipe.name.toLowerCase().includes(input) ||
//   recipe.description.toLowerCase().includes(input)) {
//   results.push(recipe);
//   } else {
//   for (const ingredient of recipe.ingredients) {
//   if (ingredient.ingredient.toLowerCase().includes(input)) {
//   results.push(recipe);
//   //break;??
//   }}}
// }
//   console.table("resultat result : " +JSON.stringify(results));
//   if (results.length > 0) {
//   displayResults(results);
//   //getIngredients(result);
//   // affiche les résultats filtrés
//   } else {
//   grid.innerHTML = '<p class="error-message">Aucune recette ne correspond à votre critère de recherche</p>';
//   }
//   } else if (input.length === 0) {
//   ingredientsTab = [];
//   displayResults(recipesTab);
//   //getIngredients(result);
//   }
//   //afficher l'ingredient recherché dans l'input principal
//   console.log("ingredientsTab searchbar principale : "+ingredientsTab);
//   });
   console.log("test");
//********BARRE DE RECHERCHE INGREDIENTS********//
//////////////////////////////////////////////////
//recuperer la liste de tous ingredients et les afficher dans la div ingredients et supprimer les doublons
//test
// async function getIngredients(filteredResults = null) {
//   try {
//     // Si les résultats filtrés sont fournis, utilisez-les pour construire la liste d'ingrédients
//     const recipes = filteredResults ? filteredResults : recipesTab;
//     const ingredients = [];
//     recipes.forEach((recipe) => {
//       recipe.ingredients.forEach((ingredient) => {
//         if (!ingredients.includes(ingredient.ingredient.toLowerCase())) {
//           ingredients.push(ingredient.ingredient.toLowerCase());
//         }
//       });
//     });

//     // Tri des ingrédients par ordre alphabétique
//     ingredients.sort(function (a, b) {
//       return a.toLowerCase().localeCompare(b.toLowerCase());
//     });

//     // Mise à jour de la liste des ingrédients dans le DOM
//     ulIngredients.innerHTML = "";
//     ingredients.forEach((ingredient) => {
//       const li = document.createElement("li");
//       li.innerHTML = `<strong>${ingredient}</strong>`;
//       ulIngredients.appendChild(li);
//     });
//   } catch (error) {
//     console.error(error);
//   }
// }


async function getIngredients() {
  try {
    ingredientsList.appendChild(ulIngredients); //creer la liste des ingredients
    recipesTab.forEach(recipe => {//pour chaque recette dasn le tableau de recettes recipesTab
      recipe.ingredients.forEach(ingredient => {//pour chaque ingredient de la recette
        if (!allIngredients.includes(ingredient.ingredient.toLowerCase())) {//si l'ingredient n'est pas dans la liste des ingredients
          allIngredients.push(ingredient.ingredient.toLowerCase());//ajouter l'ingredient dans la liste des ingredients
          //const li apprès le tri
        }
      });
    });
    allIngredients.sort(function(a, b) {//tri
      return a.toLowerCase().localeCompare(b.toLowerCase());
    });
    ulIngredients.innerHTML = "";// Supprimer tous les elements li de la liste
    // Ajouter les elements li triés à la liste
    allIngredients.forEach(ingredient => {//pour chaque ingredient de la liste des ingredients
      const li = document.createElement("li");//creer un element li
      li.innerHTML = `<strong>${ingredient}</strong>`;//ajouter le nom de l'ingredient dans l'element li
      ulIngredients.appendChild(li);//ajouter l'element li dans la liste ulIngredients
    });
    console.log("total ingrédients : ", allIngredients.length);
    //console.table(allIngredients);
  } catch (error) {
    console.error(error);
  }
}

//addEventListener sur searhInputTagIngredient pour :
//1. verifier si la saisie au bout de 3 caractères correspond à un ingrédient
//2. si oui, afficher les recettes correspondantes
//3. si non, afficher un message d'erreur
//4. si la saisie est vide, afficher toutes les recettes
//5. mettre à jour la liste des ingrédients en fonction de la saisie de dans l'input
//6. supprimer les suggestions d'ingredients pour correspondre à la saisie de l'utilisateur
//7. afficher les suggestions d'ingredients correspondant à la saisie de l'utilisateur

searchInputTagIngredient.addEventListener("input", function() {
  const input = searchInputTagIngredient.value.trim().toLowerCase();
  if (input.length >= 3) {
    ingredientsTab = []; //vider le tableau ingredientsTab
    //parcourir chaque recette dans le tableau recipesTab
    for (const recipe of recipesTab) {
      //et pour chaque recette parcourir chaque ingredient de la recette
      for (const ingredient of recipe.ingredients) {
        //si l'ingredient contient la saisie de l'utilisateur alors on l'ajoute au tableau ingredientsTab
        if (ingredient.ingredient.toLowerCase().includes(input)) {
          if (!ingredientsTab.includes(ingredient.ingredient)) {
            ingredientsTab.push(ingredient.ingredient);
          }
        }
      }
    }
    results = []; //vider le tableau results
    //parcourir chaque recette dans le tableau recipesTab
    for (const recipe of recipesTab) {
      //si le nom ou la description de la recette contient la saisie de l'utilisateur alors on l'ajoute au tableau results
      if (recipe.name.toLowerCase().includes(input) ||
        recipe.description.toLowerCase().includes(input)) {
        results.push(recipe);
      } else {
        //sinon on parcourt chaque ingredient de la recette et on vérifie si l'ingredient contient la saisie de l'utilisateur et on l'ajoute au tableau results
        for (const ingredient of recipe.ingredients) {
          if (ingredient.ingredient.toLowerCase().includes(input)) {
            results.push(recipe);
          }
        }
      }
    }
    //console.table("resultat result DANS INGREDIENTS : " + JSON.stringify(results));
    //si le tableau results n'est pas vide alors on affiche les ingrédients correspondants
    if (results.length > 0) {
      //mise à jour de la liste des ingrédients
      ulIngredients.style.display = "none";
      //ulIngredients.innerHTML = "";//Efface le contenu de la liste
      //TRI 
      ingredientsTab.sort(function(a, b) {
        return a.toLowerCase().localeCompare(b.toLowerCase());
      });
      //ulIngredients.innerHTML = "";
      // Pour chaque ingrédient, créer un élément li et l'ajouter à la liste
      ingredientsTab.forEach(ingredient => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${ingredient}</strong>`;
        ingredientsList.appendChild(li);
        ulIngredients.innerHTML = "";
      });
      displayResults(results);//afficher les recettes correspondantes
    } else {//sinon on affiche un message d'erreur
      grid.innerHTML = '<p class="error-message">Aucune recette ne correspond à votre critère de recherche</p>';
    }
    //si la saisie est vide alors on affiche toutes les recettes
  } else if (input.length === 0) {
    //ulIngredients.innerHTML = ""; // Efface le contenu de la liste
    ingredientsTab = [];  //vider le tableau ingredientsTab
    displayResults(recipesTab); //afficher toutes les recettes
    //mise à jour de la liste des ingrédients
   ulIngredients.style.display = "block";
  }
  //afficher l'ingredient recherché dans l'input principal
  console.log("ingredientsTab searchbar ingredients : " + ingredientsTab);
});

console.log("test");


//********BARRE DE RECHERCHE APPAREILS********//
//////////////////////////////////////////////////
//recuperer la liste de tous appareils et les afficher dans la div appareils et supprimer les doublons
// récupérer la liste de tous les appareils et les afficher dans la div appareils en supprimant les doublons
async function getAppliances() {
  try {
    appliancesList.appendChild(ulAppliances); //creer la liste des appareils
    recipesTab.forEach(recipe => {
      if (!allAppliances.includes(recipe.appliance.toLowerCase())) {
        allAppliances.push(recipe.appliance.toLowerCase());
      }
    });//const li apprès le tri
    allAppliances.sort(function(a, b) {
      return a.toLowerCase().localeCompare(b.toLowerCase());
    });
    // Supprimer tous les elements li de la liste
    ulAppliances.innerHTML = '';
//ajouter les elements li triés à la liste
    allAppliances.forEach(appliance => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${appliance}</strong>`;
      ulAppliances.appendChild(li);
    });
    console.log("total appareils : ", allAppliances.length);
  } catch (error) {
    console.error(error);
  }
}

//afficher que les recettes qui contiennent les appareils recherchés
searchInputTagAppliances.addEventListener("input", function() {
  const input = searchInputTagAppliances.value.trim().toLowerCase();
  // On filtre les recettes contenant les appareils correspondants
  if (input.length >= 3) {
    appliancesTab=[];
    for(const recipe of recipesTab){
      for(const appliance of recipe.appliance){
        if(appliance.toLowerCase().includes(input)){
          if(!appliancesTab.includes(appliance)){
            appliancesTab.push(appliance);
          }
        }
      }
    }
    results = [];
    for (const recipe of recipesTab) {
      if (recipe.name.toLowerCase().includes(input) ||
        recipe.description.toLowerCase().includes(input)) {
        results.push(recipe);
      } else {
        for (const appliance of recipe.appliance) {
          if (appliance.toLowerCase().includes(input)) {
            results.push(recipe);
            break;
          }
        }
      }
    }
    console.table("resultat result : dans APPLIANCES " + JSON.stringify(results));

    if (results.length > 0) {
      //mise à jour de la liste des appareils
      ulAppliances.style.display = "none";
      appliancesTab.sort(function(a, b) {
        return a.toLowerCase().localeCompare(b.toLowerCase());
      });
      appliancesTab.forEach(appliance => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${appliance}</strong>`;
        appliancesList.appendChild(li);
      });
      displayResults(results);console.log("resultat de appareils : " + results);
    } else {
      grid.innerHTML = "Aucune recette ne correspond à votre critère de recherche";
    }
  } else if (input.length === 0) {
    appliancesTab = [];
    displayResults(recipesTab);
  }  
});


//********BARRE DE RECHERCHE USTENSILES********//
//////////////////////////////////////////////////
//recuperer la liste de tous les ustensiles et les afficher dans la div ustensiles et supprimer les doublons
async function getUstensils() {
  try {
    ustensilsList.appendChild(ulUstensils); // creer la liste des ustensiles
    const allUstensils = [];
    recipesTab.forEach(recipe => {
      recipe.ustensils.forEach(ustensil => {
        if (!allUstensils.includes(ustensil.toLowerCase())) {
          allUstensils.push(ustensil.toLowerCase());
        }
      });
    });
    allUstensils.sort(function(a, b) {
      return a.toLowerCase().localeCompare(b.toLowerCase());
    });
    // supprimer les li de la liste
    ulUstensils.innerHTML = "";
    // ajouter les li triés à la liste
    allUstensils.forEach(ustensil => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${ustensil}</strong>`;
      ulUstensils.appendChild(li);
    });
  } catch(error) {
    console.log(error);
  }
}

// //afficher que les recettes qui contiennent les ustensiles recherchés
//test
searchInputTagUstensils.addEventListener("input", function(){
  const input = searchInputTagUstensils.value.trim().toLowerCase();
  if(input.length >= 3){
    ustensilsTab=[];
    for(const recipe of recipesTab){
      for (const ustensil of recipe.ustensils){
        if (ustensil.toLowerCase().includes(input)){
          if(!ustensilsTab.includes(ustensil)){
            ustensilsTab.push(ustensil);
          }
        }
      }
    }
    results = [];
    for (const recipe of recipesTab){
      if(recipe.name.toLowerCase().includes(input)|| recipe.description.toLowerCase().includes(input)){
        results.push(recipe);
      } else {
        for (const ustensil of recipe.ustensils){
          if(ustensil.toLowerCase().includes(input)){
            results.push(recipe);
            break;
          }
        }
      }
    }
    if(results.length>0){
      ulUstensils.style.display="none";
      ustensilsTab.sort(function(a,b){
        return a.toLowerCase().localeCompare(b.toLowerCase());
      });
      //ustensilsList.innerHTML = ""; // clear the list before appending new items
      ustensilsTab.forEach(ustensil => {
        const li = document.createElement("li");
        li.innerHTML=`<strong>${ustensil}</strong>`;
        ustensilsList.appendChild(li);
      });
      displayResults(results);
    } else {
      grid.innerHTML = '<p class="error-message">Aucune recette ne correspond à votre critère de recherche</p>';    
    }
  } else if(input.length===0){
    ustensilsTab=[];
    displayResults(recipesTab);
  }
});

//*********MENU DEROULANT APPAREILS*********** */
////////////////////////////////////////////
const blocSearchAppareils = document.querySelector(".blocSearchAppareils");
let toggleIndexAppareils = 0;

blocSearchAppareils.addEventListener('click', function() {
  const chevronAppareils = document.querySelector("#chevronAppareils");
    if (toggleIndexAppareils === 0) {
        // OUVIRIR
        appliancesList.style.height = `${appliancesList.scrollHeight}px`;
        appliancesList.classList.toggle("expanded");
        chevronAppareils.classList.add("rotated");
        toggleIndexAppareils++;
    } else if (toggleIndexAppareils > 0) {
        // FERMER
        appliancesList.style.height = `${blocSearchAppareils.scrollHeight}px`;
        appliancesList.classList.remove("expanded");
        chevronAppareils.classList.remove("rotated");
        toggleIndexAppareils--;
    }
});

searchInputTagAppliances.addEventListener("click", function() {
  if (toggleIndexAppareils === 0) {
      // OUVIRIR
      appliancesList.style.height = `${appliancesList.scrollHeight}px`;
      appliancesList.classList.toggle("expanded");
      toggleIndexAppareils++;
  } else if (toggleIndexAppareils > 0) {
      // FERMER
      appliancesList.style.height = `${blocSearchAppareils.scrollHeight}px`;
      appliancesList.classList.remove("expanded");
      toggleIndexAppareils--;
  }
});

//*********MENU DEROULANT INGREDIENTS*********** */
//////////////////////////////////////////////
const blocSearchIngredients = document.querySelector(".blocSearchIngredients");
let toggleIndexIngredients = 0;

blocSearchIngredients.addEventListener('click', function () {
  const chevronIngredients = document.querySelector("#chevronIngredients");
    if (toggleIndexIngredients === 0) {
        // OUVIRIR
        ingredientsList.style.height = "auto";
        ingredientsList.classList.toggle("expanded");
        chevronIngredients.classList.add("rotated");

        toggleIndexIngredients++;
    } else if (toggleIndexIngredients > 0) {
        // FERMER
        ingredientsList.style.height = `${blocSearchIngredients.scrollHeight}px`;
        ingredientsList.classList.remove("expanded");
        chevronIngredients.classList.remove("rotated");

        toggleIndexIngredients--;
    }
});

searchInputTagIngredient.addEventListener("click", function() {
  if (toggleIndexIngredients === 0) {
      // OUVIRIR
      ingredientsList.style.height = "auto";
      ingredientsList.classList.toggle("expanded");
      toggleIndexIngredients++;
  } else if (toggleIndexIngredients > 0) {
      // FERMER
      ingredientsList.style.height = `${blocSearchIngredients.scrollHeight}px`;
      ingredientsList.classList.remove("expanded");
      toggleIndexIngredients--;
  }
});

//*********MENU DEROULANT USTENSILES*********** */
//////////////////////////////////////////////
const blocSearchUstensiles = document.querySelector(".blocSearchUstensiles");
let toggleIndexUstensiles = 0;

blocSearchUstensiles.addEventListener('click', function() {
  const chevronUstensiles = document.querySelector("#chevronUstensiles");
  if (toggleIndexUstensiles === 0) {
      // OUVIRIR
      ustensilsList.style.height = "auto";
      ustensilsList.classList.toggle("expanded");
      chevronUstensiles.classList.add("rotated");

      toggleIndexUstensiles++;
  } else if (toggleIndexUstensiles > 0) {
      // FERMER
      ustensilsList.style.height = `${blocSearchUstensiles.scrollHeight}px`;
      ustensilsList.classList.remove("expanded");
      chevronUstensiles.classList.remove("rotated");

      toggleIndexUstensiles--;
  }
});

searchInputTagUstensils.addEventListener("click", function() {
  if (toggleIndexUstensiles === 0) {
      // OUVIRIR
      ustensilsList.style.height = "auto";
      ustensilsList.classList.toggle("expanded");
      toggleIndexUstensiles++;
  } else if (toggleIndexUstensiles > 0) {
      // FERMER
      ustensilsList.style.height = `${blocSearchUstensiles.scrollHeight}px`;
      ustensilsList.classList.remove("expanded");
      toggleIndexUstensiles--;
  }
});


//***********LES TAGS ****************//
////////////////////////////////////////
////////////CREATION TAG////////////////
//selectedTags recupère les tags créés et supprimés
const tags = document.querySelector("#tags");
const selectedTags = [];
function createTag(inputValue) {
  const liTag = document.querySelectorAll("#ingredients li, #ustensiles li, #appareils li");
  liTag.forEach((li) => {
    const itemName = li.textContent.trim().toLowerCase();
    if (itemName.includes(inputValue)) {
      const tag = document.createElement("span");
      tag.innerHTML = `<strong>${itemName}</strong>`;
      const closeBtn = document.createElement("i");
      closeBtn.classList.add("fa-regular", "fa-times-circle");
      tag.classList.add("selected");

      if (li.closest('#ingredients')) {
        tag.style.backgroundColor = "#3282F7";
      } else if (li.closest("#ustensiles")) {
        tag.style.backgroundColor = "#ED6454";
      } else if (li.closest("#appareils")) {
        tag.style.backgroundColor = "#68d9a4";
      }

      tags.appendChild(tag);
      tag.appendChild(closeBtn);
        //selectedTags.push(tag);

      closeBtn.addEventListener("click", function() {
        tag.style.display = "none";
      });
    }
  });
  if (tags.querySelectorAll(".selected").length > 0) {
    tags.style.display = "block";
  } else {
    tags.style.display = "none";
  }
}

// //afficher que les recettes qui contiennent les tags recherchés
function filterRecipes() {
  const searchText = searchInput.value.toLowerCase().trim();
  const filteredRecipes = [];
  for(const recipe of recipesTab){
    const ingredients = recipe.ingredients.map((ingredient) => ingredient.ingredient.toLowerCase());
    const ustensiles = recipe.ustensils.map((ustensile) => ustensile.toLowerCase());
    const appareils = recipe.appliance.toLowerCase();
    const includesSearchText = recipe.name.toLowerCase().includes(searchText) || ingredients.includes(searchText)|| ustensiles.includes(searchText) || appareils.includes(searchText);
    const includesSelectedTags = selectedTags.every((tag) => ingredients.includes(tag)|| ustensiles.includes(tag) || appareils.includes(tag));
    if (includesSearchText && includesSelectedTags) {
      filteredRecipes.push(recipe);
    }
  }
  if (filteredRecipes.length > 0) {
    displayResults(filteredRecipes);
  } else {
    grid.innerHTML = "<p>Aucune recette ne correspond à votre recherche.</p>";
  }
}


//OK ajouter l'ingrédient dans le tableau selectedTags
//OK pour le filtrage eds recettes
//OK Supprimer l'ingrédient devenu tag de la liste des ingredients
//KO MAJ de la liste des ingredients
ingredientsList.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    const ingredient = e.target.textContent.trim().toLowerCase();
    createTag(ingredient);
    selectedTags.push(ingredient);
    filterRecipes();
    console.log("tags selectionnés : "+ selectedTags);
    console.log("ingredient current : "+ ingredient);
    const liTag = document.querySelectorAll("#ingredients li");
    liTag.forEach((li) => {
      if (li.textContent.trim().toLowerCase() === ingredient) {
        li.remove();
      }
    });
  }
});

ustensilsList.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        const ustensile = e.target.textContent.trim().toLowerCase();
        createTag(ustensile);
        selectedTags.push(ustensile);
        filterRecipes();
        console.log("tags selectionnés : "+ selectedTags);
        console.log("ustensile current : "+ ustensile);
        const liTag = document.querySelectorAll("#ustensiles li");
        liTag.forEach((li) => {
            if (li.textContent.trim().toLowerCase() === ustensile) {
                li.remove();
            }
        });
    }
});

appliancesList.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        const appareil = e.target.textContent.trim().toLowerCase();
        createTag(appareil);
        selectedTags.push(appareil);
        filterRecipes();
        console.log("tags selectionnés : "+ selectedTags);
        console.log("appareil current : "+ appareil);
        const liTag = document.querySelectorAll("#appareils li");
        liTag.forEach((li) => {
            if (li.textContent.trim().toLowerCase() === appareil) {
                li.remove();
            }
        });
    }
});

//OK Supprimer l'ingrédient des tags sélectionnés dans le tableau selectedTags
//OK pour le filtrage 
//OK Supprimer l'ingrédient devenu tag de la liste des ingredients
tags.addEventListener("click", function(e) {
  if (e.target.tagName === "I") {
    const item = e.target.previousElementSibling.textContent.trim().toLowerCase();
    e.target.previousElementSibling.remove();
    e.target.remove();
    const index = selectedTags.indexOf(item);
    if (index > -1) {
      selectedTags.splice(index, 1);
    }
    filterRecipes();
    console.log(selectedTags);
  } 
});


