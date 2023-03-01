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
    getIngredients();
    getAppliances();
    getUstensils();
  } catch (error) {
    console.error(error);
  }
}
//charger la recette  
getRecipe();

//VARIABLES
//tableau de recettes
let recipesTab=[];
//  Barrre de recherche principale
const searchInput = document.getElementById("searchInput");
let result = [];
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
const ustensilsList = document.querySelector("#ustensiles");


//AFFICHER UNIQUEMENT LE RESULTAT DE LA RECHERCHE DANS GRID//
function displayResults(results){
  grid.innerHTML = "";
  results.forEach(recipe => {
    const recipeDetail = recipeFactory(recipe);
    const recipeElement = recipeDetail.getRecipeDOM();
    grid.appendChild(recipeElement);
  }); 
}

//********BARRE DE RECHERCHE PRINCIPALE********//
/////////////////////////////////////////////////
/////////////////////////////////////////////////

//faire un addEventListener sur la valeur de l'input searchInput 
//-si input.length >= 3 alors on filtre les recettes en filtrant la valeur de l'input dans le nom, la description et les ingredients. 
//-si le champs est vide on affiche toutes les recettes, 
//-si le champs a une valeur qui correspond à une recette on affiche la ou les recettes, et on stock le resultat dans une variable appelée InputResult qui sera utilisée pour le tri des ingredients
//-si le champs a une valeur qui ne correspond à aucune recette on affiche un message d'erreur 


searchInput.addEventListener("input", function() {
  const input = searchInput.value.trim().toLowerCase();
  if (input.length >= 3) {

    // Vérifier si le texte entré correspond à un ingrédient
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

    // Vérifier si le texte entré correspond à un ustensile
    ustensilsTab = [];
    for (const recipe of recipesTab) {
      for (const utensil of recipe.ustensils) {
        if (utensil.toLowerCase().includes(input)) {
          if (!ustensilsTab.includes(utensil)) {
            ustensilsTab.push(utensil);
          }
        }
      }
    }

    // Vérifier si le texte entré correspond à un appareil pour une chaine de cara
    appliancesTab = [];
    for (const recipe of recipesTab) {
      if (recipe.appliance.toLowerCase().includes(input)) {
        if (!appliancesTab.includes(recipe.appliance)) {
          appliancesTab.push(recipe.appliance);
        }
      }
    }
    // ce n'est pas un tableau mais une chaine de caractère
    // appliancesTab = []; 
    // for (const recipe of recipesTab) {
    //     for (const appliance of recipe.appliance) {
    //         if (appliance.toLowerCase().includes(input)) {
    //           if (!appliancesTab.includes(appliance)) {
    //             appliancesTab.push(appliance);
    //           }
    //         }
    //       }
    //     }
    const result = recipesTab.filter(recipe =>
      recipe.name.toLowerCase().includes(input) ||
      recipe.description.toLowerCase().includes(input) ||
      recipe.ingredients.some(ingredient =>
        ingredient.ingredient.toLowerCase().includes(input)
      ) ||
      recipe.ustensils.some(utensil =>
        utensil.toLowerCase().includes(input)
      ) ||
      recipe.appliance.toLowerCase().includes(input)
    );
    
    if (result.length > 0) {
      displayResults(result);
      ingredientsList.innerHTML = "";
      for (const ingredient of ingredientsTab) {
        const li = document.createElement("li");
        li.textContent = ingredient;
        ingredientsList.appendChild(li);
      }
      for (const utensil of ustensilsTab) {
        const li = document.createElement("li");
        li.textContent = utensil;
        ustensilsList.appendChild(li);
      }
      for (const appliance of appliancesTab) {
        const li = document.createElement("li");
        li.textContent = appliance;
        appliancesList.appendChild(li);
      }
    } else {
      grid.innerHTML = "Aucune recette ne correspond à votre critère de recherche";
      ingredientsList.innerHTML = "";
      ustensilsList.innerHTML = "";
      appliancesList.innerHTML = "";
    }
  } else if (input.length === 0) {
    displayResults(recipesTab);
     ingredientsList.innerHTML = "";
     ustensilsList.innerHTML = "";
     appliancesList.innerHTML = "";
  }
});



