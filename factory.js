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
          ingredients.forEach(({ ingredient, quantity, unit }) => {// destructuring de l'objet ingredients
              const li = document.createElement("li");//creer la liste des ingredients
             let liText = `<strong>${ingredient}</strong>`;//creer le texte de la liste des ingredients
             if (quantity) {//si la quantité existe
               liText += ` ${quantity}`;//ajouter la quantité
             }//si la quantité existe
             if (unit) {//si l'unité existe
               liText += ` ${unit}`;//ajouter l'unité
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
      function createIngredientTag(inputValue) {
        const liTag = document.querySelectorAll("#ingredients li");
        liTag.forEach((li) => {//pour chaque li
          const itemName = li.textContent.trim().toLowerCase();//recuperer le nom de l'ingredient
          if (itemName===inputValue) {//si le nom de l'ingredient est égal à la valeur de l'input
            const tag = document.createElement("span");
            tag.innerHTML = `<strong>${itemName}</strong>`;
            const closeBtn = document.createElement("i");
            closeBtn.classList.add("fa-regular", "fa-times-circle");
            tag.classList.add("selected");
            tag.style.backgroundColor = tagColor.ingredients;
            tags.appendChild(tag);
            tag.appendChild(closeBtn);
            selectedTags.push(itemName);
          }
        });
      }; return createIngredientTag; 
    }
    
    function createUstensileTagFactory(tagColor) {
      function createUstensileTag(inputValue) {
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
          } 
        });
      };return createUstensileTag;
    }
    
    function createAppareilTagFactory(tagColor) {
      function createAppareilTag(inputValue) {
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
          }
        });
      }; return createAppareilTag;
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
    