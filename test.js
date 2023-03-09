
// //faire un addEventListener sur la valeur de l'input searchInput 
// //-si input.length >= 3 alors on filtre les recettes en filtrant la valeur de l'input dans le nom, la description et les ingredients. 
// //-si le champs est vide on affiche toutes les recettes, 
// //-si le champs a une valeur qui correspond à une recette on affiche la ou les recettes, et on stock le resultat dans une variable appelée InputResult qui sera utilisée pour le tri des ingredients
// //-si le champs a une valeur qui ne correspond à aucune recette on affiche un message d'erreur 


// // searchInput.addEventListener("input", function() {
// //   const input = searchInput.value.trim().toLowerCase();
// //   if (input.length >= 3) {

// //     // Vérifier si le texte entré correspond à un ingrédient pour tableau 2
// //     ingredientsTab = [];
// //     for (const recipe of recipesTab) {
// //       for (const ingredient of recipe.ingredients) {
// //         if (ingredient.ingredient.toLowerCase().includes(input)) {
// //           if (!ingredientsTab.includes(ingredient.ingredient)) {
// //             ingredientsTab.push(ingredient.ingredient);
// //           }
// //         }
// //       }
// //     }

// //     // Vérifier si le texte entré correspond à un ustensile pour tableau 2
// //     ustensilsTab = [];
// //     for (const recipe of recipesTab) {
// //       for (const utensil of recipe.ustensils) {
// //         if (utensil.toLowerCase().includes(input)) {
// //           if (!ustensilsTab.includes(utensil)) {
// //             ustensilsTab.push(utensil);
// //           }
// //         }
// //       }
// //     }

// //     // Vérifier si le texte entré correspond à un appareil pour tableau 1
// //     appliancesTab = [];
// //     for (const recipe of recipesTab) {
// //       if (recipe.appliance.toLowerCase().includes(input)) {
// //         if (!appliancesTab.includes(recipe.appliance)) {
// //           appliancesTab.push(recipe.appliance);
// //         }
// //       }
// //     }

// //     // Afficher les éléments correspondants dans les listes
// //     ingredientsList.innerHTML = "";
// //     for (const ingredient of ingredientsTab) {
// //       const li = document.createElement("li");
// //       li.textContent = ingredient;
// //       ingredientsList.appendChild(li);
// //     }
// //     ustensilsList.innerHTML = "";
// //     for (const utensil of ustensilsTab) {
// //       const li = document.createElement("li");
// //       li.textContent = utensil;
// //       ustensilsList.appendChild(li);
// //     }
// //     appliancesList.innerHTML = "";
// //     for (const appliance of appliancesTab) {
// //       const li = document.createElement("li");
// //       li.textContent = appliance;
// //       appliancesList.appendChild(li);
// //     }
// //   } else if (input.length === 0) {
// //     displayResults(recipesTab);
// //      ingredientsList.innerHTML = "";
// //      ustensilsList.innerHTML = "";
// //      appliancesList.innerHTML = "";
// //   }
// // });












// function handleSearchInput() {
//     const input = searchInput.value.trim().toLowerCase();
//     if (input.length >= 3) {
//       ingredientsTab = [];
//       for (const recipe of recipesTab) {
//         for (const ingredient of recipe.ingredients) {
//           if (ingredient.ingredient.toLowerCase().includes(input)) {
//             if (!ingredientsTab.includes(ingredient.ingredient)) {
//               ingredientsTab.push(ingredient.ingredient);
//             }
//           }
//         }
//       }
//       result = [];
//       for (let i = 0; i < recipesTab.length; i++) {
//         const recipe = recipesTab[i];
//         if (recipe.name.toLowerCase().includes(input) ||
//             recipe.description.toLowerCase().includes(input)) {
//           result.push(recipe);
//         } else {
//           for (let j = 0; j < recipe.ingredients.length; j++) {
//             const ingredient = recipe.ingredients[j];
//             if (ingredient.ingredient.toLowerCase().includes(input)) {
//               result.push(recipe);
//               break;
//             }
//           }
//         }
//       }
//       if (result.length > 0) {
//         displayResults(result);  
//         getIngredients(result);
//       } else {
//         grid.innerHTML = '<p class="error-message">Aucune recette ne correspond à votre critère de recherche</p>';
//       }
//     } else if (input.length === 0) {
//       ingredientsTab = [];
//       displayResults(recipesTab);
//       getIngredients(recipesTab);
//     }
//     console.log("ingredientsTab searchbar principale : " + ingredientsTab);
//   }
  
  
//   searchInput.addEventListener("input", handleSearchInput);
//   console.log("test");
//   //********BARRE DE RECHERCHE INGREDIENTS********//
//   //////////////////////////////////////////////////
//   //recuperer la liste de tous ingredients et les afficher dans la div ingredients et supprimer les doublons
  
//   async function getIngredients(result) {
//     try {
//       ingredientsList.appendChild(ulIngredients); //creer la liste des ingredients
//       allIngredients = [];
      
//       (result).forEach(recipe => {
//         recipe.ingredients.forEach(ingredient => {
//           if (!allIngredients.includes(ingredient.ingredient.toLowerCase())) {
//             allIngredients.push(ingredient.ingredient.toLowerCase());
//           }
//         });
//       });
//       allIngredients.sort(function(a, b) {
//         return a.toLowerCase().localeCompare(b.toLowerCase());
//       });
//       // Supprimer tous les elements li de la liste
//       ulIngredients.innerHTML = '';
//       // Ajouter les elements li triés à la liste
//       allIngredients.forEach(ingredient => {
//         const li = document.createElement("li");
//         li.innerHTML = `<strong>${ingredient}</strong>`;
//         ulIngredients.appendChild(li);
//       });
//       console.log("total ingrédients : ", allIngredients.length);
//     } catch (error) {
//       console.error(error);
//     }
//   }
  
