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
let ingredientsTab = [];//tableau des ingredients selectionnés
const ingredientsList = document.querySelector("#ingredients");
const ulIngredients = document.createElement("ul");

//Barrre de recherche secondaire appareils
const searchInputTagAppliances = document.getElementById("searchInputTagAppareil");
let toggleIndexAppareils = 0;
const blocSearchAppareils = document.querySelector(".blocSearchAppareils");
const chevronAppareils = document.querySelector("#chevronAppareils");

let allAppliances= [];//liste des appareils
let appliancesTab = [];//
const appliancesList = document.querySelector("#appareils");
const ulAppliances = document.createElement("ul");

//barre de recherche secondaire ustensiles
const blocSearchUstensiles = document.querySelector(".blocSearchUstensiles");
const searchInputTagUstensils = document.getElementById("searchInputTagUstensile");

let toggleIndexUstensiles = 0;
const chevronUstensiles = document.querySelector("#chevronUstensiles");

let allUstensils = [];//liste des ustensiles
let ustensilsTab = [];
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
 if (input.length >0) {//si la saisie n'est pas vide
   for (const recipe of recipesTab) {//pour chaque recette du tableau de recettes
     for (const ingredient of recipe.ingredients) {//pour chaque ingrédient de la recette
       if (ingredient.ingredient.toLowerCase().includes(input.toLowerCase())) {
         results.push(recipe);// on ajoute la recette au tableau des résultats
       }
     }
   }
   results = [...new Set(results)];//on transforme le tableau en set pour supprimer les doublons puis on le transforme en tableau
   console.log("resultats de searchInputTagIngredient : " +results);
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
     chevronUstensiles.classList.toggle("rotated");

     toggleIndexUstensiles++;
 } else if (toggleIndexUstensiles > 0) {
     // FERMER
     ustensilsList.style.height = `${blocSearchUstensiles.scrollHeight}px`;
     ustensilsList.classList.remove("expanded");
     chevronUstensiles.classList.remove("rotated");
     toggleIndexUstensiles--;
 }
});

searchInputTagUstensils.addEventListener("input", (e) => {//lorsque l'on tape dans la barre de recherche
 if(toggleIndexUstensiles===0){
   //OUVRIR
   ustensilsList.style.height = "auto";
   ustensilsList.classList.toggle("expanded");
   toggleIndexUstensiles++;
 } else if(toggleIndexUstensiles>0){
   //FERMER
   ustensilsList.style.height = `${blocSearchUstensiles.scrollHeight}px`;
   ustensilsList.classList.remove("expanded");
   toggleIndexUstensiles--;
 }
});

