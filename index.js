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

 
 async function getAllRecipes() {
   try {
   const response = await fetch("recipes.json");
   //stockage des recettes dans une variable recipesTab
   const recipesTab = await response.json();
   //console.table(recipesTab);
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
      for (let i = 0; i < recipesTab.length; i++) {
        const recipe = recipesTab[i];
        const recipeDetail = recipeFactory(recipe);//on appelle la factory que l'on stocke dans la variable recipeDetail
        const recipeElement = recipeDetail.getRecipeDOM();//on applique la methode getRecipeDOM
        grid.appendChild(recipeElement);//on affiche la recette dans le DOM
      }
    } catch (error) {
      console.error(error);
    }
  }
  //charger la recette  
  getRecipe();
  

//*****AFFICHER LES RESULTATS DANS LE DOM *****//

function displayResults(results) {
    grid.innerHTML = ""; //vider le grid
    for (let i = 0; i < results.length; i++) {
      const recipe = results[i];
      const recipeDetail = recipeFactory(recipe);//on appelle la factory que l'on stocke dans la variable recipeDetail
      const recipeElement = recipeDetail.getRecipeDOM();//on applique la methode getRecipeDOM
      grid.appendChild(recipeElement);//on affiche la recette dans le DOM
    }
  }
  

// Récupérer les ingrédients, les appareils et les ustensiles à partir du tableau recipesTab et les stocker dans des tableaux
const getAllIngredients = async () => {
    try {
    await getAllRecipes();
    for (let i = 0; i < recipesTab.length; i++) {
    const recipe = recipesTab[i];
    for (let j = 0; j < recipe.ingredients.length; j++) {
    const ingredient = recipe.ingredients[j];
    allIngredients.push(ingredient.ingredient);
    }
    }
    allIngredients = [...new Set(allIngredients)];
    allIngredients.sort();
    //console.log("recuperation de getAllIngredients :" ,allIngredients);
    } catch (error) {
    console.log(error);
    }
    };
    getAllIngredients();
    
    const getAllAppliances = async () => {
    try {
    await getAllRecipes();
    for (let i = 0; i < recipesTab.length; i++) {
    const recipe = recipesTab[i];
    allAppliances.push(recipe.appliance);
    }
    allAppliances = [...new Set(allAppliances)];
    //console.log("recuperation de getAllAppliances :" ,allAppliances);
    } catch (error) {
    console.log(error);
    }
    };
    getAllAppliances();
    
    const getAllUstensils = async () => {
    try {
    await getAllRecipes();
    for (let i = 0; i < recipesTab.length; i++) {
    const recipe = recipesTab[i];
    for (let j = 0; j < recipe.ustensils.length; j++) {
    const ustensil = recipe.ustensils[j];
    allUstensils.push(ustensil);
    }
    }
    allUstensils = [...new Set(allUstensils)];
    //console.log("recuperation de getAllUstensils :" ,allUstensils);
    } catch (error) {
    console.log(error);
    }
    };
    getAllUstensils();



//***** Afficher les ingrédients, les appareils et les ustensiles dans le DOM  *//
const displayIngredients = async () => {
    try {
      await getAllIngredients();
      for (let i = 0; i < allIngredients.length; i++) {
        const ingredient = allIngredients[i];
        const li = document.createElement("li");
        li.innerHTML = ingredient;
        ulIngredients.appendChild(li);
      }
      ingredientsList.appendChild(ulIngredients);
    } catch (error) {
      console.log(error);
    }
  };
  displayIngredients();
  
  const displayAppliances = async () => {
    try {
      await getAllAppliances();
      for (let i = 0; i < allAppliances.length; i++) {
        const appliance = allAppliances[i];
        const li = document.createElement("li");
        li.innerHTML = appliance;
        ulAppliances.appendChild(li);
      }
      appliancesList.appendChild(ulAppliances);
    } catch (error) {
      console.log(error);
    }
  };
  displayAppliances();
  
  const displayUstensils = async () => {
    try {
      await getAllUstensils();
      for (let i = 0; i < allUstensils.length; i++) {
        const ustensil = allUstensils[i];
        const li = document.createElement("li");
        li.innerHTML = ustensil;
        ulUstensils.appendChild(li);
      }
      ustensilsList.appendChild(ulUstensils);
    } catch (error) {
      console.log(error);
    }
  };
  displayUstensils();
  
//**** menu dér  oulant ingrédients  *//
blocSearchIngredients.addEventListener("click", () => {
    if (toggleIndexIngredients === 0) {
        ingredientsList.style.height = "auto";
        ingredientsList.classList.add("expanded");
        chevronIngredients.classList.add("rotate");
        toggleIndexIngredients++;
    } else if (toggleIndexIngredients > 0) {
        // FERMER
        ingredientsList.style.height = `${blocSearchIngredients.scrollHeight}px`;
        ingredientsList.classList.remove("expanded");
        chevronIngredients.classList.remove("rotated");
 
        toggleIndexIngredients--;
    }
 });