//   searchInputTagIngredient.addEventListener("input", function() {
//     const input = searchInputTagIngredient.value;
//     // On filtre les recettes contenant les ingrédients correspondants
//     if (input.length >= 3) {
//       //recherche dans les ingredients
//       const result = recipesTab.filter(recipe =>
//         recipe.ingredients.some(ingredient =>
//           ingredient.ingredient.toLowerCase().includes(input.toLowerCase())
//         ));
//       if (result.length > 0) {
//         displayResults(result);console.log("le result ingredient : " +result);
//       console.log("tableau ingredientTab : " +ingredientsTab);
//       } else {
//         grid.innerHTML = "Aucune recette ne correspond à votre critère de recherche";
//       }
//     } else {
//       displayResults(recipesTab);
//     }      
//   });






















"use strict";
//VARIABLES
//tableau de recettes
let recipesTab=[];
//container de toutes les recettes
const grid = document.querySelector(".grid-container");
//searchBar Principale
const searchInput = document.getElementById("searchInput");
let results = [];
//Barrre de recherche secondaire ingrédients 
const searchInputTagIngredient = document.getElementById("searchInputTagIngredient");
//menu déroulant ingrédients
let toggleIndexIngredients = 0;
const blocSearchIngredients = document.querySelector(".blocSearchIngredients");
const chevronIngredients = document.querySelector("#chevronIngredients");

let allIngredients = [];//liste des ingrédients
//let ingredientsTab = [];//tableau des ingredients selectionnés
const ingredientsList = document.querySelector("#ingredients");
const ulIngredients = document.createElement("ul");

//Barrre de recherche secondaire appareils
const searchInputTagAppliances = document.getElementById("searchInputTagAppareil");
let toggleIndexAppareils = 0;
const blocSearchAppareils = document.querySelector(".blocSearchAppareils");
const chevronAppareils = document.querySelector("#chevronAppareils");

let allAppliances= [];//liste des appareils
//let appliancesTab = [];//
const appliancesList = document.querySelector("#appareils");
const ulAppliances = document.createElement("ul");

//barre de recherche secondaire ustensiles
const blocSearchUstensiles = document.querySelector(".blocSearchUstensiles");
const searchInputTagUstensils = document.getElementById("searchInputTagUstensile");

let toggleIndexUstensiles = 0;
const chevronUstensiles = document.querySelector("#chevronUstensiles");

let allUstensils = [];//liste des ustensiles
//let ustensilsTab = [];
const ulUstensils = document.createElement("ul");
const ustensilsList = document.querySelector("#ustensiles");