// searchInput.addEventListener("input", function() {
//   const input = searchInput.value.trim().toLowerCase();
//   if (input.length >= 3) {
//     // Vérifier si le texte entré correspond à un ingrédient
//     ingredientsList.innerHTML = "";//ajout un innerHTML pour vider la liste des ingredients
//     ingredientsTab = [];
//     for (const recipe of recipesTab) {
//       for (const ingredient of recipe.ingredients) {
//         if (ingredient.ingredient.toLowerCase().includes(input)) {
//           if (!ingredientsTab.includes(ingredient.ingredient)) {
//             ingredientsTab.push(ingredient.ingredient);
//           }
//         }
//       } console.log("input : " +input )
//     }
//     const result = recipesTab.filter(recipe =>
//       recipe.name.toLowerCase().includes(input) ||
//       recipe.description.toLowerCase().includes(input) ||
//       recipe.ingredients.some(ingredient =>
//         ingredient.ingredient.toLowerCase().includes(input)
//       )
//     );console.log("resultat const input : " +JSON.stringify(result));
//     if (result.length > 0) {
//       displayResults(result); 
//       // affiche les résultats filtrés
//     } else {
//       grid.innerHTML = "Aucune recette ne correspond à votre critère de recherche";
//       // const error = document.createElement("p");
//       // error.textContent = "Aucune recette ne correspond à votre critère de recherche";
//       // grid.appendChild(error);
//     }
//   } else if (input.length === 0) {
//     ingredientsTab = [];
//     displayResults(recipesTab);  
//   }
//   //afficher l'ingredient recherché dans l'input principal
//   console.log("ingredientsTab searchbar principale : "+ingredientsTab);
// });

console.log("hello world");

/////////////////////////////////////////////////
//********BARRE DE RECHERCHE INGREDIENTS********//
//////////////////////////////////////////////////
//recuperer la liste de tous ingredients et les afficher dans la div ingredients et supprimer les doublons

async function getIngredients() {
  try {
    ingredientsList.appendChild(ulIngredients); //creer la liste des ingredients
    recipesTab.forEach(recipe => {
      recipe.ingredients.forEach(ingredient => {
        //console.log(ingredient.ingredient);
        if (!allIngredients.includes(ingredient.ingredient.toLowerCase())) {
          allIngredients.push(ingredient.ingredient.toLowerCase());
          const li = document.createElement("li");
          li.innerHTML = `<strong>${ingredient.ingredient}`;
          ulIngredients.appendChild(li);
        }
      });
    });
   console.log("total ingrédients : ", allIngredients.length);
  } catch (error) {
    console.error(error);
  }
}

//afficher que les recettes qui contiennent les ingredients recherchés
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


/////////////////////////////////////////////////
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
        const li = document.createElement("li");
        li.innerHTML = `<strong>${recipe.appliance}`;
        ulAppliances.appendChild(li);
      }
    });
    console.log("total appareils : ", allAppliances.length);
  } catch (error) {
    console.error(error);
  }
}

//afficher que les recettes qui contiennent les appareils recherchés
searchInputTagAppliances.addEventListener("input", function() {
  const input = searchInputTagAppliances.value;
  // On filtre les recettes contenant les appareils correspondants
  if (input.length >= 3) {
    //recherche dans les appareils
    const result = recipesTab.filter(recipe =>
      recipe.appliance.toLowerCase().includes(input.toLowerCase())
    );
    
    if (result.length > 0) {
      displayResults(result);console.log("resultat de appareils : " + result);
    } else {
      grid.innerHTML = "Aucune recette ne correspond à votre critère de recherche";
    }
  } else {
    displayResults(recipesTab);
  }  
});

