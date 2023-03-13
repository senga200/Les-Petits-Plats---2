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
   

function displayResults(results) {
    grid.innerHTML = "";//vider le grid
    results.forEach(recipe => {//pour chaque recette du tableau des résultats
      const recipeDetail = recipeFactory(recipe);//on appelle la factory que l'on stocke dans la variable recipeDetail
      const recipeElement = recipeDetail.getRecipeDOM();//on applique la methode getRecipeDOM
      grid.appendChild(recipeElement);//on affiche la recette dans le DOM
    });
   }

//***** Récuperer les ingrédients, les appareils et les ustensiles à partir du tableau recipesTab et les stocker dans des tableaux  *//
const getAllIngredients = async () => {
  try {
      await getAllRecipes();
      recipesTab.forEach((recipe) => {
          recipe.ingredients.forEach((ingredient) => {
              allIngredients.push(ingredient.ingredient);
          });
      });
      allIngredients = [...new Set(allIngredients)];
      //console.log("recuperation de getAllIngredients :" ,allIngredients);
      //trier les ingrédients par ordre alphabétique
      allIngredients.sort();
  } catch (error) {
      console.log(error);
  }
}
getAllIngredients();

const getAllAppliances = async () => {
  try {
      await getAllRecipes();
      recipesTab.forEach((recipe) => {
          allAppliances.push(recipe.appliance);
      });
      allAppliances = [...new Set(allAppliances)];
      //console.log("recuperation de getAllAppliances :" ,allAppliances);
  } catch (error) {
      console.log(error);
  }
}
getAllAppliances();

const getAllUstensils = async () => {
  try {
      await getAllRecipes();
      recipesTab.forEach((recipe) => {
          recipe.ustensils.forEach((ustensil) => {
              allUstensils.push(ustensil);
          });
      });
      allUstensils = [...new Set(allUstensils)];
      //console.log("recuperation de getAllUstensils :" ,allUstensils);
  } catch (error) {
      console.log(error);
  }
}
getAllUstensils();


//***** Afficher les ingrédients, les appareils et les ustensiles dans le DOM  *//
const displayIngredients = async () => {
  try {
      await getAllIngredients();
      allIngredients.forEach((ingredient) => {
          const li = document.createElement("li");
          li.innerHTML = ingredient;
          ulIngredients.appendChild(li);
      });
      ingredientsList.appendChild(ulIngredients);
  } catch (error) {
      console.log(error);
  }
}
displayIngredients();

const displayAppliances = async () => {
  try {
      await getAllAppliances();
      allAppliances.forEach((appliance) => {
          const li = document.createElement("li");
          li.innerHTML = appliance;
          ulAppliances.appendChild(li);
      });
      appliancesList.appendChild(ulAppliances);
  } catch (error) {
      console.log(error);
  }
}
displayAppliances();

const displayUstensils = async () => {
  try {
      await getAllUstensils();
      allUstensils.forEach((ustensil) => {
          const li = document.createElement("li");
          li.innerHTML = ustensil;
          ulUstensils.appendChild(li);
      });
      ustensilsList.appendChild(ulUstensils);
  } catch (error) {
      console.log(error);
  }
}
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
  const input = searchInput.value;
  if (input.length > 3) {
      results = recipesTab.filter(recipe => {
          return recipe.name.toLowerCase().includes(input.toLowerCase()) ||
              recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(input.toLowerCase())) ||
              recipe.appliance.toLowerCase().includes(input.toLowerCase()) ||
              recipe.ustensils.some(ustensil => ustensil.toLowerCase().includes(input.toLowerCase()))
      });
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

//// barre de recherche secondaire : ///

//*****LES INGREDIENTS *****//////
searchInputTagIngredient.addEventListener("input", (e) => {
  const input = e.target.value;
  searchIngredients(input);
  updateLists(results);
  });  

  function searchIngredients(input) {
    if (input.length >= 3) {
      results = recipesTab.filter((recipe) =>
        recipe.ingredients.some(
          (ingredient) =>
            ingredient.ingredient.toLowerCase().indexOf(input.toLowerCase()) !== -1
        )
      );
      console.log("resultats de searchIngredients : ", results);
    } else {
      getRecipe();
    }
    if (results.length === 0) {
      grid.innerHTML = `<p class="error">Aucune recette ne correspond à votre critère... Vous pouvez chercher "tarte aux pommes", "poisson", etc.</p>`;
    }
  }