// recuperer les recettes à partir de recipes.js et retourner un tableau de recettes et vider le tableau pour afficher les resultats de la recherche

 async function getAllRecipes() {
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

//recuperer la recette et l'afficher dans le DOM
async function getRecipe() { 
 try {
   recipesTab = await getAllRecipes();
   grid.innerHTML = "";
   //pour chaque recette on appelle la factory que l'on stocke dans la variable recipeDetail et on applique la methode getRecipeDOM
   recipesTab.forEach(recipe => {
     const recipeDetail = recipeFactory(recipe);
     const recipeElement = recipeDetail.getRecipeDOM();
     grid.appendChild(recipeElement);
   });
 } catch (error) {
   console.error(error);
 }
}
//charger la recette  
getRecipe();


//*****AFFICHER LES RECETTES DANS LE DOM *****//
function displayResults(results) {
 grid.innerHTML = "";//vider le grid
 results.forEach(recipe => {//pour chaque recette du tableau des résultats
   const recipeDetail = recipeFactory(recipe);//on appelle la factory que l'on stocke dans la variable recipeDetail
   const recipeElement = recipeDetail.getRecipeDOM();//on applique la methode getRecipeDOM
   grid.appendChild(recipeElement);//on affiche la recette dans le DOM
 });
}

//*****BARRE DE RECHERCHE PRINCIPALE *****//

searchInput.addEventListener("input", (e) => {
  const input = e.target.value.toLowerCase();
  let results = [];
  
  // Si la saisie contient au moins 3 caractères
  if (input.length >= 3) {
  for (const recipe of recipesTab) {
  // Vérifier si la saisie correspond au nom de la recette
  if (recipe.name.toLowerCase().includes(input)) {
  results.push(recipe);
  }
  // Vérifier si la saisie correspond à un ingrédient de la recette
  for (const ingredient of recipe.ingredients) {
  if (ingredient.ingredient.toLowerCase().includes(input)) {
  results.push(recipe);
  }
  }
  // Vérifier si la saisie correspond à l'appareil de la recette
  if (recipe.appliance.toLowerCase().includes(input)) {
  results.push(recipe);
  }
  // Vérifier si la saisie correspond à un ustensile de la recette
  for (const ustensil of recipe.ustensils) {
  if (ustensil.toLowerCase().includes(input)) {
  results.push(recipe);
  }
  }
  }
  // Supprimer les doublons du tableau des résultats et créer un nouveau tableau
  results = [...new Set(results)];
  } else {
  // Si la saisie ne contient pas au moins 3 caractères, on affiche toutes les recettes
  results = recipesTab;
  }
  
  if (results.length === 0) {
  // Si aucun résultat n'a été trouvé, afficher le message d'erreur
  grid.innerHTML = `<p class="error-message">Aucune recette ne correspond à votre critère... Vous pouvez chercher "tarte aux pommes", "poisson", etc.</p>`;
  } else {
  displayResults(results);
  }
  
  // Appeler la fonction pour mettre à jour les listes d'ingrédients, d'ustensiles et d'appareils
  updateLists(results);
  });

 // Fonction pour afficher la liste des ingrédients, ustensiles et appareils
function updateLists(results) {
   allIngredients = [];//vider le tableau des ingredients
 results.forEach(recipe => {//pour chaque recette du tableau des résultats
   recipe.ingredients.forEach(ingredient => {//  pour chaque ingrédient de la recette
     allIngredients.push(ingredient.ingredient);//on ajoute l'ingrédient au tableau des ingredients
   });
 });
 allIngredients = [...new Set(allIngredients)];//on transforme le tableau en set pour supprimer les doublons puis on le transforme en tableau
 allIngredients.sort(function(a,b){
   return a.toLowerCase().localeCompare(b.toLowerCase());
 });
 ulIngredients.innerHTML = "";//vider la liste des ingredients
 allIngredients.forEach(ingredient => {//pour chaque ingredient du tableau des ingredients
   const li = document.createElement("li");//on crée un élément li
   li.innerHTML = ingredient;//on affiche l'ingredient dans le li
   ulIngredients.appendChild(li);//on ajoute le li à la liste des ingredients
});

allUstensils = [];//vider le tableau des ustensiles
results.forEach(recipe => {//pour chaque recette du tableau des résultats
 recipe.ustensils.forEach(ustensil => {//  pour chaque ustensile de la recette
   allUstensils.push(ustensil);//on ajoute l'ustensile au tableau des ustensiles
 });
});
allUstensils = [...new Set(allUstensils)];//on transforme le tableau en set pour supprimer les doublons puis on le transforme en tableau
allUstensils.sort(function(a,b){
 return a.toLowerCase().localeCompare(b.toLowerCase());
});
ulUstensils.innerHTML = "";//vider la liste des ustensiles
allUstensils.forEach(ustensil => {//pour chaque ustensile du tableau des ustensiles
 const li = document.createElement("li");//on crée un élément li
 li.innerHTML = ustensil;//on affiche l'ustensile dans le li
 ulUstensils.appendChild(li);//on ajoute le li à la liste des ustensiles
});

allAppliances = [];//vider le tableau des appareils
results.forEach(recipe => {//pour chaque recette du tableau des résultats
 allAppliances.push(recipe.appliance);//on ajoute l'appareil au tableau des appareils
});
allAppliances = [...new Set(allAppliances)];//on transforme le tableau en set pour supprimer les doublons puis on le transforme en tableau
allAppliances.sort(function(a,b){
 return a.toLowerCase().localeCompare(b.toLowerCase());
});
ulAppliances.innerHTML = "";//vider la liste des appareils
allAppliances.forEach(appliance => {//pour chaque appareil du tableau des appareils
 const li = document.createElement("li");//on crée un élément li
 li.innerHTML = appliance;//on affiche l'appareil dans le li
 ulAppliances.appendChild(li);//on ajoute le li à la liste des appareils
});


ingredientsList.appendChild(ulIngredients);//on ajoute la liste des ingredients au DOM
ustensilsList.appendChild(ulUstensils);//on ajoute la liste des ustensiles au DOM
appliancesList.appendChild(ulAppliances);//on ajoute la liste des appareils au DOM
}


//*****BARRE DE RECHERCHE SECONDAIRE INGREDIENTS*****//
//1. recuperer la liste des ingredients de toutes les recettes et suppression des doublons
//2. afficher la liste des ingredients dans le DOM
async function getIngredients() {
 try {
   recipesTab = await getAllRecipes();
   //pour chaque recette du tableau de recettes
   recipesTab.forEach(recipe => {
     //pour chaque ingrédient de la recette
     recipe.ingredients.forEach(ingredient => {
       //on ajoute l'ingrédient au tableau allIngredients
       allIngredients.push(ingredient.ingredient);
     });
   });
   //suppression des doublons
   allIngredients = [...new Set(allIngredients)];
   allIngredients.sort(function(a, b) {//tri
     return a.toLowerCase().localeCompare(b.toLowerCase());
   });
   console.log("liste des ingredients = allIngredients : " + allIngredients);
   //afficher la liste des ingredients dans le DOM
   allIngredients.forEach(ingredient => {
     const li = document.createElement("li");
     li.innerHTML = ingredient;
     ulIngredients.appendChild(li);
   });
   ingredientsList.appendChild(ulIngredients);
 } catch (error) {
   console.error(error);
 }
}
//charger la liste des ingredients
getIngredients();

//*********MENU DEROULANT INGREDIENTS*********** */
//////////////////////////////////////////////

blocSearchIngredients.addEventListener('click', function () {
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

searchInputTagIngredient.addEventListener("input", function() {
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


//*****Liste des ingrédients et mise à jour *****//
searchInputTagIngredient.addEventListener("input", (e) => {//lorsque l'on tape dans la barre de recherche
 const input = e.target.value;//on récupère la saisie
 results = [];//on vide le tableau des résultats
 if (input.length >3) {//si la saisie n'est pas vide
   for (const recipe of recipesTab) {//pour chaque recette du tableau de recettes
     for (const ingredient of recipe.ingredients) {//pour chaque ingrédient de la recette
       if (ingredient.ingredient.toLowerCase().includes(input.toLowerCase())) {
         results.push(recipe);// on ajoute la recette au tableau des résultats
       }
     }
   }
   //results = [...new Set(results)];//on transforme le tableau en set pour supprimer les doublons puis on le transforme en tableau
   console.log("resultats de searchInputTagIngredient dans l'addeventListerner searchiNPUTtAGINGREDIENTS : " +results);
 } else {
   getRecipe();//si on efface la saisie, on affiche toutes les recettes
 }
 if (results.length === 0) {//si aucune recette ne correspond à la saisie, on affiche un message d'erreur
   grid.innerHTML = `<p class="error">Aucune recette ne correspond à votre critère... Vous pouvez chercher "tarte aux pommes", "poisson", etc.</p>`;
 }
 displayResults(results);//on affiche les résultats
 //mettre à jour la liste des ingredients restants en fonction des recettes affichées avec results
 allIngredients = [];//on vide le tableau des ingredients
 results.forEach(recipe => {//pour chaque recette du tableau des résultats
   recipe.ingredients.forEach(ingredient => {//pour chaque ingrédient de la recette
     allIngredients.push(ingredient.ingredient);//on ajoute l'ingrédient au tableau allIngredients
   });//fin de la boucle des ingredients
 });//fin de la boucle des recettes
 allIngredients = [...new Set(allIngredients)];//  suppression des doublons
 allIngredients.sort(function(a, b) {//  tri
   return a.toLowerCase().localeCompare(b.toLowerCase());
 });
 console.log("liste des ingredients = allIngredients : " + allIngredients);
 ulIngredients.innerHTML = "";//on vide la liste des ingredients
 allIngredients.forEach(ingredient => {//pour chaque ingredient du tableau des ingredients
   const li = document.createElement("li");//creation d'un li
   li.innerHTML = ingredient;//on ajoute le texte de l'ingredient au li
   ulIngredients.appendChild(li);//on ajoute le li à la liste des ingredients
 });
 ingredientsList.appendChild(ulIngredients);//on ajoute la liste des ingredients au DOM
});

//*********BARRE DE RECHERCHE SECONDAIRE USTENSILES***********//
//1. recuperer la liste des ustensiles de toutes les recettes et suppression des doublons
//2. afficher la liste des ustensiles dans le DOM
async function getUstensils() {
 try {
   recipesTab = await getAllRecipes();
   //pour chaque recette du tableau de recettes
   recipesTab.forEach(recipe => {
     //pour chaque ustensile de la recette
     recipe.ustensils.forEach(ustensil => {
       //on ajoute l'ustensile au tableau allUstensils
       allUstensils.push(ustensil);
     });
   });
   //suppression des doublons
   allUstensils = [...new Set(allUstensils)];
   allUstensils.sort(function(a, b) {//tri
     return a.toLowerCase().localeCompare(b.toLowerCase());
   });
   console.log("liste des ustensiles = allUstensils : " + allUstensils);
   //afficher la liste des ustensiles dans le DOM
   allUstensils.forEach(ustensil => {
     const li = document.createElement("li");
     li.innerHTML = ustensil;
     ulUstensils.appendChild(li);
   });
   ustensilsList.appendChild(ulUstensils);
 } catch (error) {
   console.log(error);
 }
}
getUstensils();

//*****Menu déroulant Ustensiles *****//
blocSearchUstensiles.addEventListener("click", function() {
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

searchInputTagUstensils.addEventListener("input", function(){
if(toggleIndexUstensiles === 0){
  // OUVIRIR
  ustensilsList.style.height = "auto";
  ustensilsList.classList.toggle("expanded");
  toggleIndexIngredients++;
} else if (toggleIndexUstensiles > 0) {
  // FERMER
  ustensilsList.style.height = `${blocSearchUstensiles.scrollHeight}px`;
  ustensilsList.classList.remove("expanded");
  toggleIndexUstensiles--;
}
});

//*****Liste des ustensiles et mise à jour *****//
searchInputTagUstensils.addEventListener("input", (e) => {//lorsque l'on tape dans la barre de recherche
 const input = e.target.value;//on récupère la saisie
 const results = [];//on crée un tableau vide pour stocker les résultats
 if (input.length >=3) {//si la saisie n'est pas vide
   for (const recipe of recipesTab) {//pour chaque recette du tableau de recettes
     for (const ustensil of recipe.ustensils) {//pour chaque ustensile de la recette
       if (ustensil.toLowerCase().includes(input.toLowerCase())) {//si l'ustensile contient la saisie
         results.push(recipe);//on ajoute la recette au tableau des résultats
       }
     }
   }
   //results = [...new Set(results)];//suppression des doublons
 } else {//si la saisie est vide
   getRecipe();//on affiche toutes les recettes
 }
 if(results.length===0){//si aucun résultat
   grid.innerHTML = `<p class="error">Aucune recette ne correspond à votre critère... Vous pouvez chercher "tarte aux pommes", "poisson", etc.</p>`;
 } displayResults(results);//on affiche les résultats

 allUstensils = [];//on vide le tableau des ustensiles
 results.forEach(recipe => {//pour chaque recette du tableau des résultats
   recipe.ustensils.forEach(ustensil => {//pour chaque ustensile de la recette
     allUstensils.push(ustensil);//on ajoute l'ustensile au tableau des ustensiles
   });
 });
 allUstensils = [...new Set(allUstensils)];//suppression des doublons
 allUstensils.sort(function(a, b) {//tri
   return a.toLowerCase().localeCompare(b.toLowerCase());
 });
 console.log("liste des ustensiles = allUstensils : " + allUstensils);
 //afficher la liste des ustensiles dans le DOM
 ulUstensils.innerHTML = "";//on vide la liste des ustensiles
 allUstensils.forEach(ustensil => {//pour chaque ustensile du tableau des ustensiles
   const li = document.createElement("li");//on crée un élément li
   li.innerHTML = ustensil;//on ajoute l'ustensile dans le li
   ulUstensils.appendChild(li);//on ajoute le li à la liste des ustensiles
 });
 ustensilsList.appendChild(ulUstensils);//on ajoute la liste des ustensiles au DOM
});


//*********BARRE DE RECHERCHE SECONDAIRE APPAREILS***********//
//1. recuperer la liste des appareils de toutes les recettes et suppression des doublons
//2. afficher la liste des appareils dans le DOM
async function getAppliances() {
 try {
   recipesTab = await getAllRecipes();
   //pour chaque recette du tableau de recettes
   recipesTab.forEach(recipe => {
     recipe.appliance.split(",").forEach(appliance => {
       allAppliances.push(appliance);
     });
   });
   //suppression des doublons
   allAppliances = [...new Set(allAppliances)];
   allAppliances.sort(function(a, b) {//tri
     return a.toLowerCase().localeCompare(b.toLowerCase());
   });
   console.log("liste des appareils de la fonction getAppliances = allAppliances : " + allAppliances);
   //afficher la liste des appareils dans le DOM
   allAppliances.forEach(appliance => {
     const li = document.createElement("li");
     li.innerHTML = appliance;
     ulAppliances.appendChild(li);
   });
   appliancesList.appendChild(ulAppliances);
 } catch (error) {
   console.log(error);
 }
}
getAppliances();


//*****Menu déroulant Appareils ****//
blocSearchAppareils.addEventListener("click", function() {
  if (toggleIndexAppareils === 0) {
    // OUVIRIR
    appliancesList.style.height = "auto";
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


searchInputTagAppliances.addEventListener("input", function(){
if(toggleIndexAppareils === 0){
  // OUVIRIR
  appliancesList.style.height = "auto";
  appliancesList.classList.toggle("expanded");
  toggleIndexAppareils++;
} else if (toggleIndexAppareils > 0) {
  // FERMER
  appliancesList.style.height = `${blocSearchAppareils.scrollHeight}px`;
  appliancesList.classList.remove("expanded");
  toggleIndexAppareils--;
}
});


//*****Liste des appareils et mise à jour *****//
searchInputTagAppliances.addEventListener("input", (e) => {//lorsque l'on tape dans la barre de recherche
 const input = e.target.value;//recupere la saisie
 const results = [];//on vide le tableau des résultats
 if (input.length >=3) {//si la saisie n'est pas vide
   for(const recipe of recipesTab) {//pour chaque recette du tableau de recettes
     for(const appliance of recipe.appliance) {//pour chaque appareil de la recette
       if(appliance.toLowerCase().includes(input.toLowerCase())) {//si l'appareil contient la saisie
         results.push(recipe);//on ajoute la recette au tableau des résultats
       }
     }
   } //results = [...new Set(results)];//suppression des doublons
 } else {//si la saisie est vide
   getRecipe();//on affiche toutes les recettes
 } 
 if (results.length === 0) {//si le tableau des résultats est vide
   grid.innerHTML = `<p class="error">Aucune recette ne correspond à votre critère... Vous pouvez chercher "tarte aux pommes", "poisson", etc.</p>`;
 }
 displayResults(results);//on affiche les résultats
 allAppliances = [];

 //pour chaque recette du tableau de recettes
 results.forEach(recipe => {
  recipe.appliance.split(",").forEach(appliance => {
    allAppliances.push(appliance);
  });

 });
 allAppliances = [...new Set(allAppliances)];//suppression des doublons
 allAppliances.sort(function(a, b) {//tri
   return a.toLowerCase().localeCompare(b.toLowerCase());
 });
 console.log("liste des appareils = allAppliances : " + allAppliances);
 ulAppliances.innerHTML = "";//on vide la liste des appareils
 allAppliances.forEach(appliance => {//pour chaque appareil du tableau des appareils
   const li = document.createElement("li");//creation d'un li
   li.innerHTML = appliance;//le li contient l'appareil
   ulAppliances.appendChild(li);//on ajoute le li à la liste des appareils
 });
 appliancesList.appendChild(ulAppliances);//on ajoute la liste des appareils au DOM
});


//***********LES TAGS ****************//
////////////////////////////////////////
////////////CREATION TAG////////////////
const closeBtn = document.createElement("i");
const tags = document.querySelector("#tags");//recupere la div tags 
const tag = document.createElement("span");//creation d'un span
let itemName;//variable qui va contenir le texte du li

//selectedTags recupère les tags créés et supprimés dans le tableau selectedTags
const selectedTags = [];//tableau vide qui va contenir les tags créés 

function createTag(inputValue) {
  const liTag = document.querySelectorAll("#ingredients li, #ustensiles li, #appareils li");// recupere les li des 3 listes
  liTag.forEach((li) => {//pour chaque li
    const itemName = li.textContent.trim().toLowerCase();//recupere le texte du li
    if (itemName.includes(inputValue)) {//si le texte du li contient la saisie
      const tag = document.createElement("span");//creation d'un span
      tag.innerHTML = `<strong>${itemName}</strong>`;//le span contient le texte du li
      const closeBtn = document.createElement("i");//creation d'un i
      closeBtn.classList.add("fa-regular", "fa-times-circle");//ajout de la classe fa-regular et fa-times-circle
      tag.classList.add("selected");//ajout de la classe selected
      if (li.closest('#ingredients')) {//si le li est dans la liste des ingredients
        tag.style.backgroundColor = "#3282F7";
      } else if (li.closest("#ustensiles")) {
        tag.style.backgroundColor = "#ED6454";
      } else if (li.closest("#appareils")) {
        tag.style.backgroundColor = "#68d9a4";
      }
      tags.appendChild(tag);//on ajoute le span au DOM
      tag.appendChild(closeBtn);//on ajoute le i au DOM
      selectedTags.push(itemName);//on ajoute le texte du li au tableau selectedTags
      closeBtn.addEventListener("click", function() {//lorsque l'on clique sur le i
        tag.remove();//on supprime le span
        const index = selectedTags.indexOf(itemName);//on recupere l'index du texte du li dans le tableau selectedTags
        if (index > -1) {//si l'index existe
          selectedTags.splice(index, 1);//on supprime l'index du tableau selectedTags
//on recrée l'élément li avec le texte du span et on l'ajoute au DOM dans la liste correspondante 

//supprime l'ingredient du tableau selectedTags
      //réintégrer l'ingrédient dans les listes
      //et les remettre dans l'ordre alphabétique
      const li = document.createElement("li");//créer un li
      const item = selectedTags[index];//recupere le texte du span
      const inputTag = document.querySelectorAll(".inputTag");//recupere la barre de recherche
      li.innerHTML = item;//
      if (inputTag[0].value === "") {//si la barre de recherche est vide
        if (allIngredients.includes(item)) {//si l'ingredient est dans la liste des ingredients
          ulIngredients.appendChild(li);//on ajoute le li dans la liste des ingredients
        } else if (allUstensils.includes(item)) {//si l'ingredient est dans la liste des ustensiles
          ulUstensils.appendChild(li);//on ajoute le li dans la liste des ustensiles
        } else if (allAppliances.includes(item)) {//si l'ingredient est dans la liste des appareils
          ulAppliances.appendChild(li);//on ajoute le li dans la liste des appareils
        }
      } else {//si la barre de recherche n'est pas vide
        if (allIngredients.includes(item) && item.includes(inputTag[0].value)) {//si l'ingredient est dans la liste des ingredients et qu'il contient la saisie
          ulIngredients.appendChild(li);//on ajoute le li dans la liste des ingredients
        } else if (allUstensils.includes(item) && item.includes(inputTag[0].value)) {//si l'ingredient est dans la liste des ustensiles et qu'il contient la saisie
          ulUstensils.appendChild(li);//on ajoute le li dans la liste des ustensiles
        } else if (allAppliances.includes(item) && item.includes(inputTag[0].value)) {//si l'ingredient est dans la liste des appareils et qu'il contient la saisie
          ulAppliances.appendChild(li);//on ajoute le li dans la liste des appareils
        }
      }
      allIngredients.sort(function(a, b) {//tri
        return a.toLowerCase().localeCompare(b.toLowerCase());
      });
      allUstensils.sort(function(a, b) {//tri
        return a.toLowerCase().localeCompare(b.toLowerCase());
      });
      allAppliances.sort(function(a, b) {//tri
        return a.toLowerCase().localeCompare(b.toLowerCase());
      });
    }
  });

  //appel de la fonction qui filtre les recettes
  filterRecipes();


  //si la liste des tags est vide on la cache

  if (tags.querySelectorAll(".selected").length > 0) {
    tags.style.display = "block";
  } else {
    tags.style.display = "none";
  }
}});
};



function filterRecipes() {
 const searchText = searchInput.value.toLowerCase().trim();//recupere la valeur de l'input
 const filteredRecipes = [];//tableau vide
 for(const recipe of recipesTab){// boucle sur le tableau recipesTab
   const ingredients = recipe.ingredients.map((ingredient) => ingredient.ingredient.toLowerCase());//recupere les ingredients de chaque recette et les met en minuscule et les met dans un nouveau tableau
   const ustensiles = recipe.ustensils.map((ustensile) => ustensile.toLowerCase()); //recupere les ustensiles de chaque recette et les met en minuscule et les met dans un nouveau tableau
   const appareils = recipe.appliance.toLowerCase();// recupere les appareils de chaque recette et les met en minuscule et les met dans un nouveau tableau
   const includesSearchText = recipe.name.toLowerCase().includes(searchText) || ingredients.includes(searchText)|| ustensiles.includes(searchText) || appareils.includes(searchText);//verifie si la valeur de l'input est incluse dans le nom de la recette ou dans les ingredients
   const includesSelectedTags = selectedTags.every((tag) => ingredients.includes(tag)|| ustensiles.includes(tag) || appareils.includes(tag));//verifie si les tags selectionnés sont inclus dans les ingredients
   if (includesSearchText && includesSelectedTags) { 
     filteredRecipes.push(recipe);//si les deux if, on ajoute la recette dans le tableau filteredRecipes
   }
 }
 if (filteredRecipes.length > 0) {//si la taille du tableau filteredRecipes est superieur a 0
   displayResults(filteredRecipes);//on affiche les recettes
 } else {
   grid.innerHTML = "<p>Aucune recette ne correspond à votre recherche.</p>";
 }
}


//OK ajouter l'ingrédient dans le tableau selectedTags
//OK pour le filtrage eds recettes
//OK Supprimer l'ingrédient devenu tag de la liste des ingredients
//KO MAJ de la liste des ingredients
ingredientsList.addEventListener("click", function (e) {
 if (e.target.tagName === "LI") {//si on clique sur un li
   const ingredient = e.target.textContent.trim().toLowerCase();//
   createTag(ingredient);//
   selectedTags.push(ingredient);//on ajoute l'ingredient au tableau selectedTags
   filterRecipes();//on filtre les recettes
   console.log("tags selectionnés : "+ selectedTags);
   console.log("ingredient current : "+ ingredient);
   const liTag = document.querySelectorAll("#ingredients li");//recupere les li de la liste des ingredients
   liTag.forEach((li) => {//pour chaque li
     if (li.textContent.trim().toLowerCase() === ingredient) {//si le texte du li est egal a l'ingredient
       li.remove();//on supprime le li
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
// tags.addEventListener("click", function(e) {
//   const inputTag = document.getElementsByClassName("inputTag");//recupere la barre de recherche

//  if (e.target.tagName === "I") {//si on clique sur une icone
//    const item = e.target.previousElementSibling.textContent.trim().toLowerCase();// recupere le texte du span     
//    e.target.previousElementSibling.remove();//supprime le span
//    e.target.remove();//supprime l'icone
//    const index = selectedTags.indexOf(item);//recupere l'index de l'ingredient dans le tableau selectedTags
//    if (index > -1) {//si l'index est superieur a -1
//      selectedTags.splice(index, 1);
//      //supprime l'ingredient du tableau selectedTags
//      //réintégrer l'ingrédient dans la liste des ingrédients
//      //et les remettre dans l'ordre alphabétique
//      const li = document.createElement("li");
//      li.innerHTML = item;
//      if (inputTag[0].value === "") {
//        if (allIngredients.includes(item)) {
//          ulIngredients.appendChild(li);
//        } else if (allUstensils.includes(item)) {
//          ulUstensils.appendChild(li);
//        } else if (allAppliances.includes(item)) {
//          ulAppliances.appendChild(li);
//         }
//      } else {
//        if (allIngredients.includes(item)) {
//          ulIngredients.appendChild(li);
//        } else if (allUstensils.includes(item)) {
//          ulUstensils.appendChild(li);
//        } else if (allAppliances.includes(item)) {
//          ulAppliances.appendChild(li);
//          }
//      }
     
//    }

//    filterRecipes();
//    console.log(selectedTags);
//  } 
// });



tags.addEventListener("click", function(e) {
  //const inputTag = document.getElementsByClassName("inputTag");//recupere la barre de recherche

  if (e.target.tagName === "I") {//si on clique sur une icone
    const item = e.target.previousElementSibling.textContent.trim().toLowerCase();// recupere le texte du span     
    e.target.previousElementSibling.remove();//supprime le span
    e.target.remove();//supprime l'icone
    const index = selectedTags.indexOf(item);//recupere l'index de l'ingredient dans le tableau selectedTags
    if (index > -1) {//si l'index est superieur a -1
      selectedTags.splice(index, 1);
      } 

    filterRecipes();
      console.log("tableau de selectedTags : " +selectedTags);
      
    
  }
});




//****PROBLEME LA *****/
// searchInputTagAppliances.addEventListener("input", (e) => {//lorsque l'on tape dans la barre de recherche
//  const input = e.target.value;//recupere la saisie
//  const results = [];//on vide le tableau des résultats
//  if (input.length >=3) {//si la saisie n'est pas vide
//    for(const recipe of recipesTab) {//pour chaque recette du tableau de recettes
//      for(const appliance of recipe.appliance) {//pour chaque appareil de la recette
//        if(appliance.toLowerCase().includes(input.toLowerCase())) {//si l'appareil contient la saisie
//          results.push(recipe);//on ajoute la recette au tableau des résultats
//        }
//      }
//    } //results = [...new Set(results)];//suppression des doublons
//  } else {//si la saisie est vide
//    getRecipe();//on affiche toutes les recettes
//  } 
//  if (results.length === 0) {//si le tableau des résultats est vide
//    grid.innerHTML = `<p class="error">Aucune recette ne correspond à votre critère... Vous pouvez chercher "tarte aux pommes", "poisson", etc.</p>`;
//  }
//  displayResults(results);//on affiche les résultats
//  allAppliances = [];

//  //pour chaque recette du tableau de recettes
//  results.forEach(recipe => {
//   recipe.appliance.split(",").forEach(appliance => {
//     allAppliances.push(appliance);
//   });

//  });
//  allAppliances = [...new Set(allAppliances)];//suppression des doublons
//  allAppliances.sort(function(a, b) {//tri
//    return a.toLowerCase().localeCompare(b.toLowerCase());
//  });
//  console.log("liste des appareils = allAppliances : " + allAppliances);
//  ulAppliances.innerHTML = "";//on vide la liste des appareils
//  allAppliances.forEach(appliance => {//pour chaque appareil du tableau des appareils
//    const li = document.createElement("li");//creation d'un li
//    li.innerHTML = appliance;//le li contient l'appareil
//    ulAppliances.appendChild(li);//on ajoute le li à la liste des appareils
//  });
//  appliancesList.appendChild(ulAppliances);//on ajoute la liste des appareils au DOM
// }); 
//afficher que les recettes qui contiennent les appareils recherchés
// searchInputTagAppliances.addEventListener("input",  function() {
//   const input = searchInputTagAppliances.value.trim().toLowerCase();
//   // On filtre les recettes contenant les appareils correspondants
//   if (input.length >= 3) {
//     appliancesTab=[];
//     for(const recipe of recipesTab){
//       for(const appliance of recipe.appliance){
//         if(appliance.toLowerCase().includes(input)){
//           if(!appliancesTab.includes(appliance)){
//             appliancesTab.push(appliance);
//           }
//         }
//       }
//     }
//     results = [];
//     for (const recipe of recipesTab) {
//       if (recipe.name.toLowerCase().includes(input) ||
//         recipe.description.toLowerCase().includes(input)) {
//         results.push(recipe);
//       } else {
//         for (const appliance of recipe.appliance) {
//           if (appliance.toLowerCase().includes(input)) {
//             results.push(recipe);
//             break;
//           }
//         }
//       }
//     }
//     console.table("resultat result : dans APPLIANCES " + JSON.stringify(results));

//     if (results.length > 0) {
//       //mise à jour de la liste des appareils
//       ulAppliances.style.display = "none";
//       appliancesTab.sort(function(a, b) {
//         return a.toLowerCase().localeCompare(b.toLowerCase());
//       });
//       appliancesTab.forEach(appliance => {
//         const li = document.createElement("li");
//         li.innerHTML = `<strong>${appliance}</strong>`;
//         appliancesList.appendChild(li);
//       });
//       displayResults(results);console.log("resultat de appareils : " + results);
//     } else {
//       grid.innerHTML = "Aucune recette ne correspond à votre critère de recherche";
//     }
//   } else if (input.length === 0) {
//     appliancesTab = [];
//     displayResults(recipesTab);
//   }  
// });
// searchInputTagAppliances.addEventListener("input", (e) => {
//   const input = e.target.value;
//   const results = [];

//   if (input.length >= 3) {
//     for (const recipe of recipesTab) {
//       if (recipe.appliance.toLowerCase().includes(input.toLowerCase())) {
//         results.push(recipe);
//       }
//     }
//   } else {
//     getRecipe();
//   }

//   if (results.length === 0) {
//     grid.innerHTML = `<p class="error">Aucune recette ne correspond à votre critère... Vous pouvez chercher "tarte aux pommes", "poisson", etc.</p>`;
//   }

//   displayResults(results);

//   allAppliances = [];

//   results.forEach(recipe => {
//     allAppliances.push(recipe.appliance);
//   });

//   allAppliances = [...new Set(allAppliances)];
//   allAppliances.sort(function(a, b) {
//     return a.toLowerCase().localeCompare(b.toLowerCase());
//   });

//   console.log("liste des appareils = allAppliances : " + allAppliances);

//   ulAppliances.innerHTML = "";
//   allAppliances.forEach(appliance => {
//     const li = document.createElement("li");
//     li.innerHTML = appliance;
//     ulAppliances.appendChild(li);
//   });

//   appliancesList.appendChild(ulAppliances);
// });






//supprime l'ingredient du tableau selectedTags
      //réintégrer l'ingrédient dans les listes
      //et les remettre dans l'ordre alphabétique
      // const li = document.createElement("li");//créer un li
      // li.innerHTML = item;//
      // if (inputTag[0].value === "") {//si la barre de recherche est vide
      //   if (allIngredients.includes(item)) {//si l'ingredient est dans la liste des ingredients
      //     ulIngredients.appendChild(li);//on ajoute le li dans la liste des ingredients
      //   } else if (allUstensils.includes(item)) {//si l'ingredient est dans la liste des ustensiles
      //     ulUstensils.appendChild(li);//on ajoute le li dans la liste des ustensiles
      //   } else if (allAppliances.includes(item)) {//si l'ingredient est dans la liste des appareils
      //     ulAppliances.appendChild(li);//on ajoute le li dans la liste des appareils
      //   }











// // Tri les éléments dans l'ordre alphabétique
      // const ingredients = document.querySelectorAll("#ingredients li");
      // const ustensils = document.querySelectorAll("#ustensiles li");
      // const appliances = document.querySelectorAll("#appareils li");
      // const ingredientsArray = Array.from(ingredients);
      // const ustensilsArray = Array.from(ustensils);
      // const appliancesArray = Array.from(appliances);
      // const ingredientsSorted = ingredientsArray.sort((a, b) => {
      //   return a.textContent.localeCompare(b.textContent);
      // }
      // );
      // const ustensilsSorted = ustensilsArray.sort((a, b) => {
      //   return a.textContent.localeCompare(b.textContent);
      // }
      // );
      // const appliancesSorted = appliancesArray.sort((a, b) => {
      //   return a.textContent.localeCompare(b.textContent);
      // }
      // );
      // ingredientsSorted.forEach((ingredient) => {
      //   ulIngredients.appendChild(ingredient);
      // }
      // );
      // ustensilsSorted.forEach((ustensil) => {
      //   ulUstensils.appendChild(ustensil);
      // }
      // );
      // appliancesSorted.forEach((appliance) => {
      //   ulAppliances.appendChild(appliance);
      // }
      // );
















             // //ajout de l'ingredient dans la liste des ingredients dans l'ordre alphabétique
        // const ulIngredients = document.querySelector("#ingredients ul");
        // const ulUstensils = document.querySelector("#ustensiles ul");
        // const ulAppliances = document.querySelector("#appareils ul");
        // const allIngredients = [];
        // const allUstensils = [];
        // const allAppliances = [];
        // const liIngredients = document.querySelectorAll("#ingredients li");
        // const liUstensils = document.querySelectorAll("#ustensiles li");
        // const liAppliances = document.querySelectorAll("#appareils li");
        // liIngredients.forEach((li) => allIngredients.push(li.textContent.trim()));
        // liUstensils.forEach((li) => allUstensils.push(li.textContent.trim()));
        // liAppliances.forEach((li) => allAppliances.push(li.textContent.trim()));
        // ulIngredients.innerHTML = "";
        // ulUstensils.innerHTML = "";
        // ulAppliances.innerHTML = "";
        // allIngredients.sort(function(a, b) {
        //   return a.toLowerCase().localeCompare(b.toLowerCase());
        // });
        // allUstensils.sort(function(a, b) {
        //   return a.toLowerCase().localeCompare(b.toLowerCase());
        // });
        // allAppliances.sort(function(a, b) {
        //   return a.toLowerCase().localeCompare(b.toLowerCase());
        // });
        // allIngredients.forEach((ingredient) => {
        //   const li = document.createElement("li");
        //   li.innerHTML = ingredient;
        //   ulIngredients.appendChild(li);
        // });
        // allUstensils.forEach((ustensil) => {
        //   const li = document.createElement("li");
        //   li.innerHTML = ustensil;
        //   ulUstensils.appendChild(li);
        // });
        // allAppliances.forEach((appliance) => {
        //   const li = document.createElement("li");
        //   li.innerHTML = appliance;
        //   ulAppliances.appendChild(li);
        // });