//**** menu déroulant appareils  *//
blocSearchAppareils.addEventListener("click", () => {
    if (toggleIndexAppareils === 0) {
        appliancesList.style.height = "auto";
        appliancesList.classList.add("expanded");
        chevronAppareils.classList.add("rotate");
        toggleIndexAppareils++;
    } else if (toggleIndexAppareils > 0) {
        // FERMER
        appliancesList.style.height = `${blocSearchAppareils.scrollHeight}px`;
        appliancesList.classList.remove("expanded");
        chevronAppareils.classList.remove("rotated");
 
        toggleIndexAppareils--;
    }
 }
);

//**** menu déroulant ustensiles  *//
blocSearchUstensiles.addEventListener("click", () => {
    if (toggleIndexUstensiles === 0) {
        ustensilsList.style.height = "auto";
        ustensilsList.classList.add("expanded");
        chevronUstensiles.classList.add("rotate");
        toggleIndexUstensiles++;
    } else if (toggleIndexUstensiles > 0) {
        // FERMER
        ustensilsList.style.height = `${blocSearchUstensiles.scrollHeight}px`;
        ustensilsList.classList.remove("expanded");
        chevronUstensiles.classList.remove("rotated");
 
        toggleIndexUstensiles--;
    }
 }
);


//***** RECHERCHE PRINCIPALE  *****//////

//addeventlistener sur l'input de recherche principale
searchInput.addEventListener("input", () => {
    searchRecipes();
});

function searchRecipes() { 
    const input = searchInput.value.toLowerCase();
    const results = [];

    if (input.length > 3) {
        for (let i = 0; i < recipesTab.length; i++) {
            const recipe = recipesTab[i];

            const name = recipe.name.toLowerCase();
            const appliance = recipe.appliance.toLowerCase();
            let found = false;

            for (let j = 0; j < recipe.ingredients.length; j++) {
                const ingredient = recipe.ingredients[j].ingredient.toLowerCase();

                if (name.includes(input) || ingredient.includes(input) || appliance.includes(input)) {
                    results.push(recipe);
                    found = true;
                    break;
                }
            }

            if (!found) {
                for (let j = 0; j < recipe.ustensils.length; j++) {
                    const ustensil = recipe.ustensils[j].toLowerCase();

                    if (ustensil.includes(input)) {
                        results.push(recipe);
                        break;
                    }
                }
            }
        }

        if (results.length === 0) {
            grid.innerHTML = `<p class="error">Aucune recette ne correspond à votre critère... vous pouvez chercher "tarte aux pommes", "poisson", etc.</p>`;
        } else {
            displayResults(results);
            updateLists(results);
        }
    } else if (input.length === 0) {
        displayResults(recipesTab);
        updateLists(recipesTab);
    }
}


// Fonction pour afficher la liste des ingrédients, ustensiles et appareils filtrés par la recherche principale
function updateLists(results) {
    // Vider les tableaux des ingrédients, ustensiles et appareils
    let allIngredients = [];
    let allUstensils = [];
    let allAppliances = [];
  
    // Récupérer tous les ingrédients, ustensiles et appareils des résultats
    for (let i = 0; i < results.length; i++) {
      let recipe = results[i];
  
      for (let j = 0; j < recipe.ingredients.length; j++) {
        let ingredient = recipe.ingredients[j].ingredient;
        if (!allIngredients.includes(ingredient)) {
          allIngredients.push(ingredient);
        }
      }
  
      for (let j = 0; j < recipe.ustensils.length; j++) {
        let ustensil = recipe.ustensils[j];
        if (!allUstensils.includes(ustensil)) {
          allUstensils.push(ustensil);
        }
      }
  
      let appliance = recipe.appliance;
      if (!allAppliances.includes(appliance)) {
        allAppliances.push(appliance);
      }
    }
  
    // Trier les tableaux en ordre alphabétique
    allIngredients.sort(function(a,b){
      return a.toLowerCase().localeCompare(b.toLowerCase());
    });
  
    allUstensils.sort(function(a,b){
      return a.toLowerCase().localeCompare(b.toLowerCase());
    });
  
    allAppliances.sort(function(a,b){
      return a.toLowerCase().localeCompare(b.toLowerCase());
    });
  
    // Vider les listes HTML
    ulIngredients.innerHTML = "";
    ulUstensils.innerHTML = "";
    ulAppliances.innerHTML = "";
  
    // Ajouter les éléments aux listes HTML
    for (let i = 0; i < allIngredients.length; i++) {
      let ingredient = allIngredients[i];
      const li = document.createElement("li");
      li.innerHTML = ingredient;
      ulIngredients.appendChild(li);
    }
  
    for (let i = 0; i < allUstensils.length; i++) {
      let ustensil = allUstensils[i];
      const li = document.createElement("li");
      li.innerHTML = ustensil;
      ulUstensils.appendChild(li);
    }
  
    for (let i = 0; i < allAppliances.length; i++) {
      let appliance = allAppliances[i];
      const li = document.createElement("li");
      li.innerHTML = appliance;
      ulAppliances.appendChild(li);
    }
  
    // Ajouter les listes HTML au DOM
    ingredientsList.appendChild(ulIngredients);
    ustensilsList.appendChild(ulUstensils);
    appliancesList.appendChild(ulAppliances);
  }
  

