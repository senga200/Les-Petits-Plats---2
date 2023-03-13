
function recipeFactory(data) {
      const { name, time, ingredients, description } = data;
    
      function getRecipeDOM() {
  //creer la carte recette et adopter le style css recette_container
        const recipeContainer = document.createElement("div");
        recipeContainer.classList.add("recette_container");
  //creer la div photo et adopter le style css photo_recette et ajouter la photo cuisine.jpg
        const photo = document.createElement("div");
        photo.classList.add("photo-recette");
        const img = document.createElement("img");
        img.src = "cuisine.jpg";
        photo.appendChild(img);
        recipeContainer.appendChild(photo);
  //creer la div titre et adopter le style css titre_recette et ajouter le nom de la recette et le temps de preparation   
        const title = document.createElement("div");
        title.classList.add("titre_recette");
        const h2 = document.createElement("h2");
        h2.textContent = name;
        title.appendChild(h2);
        const span = document.createElement("span");
        span.classList.add("temps");
        span.innerHTML = `<i class="fas fa-regular fa-clock"></i>${time}min`;
        title.appendChild(span);
        recipeContainer.appendChild(title);
  //creer la div description et adopter le style css description_recette 
        const descriptionContainer = document.createElement("div");
        descriptionContainer.classList.add("description_recette");
  //creer la div ingredients et adopter le style css ingredients_recette et ajouter la liste des ingredients
        const ingredientsList = document.createElement("div");
        ingredientsList.classList.add("ingredients_recette");
  //boucle for each pour ajouter les ingredients (tableau ingredients dans tableau recip)
          ingredients.forEach(({ ingredient, quantity, unit }) => {
              const li = document.createElement("li");
              //appliquer des caractères gras à ingredient
              li.innerHTML = `<strong>${ingredient}</strong> : ${quantity} ${unit || ""}`;
  
              ingredientsList.appendChild(li);
          });
        descriptionContainer.appendChild(ingredientsList);
  //creer la div recette et adopter le style css recette et ajouter la description de la recette
        const recipe = document.createElement("div");
        recipe.classList.add("recette");
        const p = document.createElement("p");
        p.textContent = description;
        recipe.appendChild(p);
        descriptionContainer.appendChild(recipe);
    
        recipeContainer.appendChild(descriptionContainer);
  
        return recipeContainer;
      }
    
      return { getRecipeDOM };
    }
  
  
    // creation d'une factory pattern pour les tags
  
  
    function createTagFactory(tagColor) {
        return function createTag(inputValue) {
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
                tag.style.backgroundColor = tagColor.ingredients;
              } else if (li.closest("#ustensiles")) {
                tag.style.backgroundColor = tagColor.ustensiles;
              } else if (li.closest("#appareils")) {
                tag.style.backgroundColor = tagColor.appareils;
              }
              tags.appendChild(tag);
              tag.appendChild(closeBtn);
              selectedTags.push(itemName);
              closeBtn.addEventListener("click", function() {
                removeTag(tag, itemName); //supprimer le tag
              });
            }
          });
          searchRecipes();
        };
      }
      
      // Définition des couleurs de fond pour chaque type de tag
      const tagColor = {
        ingredients: "#3282F7",
        ustensiles: "#ED6454",
        appareils: "#68d9a4"
      };
      
      // Création des fonctions createTag avec les couleurs de fond définies
      const createIngredientTag = createTagFactory(tagColor);
      const createUstensileTag = createTagFactory(tagColor);
      const createAppareilTag = createTagFactory(tagColor);