//*****Liste des ustensiles et mise à jour *****//
searchInputTagUstensils.addEventListener("input", (e) => {//lorsque l'on tape dans la barre de recherche
 const input = e.target.value;//on récupère la saisie
 const results = [];//on crée un tableau vide pour stocker les résultats
 if (input.length > 0) {//si la saisie n'est pas vide
   for (const recipe of recipesTab) {//pour chaque recette du tableau de recettes
     for (const ustensil of recipe.ustensils) {//pour chaque ustensile de la recette
       if (ustensil.toLowerCase().includes(input.toLowerCase())) {//si l'ustensile contient la saisie
         results.push(recipe);//on ajoute la recette au tableau des résultats
       }
     }
   }
   results = [...new Set(results)];//suppression des doublons
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
   console.log("liste des appareils = allAppliances : " + allAppliances);
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
blocSearchAppareils.addEventListener("click", (e) => {//lorsque l'on clique sur le bloc de recherche
 if (toggleIndexAppareils === 0) {//si le menu est fermé
   //OUVRIR
   appliancesList.style.height = "auto";
   appliancesList.classList.toggle("expanded");
   chevronAppareils.classList.toggle("rotated");
   toggleIndexAppareils++;
 } else if (toggleIndexAppareils > 0) {//si le menu est ouvert
   //FERMER
   appliancesList.style.height = `${blocSearchAppareils.scrollHeight}px`;
   appliancesList.classList.remove("expanded");
   chevronAppareils.classList.remove("rotated");
   toggleIndexAppareils--;
 }
});

searchInputTagAppliances.addEventListener("input", (e) => {//lorsque l'on tape dans la barre de recherche
 if(toggleIndexAppareils===0){//si le menu est fermé
   //OUVRIR
   appliancesList.style.height = "auto";
   appliancesList.classList.toggle("expanded");
   toggleIndexAppareils++;
 } else if(toggleIndexAppareils>0){//si le menu est ouvert
   //FERMER
   appliancesList.style.height = `${blocSearchAppareils.scrollHeight}px`;
   appliancesList.classList.remove("expanded");
   toggleIndexAppareils--;
 }
});

//*****Liste des ingrédients et mise à jour *****//
searchInputTagAppliances.addEventListener("input", (e) => {//lorsque l'on tape dans la barre de recherche
 const input = e.target.value;//recupere la saisie
 results = [];//on vide le tableau des résultats
 if (input.length > 0) {//si la saisie n'est pas vide
   for(const recipe of recipesTab) {//pour chaque recette du tableau de recettes
     for(const appliance of recipe.appliance) {//pour chaque appareil de la recette
       if(appliance.toLowerCase().includes(input.toLowerCase())) {//si l'appareil contient la saisie
         results.push(recipe);//on ajoute la recette au tableau des résultats
       }
     }
   } results = [...new Set(results)];//suppression des doublons
 } else {//si la saisie est vide
   getRecipe();//on affiche toutes les recettes
 } 
 if (results.length === 0) {//si le tableau des résultats est vide
   grid.innerHTML = `<p class="error">Aucune recette ne correspond à votre critère... Vous pouvez chercher "tarte aux pommes", "poisson", etc.</p>`;
 }
 displayResults(results);//on affiche les résultats
 allAppliances = [];//on vide le tableau des appareils
 results.forEach(recipe => {//pour chaque recette du tableau des résultats
   recipe.appliance.forEach(appliance => {//pour chaque appareil de la recette
     allAppliances.push(appliance);//on ajoute l'appareil au tableau des appareils
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
function createTag(inputValue) {//
 const liTag = document.querySelectorAll("#ingredients li, #ustensiles li, #appareils li");//recupere les li de chaque liste
 liTag.forEach((li) => {//pour chaque li
   const itemName = li.textContent.trim().toLowerCase();//recupere le texte de chaque li
   if (itemName.includes(inputValue)) {//si le texte du li contient la valeur de l'input
     tag.innerHTML = `<strong>${itemName}</strong>`;//le span contient le texte du li
     closeBtn.classList.add("fa-regular", "fa-times-circle");
     tag.classList.add("selected");//ajout de la classe selected au span

     if (li.closest('#ingredients')) {//si le li est dans la liste ingredients
       tag.style.backgroundColor = "#3282F7";
     } else if (li.closest("#ustensiles")) {
       tag.style.backgroundColor = "#ED6454";
     } else if (li.closest("#appareils")) {
       tag.style.backgroundColor = "#68d9a4";
     }

     tags.appendChild(tag);
     tag.appendChild(closeBtn);

 selectedTags.push(itemName); // Ajout du tag à selectedTags


 closeBtn.addEventListener("click", function() {
   tag.style.display = "none";
   const index = selectedTags.indexOf(itemName);
   if (index > -1) {
     selectedTags.splice(index, 1); // Suppression du tag de selectedTags
     //rajout de l'ingredient dans la liste des ingredients dans l'ordre alphabétique
      // Trie les ingrédients dans l'ordre alphabétique
      
      const li = document.createElement("li");
      li.innerHTML = itemName;
      ulIngredients.appendChild(li);
      ulUstensils.appendChild(li);
      ulAppliances.appendChild(li);
      ingredientsList.appendChild(ulIngredients);
       ustensilsList.appendChild(ulUstensils);
       appliancesList.appendChild(ulAppliances);
      allIngredients.sort(function(a, b) {
       return a.toLowerCase().localeCompare(b.toLowerCase());
     });
     allUstensils.sort(function(a, b) {
       return a.toLowerCase().localeCompare(b.toLowerCase());
     });
     allAppliances.sort(function(a, b) {
       return a.toLowerCase().localeCompare(b.toLowerCase());
     });
     }
     
     filterRecipes();
   });
}
});

 if (tags.querySelectorAll(".selected").length > 0) {
   tags.style.display = "block";
 } else {
   tags.style.display = "none";
 }
};

// //afficher que les recettes qui contiennent les tags recherchés
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
tags.addEventListener("click", function(e) {
 if (e.target.tagName === "I") {//si on clique sur une icone
   const item = e.target.previousElementSibling.textContent.trim().toLowerCase();// recupere le texte du span     
   e.target.previousElementSibling.remove();//supprime le span
   e.target.remove();//supprime l'icone
   const index = selectedTags.indexOf(item);//recupere l'index de l'ingredient dans le tableau selectedTags
   if (index > -1) {//si l'index est superieur a -1
     selectedTags.splice(index, 1);//on supprime l'ingredient du tableau selectedTags
   }
   filterRecipes();
   console.log(selectedTags);
 } 
});

// //addeventlistener sur l'icone et faire revenir l'ingredient, l'ustensile ou l'appareil dans leur liste par ordre alphabétique
// closeBtn.addEventListener("click", function(e) {
//   if (e.target.tagName === "I") {//si on clique sur une icone
//     const item = e.target.previousElementSibling.textContent.trim().toLowerCase();// recupere le texte du span
//     //on recree le li
//     const li = document.createElement("li");
//     li.textContent = item;
//     //on recree le span
//     const span = document.createElement("span");
//     span.textContent = item;
//     //on recree l'icone
//     const i = document.createElement("i");
//     i.classList.add("fas", "fa-times");
//     //on ajoute le span et l'icone dans le li
//     li.appendChild(span);
//     li.appendChild(i);
//     //on ajoute le li dans la liste des ingredients
//     ingredientsList.appendChild(li);
//     //ou dans la liste des ustensiles
//     ustensilsList.appendChild(li);
//     //ou dans la liste des appareils
//     appliancesList.appendChild(li);
//     //on supprime le span et l'icone
//     e.target.previousElementSibling.remove();
//     e.target.remove();
//     //on supprime l'ingredient du tableau selectedTags
//     const index = selectedTags.indexOf(item);//recupere l'index de l'ingredient dans le tableau selectedTags
//     if (index > -1) {//si l'index est superieur a -1
//       selectedTags.splice(index, 1);//on supprime l'ingredient du tableau selectedTags
//     }
//     filterRecipes();
//     console.log(selectedTags);
//   }
// });