//// barre de recherche secondaire : ///

//*****LES INGREDIENTS *****//////
searchInputTagIngredient.addEventListener("input", (e) => {
const input = e.target.value;
searchIngredients(input);
updateLists(results);
});  

function searchIngredients(input) {
    results = [];
    if (input.length >= 3) {
      for (const recipe of recipesTab) {
        for (const ingredient of recipe.ingredients) {
          if (ingredient.ingredient.toLowerCase().includes(input.toLowerCase())) {
            results.push(recipe);
          }
        }
      }
      console.log("resultats de searchIngredients : ", results);
    } else {
      getRecipe();
    }
    if (results.length === 0) {
      grid.innerHTML = `<p class="error">Aucune recette ne correspond à votre critère... Vous pouvez chercher "tarte aux pommes", "poisson", etc.</p>`;
    }
    displayResults(results);
}

//*****LES USTENSILES *****//////
searchInputTagUstensils.addEventListener("input", (e) => {
const input = e.target.value;
searchUstensils(input);
updateLists(results);
});

function searchUstensils(input){
    results = [];
    if (input.length >= 3) {
        for (const recipe of recipesTab) {
            for (const ustensil of recipe.ustensils) {
            if (ustensil.toLowerCase().includes(input.toLowerCase())) {
                results.push(recipe);
            }
            }
        }
        console.log("resultats de searchUstensils : ", results);
        }
    else {
        getRecipe();
    }
    if (results.length === 0) {
        grid.innerHTML = `<p class="error">Aucune recette ne correspond à votre critère... Vous pouvez chercher "tarte aux pommes", "poisson", etc.</p>`;
    }
    displayResults(results);
}

//*****LES APPAREILS *****//////
searchInputTagAppliances.addEventListener("input", (e) => {
const input = e.target.value;
searchAppliances(input);
updateLists(results);
});

function searchAppliances(input){
    results = [];
    if (input.length >= 3) {
        for (const recipe of recipesTab) {
            if (recipe.appliance.toLowerCase().includes(input.toLowerCase())) {
                results.push(recipe);
            }
        }
        console.log("resultats de searchAppliances : ", results);
        }

    else {
        getRecipe();
    }
    if (results.length === 0) {
        grid.innerHTML = `<p class="error">Aucune recette ne correspond à votre critère... Vous pouvez chercher "tarte aux pommes", "poisson", etc.</p>`;
    }
    displayResults(results);
}

////// LES TAGS //////
const closeBtn = document.createElement("i");
const tags = document.querySelector("#tags");//recupere la div tags 
const tag = document.createElement("span");//creation d'un span
let itemName;//variable qui va contenir le texte du li

//selectedTags recupère les tags créés et supprimés dans le tableau selectedTags
const selectedTags = [];//tableau vide qui va contenir les tags créés 

//add event listener sur la liste des ingredients
ingredientsList.addEventListener("click", beAnIngredientTag);

//****fonction qui crée les tags ****//
function beAnIngredientTag(e){
  if (e.target.tagName === "LI") {//si l'element cliqué est un li
    const ingredient = e.target.textContent.trim().toLowerCase();//recupere le texte du li et le met en minuscule
    createIngredientTag(ingredient);//appelle la fonction createIngredientTag
    if (!selectedTags.includes(ingredient)) {
        selectedTags.push(ingredient);
      }
      filterRecipesByTags();//appelle la fonction filterRecipes
    console.log("tags selectionnés : "+ selectedTags);
    const liTag = document.querySelectorAll("#ingredients li");//selectionne tous les li de la liste des ingredients
    liTag.forEach((li) => {//boucle sur les li
      if (li.textContent.trim().toLowerCase() === ingredient) {//si le texte du li est égal à l'ingredient
        li.remove();//on supprime le li
      }
    });
  }
}