//*****LES USTENSILES *****//////
searchInputTagUstensils.addEventListener("input", (e) => {
  const input = e.target.value;
  searchUstensils(input);
  updateLists(results);
  });
  

//fonction searchUstensils avec la methode filter 
function searchUstensils(input) {
  if (input.length >= 3) {
    results = recipesTab.filter((recipe) =>
      recipe.ustensils.some(
        (ustensil) =>
          ustensil.toLowerCase().indexOf(input.toLowerCase()) !== -1
      )
    );
    console.log("resultats de searchUstensils : ", results);
  } else {
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

  function searchAppliances(input) {
    if (input.length >= 3) {
      results = recipesTab.filter((recipe) =>
        recipe.appliance.toLowerCase().indexOf(input.toLowerCase()) !== -1
      );
      console.log("resultats de searchAppliances : ", results);
    } else {
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


function beAnIngredientTag(e) {
  if (e.target.tagName === "LI") {
    const ingredient = e.target.textContent.trim().toLowerCase();
    createIngredientTag(ingredient);
    if (!selectedTags.includes(ingredient)) {
      selectedTags.push(ingredient);
    }
    filterRecipesByTags();
    console.log("tags selectionnés : " + selectedTags);
    const liTag = document.querySelectorAll("#ingredients li");
    Array.from(liTag)
      .filter((li) => li.textContent.trim().toLowerCase() === ingredient)
      .forEach((li) => li.remove());
  }
}

//add event listener sur la liste des ustensiles
ustensilsList.addEventListener("click", beAnUstensilTag);


//****fonction qui crée les tags ****//
function beAnUstensilTag(e){
  if (e.target.tagName === "LI") {
    const ustensil = e.target.textContent.trim().toLowerCase();
    createUstensilTag(ustensil);
    if (!selectedTags.includes(ustensil)) {
      selectedTags.push(ustensil);
    }
    filterRecipesByTags();
    console.log("tags selectionnés : "+ selectedTags);
    const liTag = document.querySelectorAll("#ustensils li");
    Array.from(liTag)
      .filter((li) => li.textContent.trim().toLowerCase() === ustensil)
      .forEach((li) => li.remove());
  }
}


//add event listener sur la liste des appareils
appliancesList.addEventListener("click", beAnApplianceTag);

function beAnApplianceTag(e){
  if (e.target.tagName === "LI") {//si l'element cliqué est un li
      const appliance = e.target.textContent.trim().toLowerCase();//recupere le texte du li et le met en minuscule
      createAppareilTag(appliance);//appelle la fonction createAppareilTag
      if (!selectedTags.includes(appliance)) {
          selectedTags.push(appliance);
      }
      filterRecipesByTags();//appelle la fonction filterRecipes
      console.log("tags selectionnés : "+ selectedTags);
      const liTag = Array.from(document.querySelectorAll("#appliances li"));//selectionne tous les li de la liste des appareils
      liTag.filter(li => li.textContent.trim().toLowerCase() === appliance)
           .forEach(li => li.remove());//supprime les li avec le texte égal à l'appareil
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
  
  const filteredRecipes = recipesTab.filter(recipe => {
    const ingredients = recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase());
    const ustensiles = recipe.ustensils.map(ustensile => ustensile.toLowerCase());
    const appareils = recipe.appliance.toLowerCase();
    
    const includesSearchText = recipe.name.toLowerCase().includes(searchText) || ingredients.includes(searchText) || ustensiles.includes(searchText) || appareils.includes(searchText);
    const includesSelectedTags = selectedTags.every(tag => ingredients.includes(tag) || ustensiles.includes(tag) || appareils.includes(tag));
    
    return includesSearchText && includesSelectedTags;
  });
  
  if (filteredRecipes.length > 0) {
    displayResults(filteredRecipes);
    updateLists(filteredRecipes);
  } else {
    grid.innerHTML = "<p>Aucune recette ne correspond à votre recherche.</p>";
  }
}
