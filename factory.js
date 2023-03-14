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
        const descriptionContainer = document.createElement("div");
        descriptionContainer.classList.add("description_recette");
        const ingredientsList = document.createElement("div");
        ingredientsList.classList.add("ingredients_recette");
          ingredients.forEach(({ ingredient, quantity, unit }) => {// destructuring
              const li = document.createElement("li");
             let liText = `<strong>${ingredient}</strong>`;
             if (quantity) {
               liText += ` ${quantity}`;
             }
             if (unit) {
               liText += ` ${unit}`;
             }
             li.innerHTML = liText;
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

    function createIngredientTagFactory(tagColor) {
      return function createIngredientTag(inputValue) {
        const liTag = document.querySelectorAll("#ingredients li");
        liTag.forEach((li) => {
          const itemName = li.textContent.trim().toLowerCase();
          if (itemName===inputValue) {
            const tag = document.createElement("span");
            tag.innerHTML = `<strong>${itemName}</strong>`;
            const closeBtn = document.createElement("i");
            closeBtn.classList.add("fa-regular", "fa-times-circle");
            tag.classList.add("selected");
            tag.style.backgroundColor = tagColor.ingredients;
            tags.appendChild(tag);
            tag.appendChild(closeBtn);
            selectedTags.push(itemName);
            closeBtn.addEventListener("click", function() {
              removeTag(tag, itemName);
            });
          }
        });
        searchRecipes();
      };
    }
    
    function createUstensileTagFactory(tagColor) {
      return function createUstensileTag(inputValue) {
        const liTag = document.querySelectorAll("#ustensiles li");
        liTag.forEach((li) => {
          const itemName = li.textContent.trim().toLowerCase();
          if (itemName===inputValue) {
            const tag = document.createElement("span");
            tag.innerHTML = `<strong>${itemName}</strong>`;
            const closeBtn = document.createElement("i");
            closeBtn.classList.add("fa-regular", "fa-times-circle");
            tag.classList.add("selected");
            tag.style.backgroundColor = tagColor.ustensiles;
            tags.appendChild(tag);
            tag.appendChild(closeBtn);
            selectedTags.push(itemName);
            closeBtn.addEventListener("click", function() {
              removeTag(tag, itemName);
            });
          }
        });
        searchRecipes();
      };
    }
    
    function createAppareilTagFactory(tagColor) {
      return function createAppareilTag(inputValue) {
        const liTag = document.querySelectorAll("#appareils li");
        liTag.forEach((li) => {
          const itemName = li.textContent.trim().toLowerCase();
          if (itemName===inputValue) {
            const tag = document.createElement("span");
            tag.innerHTML = `<strong>${itemName}</strong>`;
            const closeBtn = document.createElement("i");
            closeBtn.classList.add("fa-regular", "fa-times-circle");
            tag.classList.add("selected");
            tag.style.backgroundColor = tagColor.appareils;
            tags.appendChild(tag);
            tag.appendChild(closeBtn);
            selectedTags.push(itemName);
            closeBtn.addEventListener("click", function() {
              removeTag(tag, itemName);
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
    const createIngredientTag = createIngredientTagFactory(tagColor);
    const createUstensileTag = createUstensileTagFactory(tagColor);
    const createAppareilTag = createAppareilTagFactory(tagColor);
    