//add event listener sur la liste des ustensiles
ustensilsList.addEventListener("click", beAnUstensilTag);

//****fonction qui crée les tags ****//
function beAnUstensilTag(e){
    if (e.target.tagName === "LI") {//si l'element cliqué est un li
        const ustensil = e.target.textContent.trim().toLowerCase();//recupere le texte du li et le met en minuscule
        createUstensilTag(ustensil);//appelle la fonction createUstensilTag
        if (!selectedTags.includes(ustensil)) {
            selectedTags.push(ustensil);
            }
            filterRecipesByTags();//appelle la fonction filterRecipes
        console.log("tags selectionnés : "+ selectedTags);
        const liTag = document.querySelectorAll("#ustensils li");//selectionne tous les li de la liste des ustensiles
        liTag.forEach((li) => {//boucle sur les li
            if (li.textContent.trim().toLowerCase() === ustensil) {//si le texte du li est égal à l'ustensil
                li.remove();//on supprime le li
            }
        });
    }
}

//add event listener sur la liste des appareils
appliancesList.addEventListener("click", beAnApplianceTag);

//****fonction qui crée les tags ****//
function beAnApplianceTag(e){
    if (e.target.tagName === "LI") {//si l'element cliqué est un li
        const appliance = e.target.textContent.trim().toLowerCase();//recupere le texte du li et le met en minuscule
        createAppareilTag(appliance);//appelle la fonction createApplianceTag
        if (!selectedTags.includes(appliance)) {
            selectedTags.push(appliance);
            }
            filterRecipesByTags();//appelle la fonction filterRecipes
        console.log("tags selectionnés : "+ selectedTags);
        const liTag = document.querySelectorAll("#appliances li");//selectionne tous les li de la liste des appareils
        liTag.forEach((li) => {//boucle sur les li
            if (li.textContent.trim().toLowerCase() === appliance) {//si le texte du li est égal à l'appareil
                li.remove();//on supprime le li
            }
        });
    }
}


//*****fonction removeTag qui supprime les tags *****//

function removeTag(e) {
    // si l'utilisateur clique sur le bouton de fermeture closeBtn
    if (e.target?.tagName === "I") {
      const tag = e.target.parentElement;
      const tagName = tag.textContent.trim().toLowerCase();
      tag.remove();
      const liTagIngredients = document.querySelectorAll("#ingredients li");
      liTagIngredients.forEach((li) => {
        if (li.textContent.trim().toLowerCase() === tagName) {
          li.remove();
        }
      });
      const liTagUstensils = document.querySelectorAll("#ustensils li");
      liTagUstensils.forEach((li) => {
        if (li.textContent.trim().toLowerCase() === tagName) {
          li.remove();
        }
      });
      const liTagAppliances = document.querySelectorAll("#appliances li");
      liTagAppliances.forEach((li) => {
        if (li.textContent.trim().toLowerCase() === tagName) {
          li.remove();
        }
      });
      const index = selectedTags.indexOf(tagName);
      if (index !== -1) {
        selectedTags.splice(index, 1);
      }
      filterRecipesByTags();
      console.log("tags selectionnés : "+ selectedTags);
    }
  }
     
//add event listener sur la liste des tags
tags.addEventListener("click", removeTag);


//****fonction qui filtre les recettes en fonction des tags selectionnés et qui affiche dans le grid les recettes correspondantes ****//

function filterRecipesByTags() {
    const searchText = searchInput.value.toLowerCase().trim();
    const filteredRecipes = [];
    
    for (let i = 0; i < recipesTab.length; i++) {
      const recipe = recipesTab[i];
      const ingredients = [];
      const ustensiles = [];
      const appareils = recipe.appliance.toLowerCase();
      
      for (let j = 0; j < recipe.ingredients.length; j++) {
        const ingredient = recipe.ingredients[j].ingredient.toLowerCase();
        ingredients.push(ingredient);
      }
      
      for (let k = 0; k < recipe.ustensils.length; k++) {
        const ustensile = recipe.ustensils[k].toLowerCase();
        ustensiles.push(ustensile);
      }
      
      const includesSearchText = recipe.name.toLowerCase().includes(searchText) || ingredients.includes(searchText) || ustensiles.includes(searchText) || appareils.includes(searchText);
      const includesSelectedTags = selectedTags.every((tag) => ingredients.includes(tag) || ustensiles.includes(tag) || appareils.includes(tag));
      
      if (includesSearchText && includesSelectedTags) {
        filteredRecipes.push(recipe);
      }
    }
    
    if (filteredRecipes.length > 0) {
      displayResults(filteredRecipes);
      updateLists(filteredRecipes);
    } else {
      grid.innerHTML = "<p>Aucune recette ne correspond à votre recherche.</p>";
    }
  }
  