////////////////////////////////////////////
//*********MENU DEROULANT APPAREILS*********** */
const blocSearchAppareils = document.querySelector(".blocSearchAppareils");
let toggleIndexAppareils = 0;

blocSearchAppareils.addEventListener('click', () => {
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

//////////////////////////////////////////////
//*********MENU DEROULANT INGREDIENTS*********** */
const blocSearchIngredients = document.querySelector(".blocSearchIngredients");
let toggleIndexIngredients = 0;

blocSearchIngredients.addEventListener('click', () => {
  const chevronIngredients = document.querySelector("#chevronIngredients");
    if (toggleIndexIngredients === 0) {
        // OUVIRIR
        ingredientsList.style.height = `${ingredientsList.scrollHeight}px`;
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


//////////////////////////////////////////////
//*********MENU DEROULANT USTENSILES*********** */
const blocSearchUstensiles = document.querySelector(".blocSearchUstensiles");
let toggleIndexUstensiles = 0;

blocSearchUstensiles.addEventListener('click', () => {
  const chevronUstensiles = document.querySelector("#chevronUstensiles");
  if (toggleIndexUstensiles === 0) {
      // OUVIRIR
      ustensilsList.style.height = `${ustensilsList.scrollHeight}px`;
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

/////////////////////////////////////////////////
//********BARRE DE RECHERCHE USTENSILES********//
//////////////////////////////////////////////////
//recuperer la liste de tous les ustensiles et les afficher dans la div ustensiles et supprimer les doublons
async function getUstensils() {
  const ulUstensils = document.createElement("ul");
  try {
    ustensilsList.appendChild(ulUstensils); //creer la liste des appareils
    recipesTab.forEach(recipe => {
      recipe.ustensils.forEach(ustensil => {
        if (!allUstensils.includes(ustensil.toLowerCase())) {
          allUstensils.push(ustensil.toLowerCase());
          const li = document.createElement("li");
          li.innerHTML = `<strong>${ustensil}`;
          ulUstensils.appendChild(li);
        }
      });
    });
    console.log("total ustensiles : ", allUstensils.length);
  } catch (error) {
    console.error(error);
  }
}

// //afficher que les recettes qui contiennent les ustensiles recherchés
searchInputTagUstensils.addEventListener("input", function() {
  const input = searchInputTagUstensils.value;
  // On filtre les recettes contenant les appareils correspondants
  if (input.length >= 3) {
    //recherche dans les appareils
    const result = recipesTab.filter(recipe =>
      recipe.ustensils.some(ustensil => ustensil.toLowerCase().includes(input.toLowerCase()))
    );
    if (result.length > 0) {
      displayResults(result);
    } else {
      grid.innerHTML = "Aucune recette ne correspond à votre critère de recherche";
    }
  } else {
    displayResults(recipesTab);
  }    console.log("le result ustensile : "+result);
    console.log("tableau ingredientTab : " +ingredientsTab);
});

////////////////////////////////////////
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

      if (li.parentElement.id === "ingredients") {
        tag.style.backgroundColor = "#3282F7";
      } else if (li.parentElement.id === "ustensiles") {
        tag.style.backgroundColor = "orange";
      } else if (li.parentElement.id === "appareils") {
        tag.style.backgroundColor = "green";
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
  const filteredRecipes = recipesTab.filter((recipe) => {
    const ingredients = recipe.ingredients.map((ingredient) => ingredient.ingredient.toLowerCase());
    const ustensiles = recipe.ustensils.map((ustensile) => ustensile.toLowerCase());
    const appareils = recipe.appliance.toLowerCase();
    const includesSearchText = recipe.name.toLowerCase().includes(searchText) || ingredients.includes(searchText)|| ustensiles.includes(searchText) || appareils.includes(searchText);
    const includesSelectedTags = selectedTags.every((tag) => ingredients.includes(tag)|| ustensiles.includes(tag) || appareils.includes(tag));
    return includesSearchText && includesSelectedTags;
  });
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

