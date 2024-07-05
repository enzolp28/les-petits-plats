function renderRecipes(recipes){
    let html = '';
    recipes.forEach((recipe) => {
        const {image, name, ingredients, time, description} = recipe;
        html += `
            <div class="card">
                <div class="card-img">
                    <img src="./img/recipes/${image}" alt="${name}">
                    <span>${time}min</span>
                </div>
                <div class="card-content">
                    <h3>${name}</h3>
                    <div class="card-content_recette">
                        <h4>RECETTE</h4>
                        <p>${description}.</p>
                    </div>
                    <div class="card-content_ingredient">
                        <h4>INGRÉDIENTS</h4>
                        <div class="card-ingredient">
                            ${ingredients.map((ingredient) => `<div class="card-ingredient_list">
                                <p>${ingredient.ingredient}</p>
                                <p>${ingredient.quantity} ${ingredient.unit ? ingredient.unit : ""} </p>
                            </div>`
                            ).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    document.querySelector('#compteur-recipes').innerText = `${recipes.length} recettes`;
    document.querySelector('.container-card').innerHTML = html;
}

function renderFilters(currentRecipes, appareils, ustensils, ingredients, filtresTags, initialRecipes) {
    const appareilsList = document.querySelector('#appareils-list');
    const ustensilsList = document.querySelector('#ustensiles-list');
    const ingredientsList = document.querySelector('#ingredients-list');

    // Add avec Set permet de ne pas dupliquer les appareils dans la liste
    currentRecipes.forEach((recipe) => {
        appareils.add(recipe.appliance);
        recipe.ustensils.forEach((ustensil) => {
            ustensils.add(ustensil);
        })
        recipe.ingredients.forEach((ingredient) => {
            ingredients.add(ingredient.ingredient);
        })
        // ustensils.add(...recipe.ustensils);
        //appareilsList.innerHTML += `<li>${recipe.appliance}</li>`
    })
    appareilsList.innerHTML = '';
    appareils.forEach((appareil) => {
        appareilsList.innerHTML += `<li class="tag-appareil">${appareil}</li>`

    })
    
    ustensilsList.innerHTML = '';
    ustensils.forEach((ustensil) => {
        ustensilsList.innerHTML += `<li class="tag-ustensil">${ustensil}</li>`
    })

    ingredientsList.innerHTML = '';
    ingredients.forEach((ingredient) => {
        ingredientsList.innerHTML += `<li class="tag-ingredient">${ingredient}</li>`
    })

    const tagIngredients = document.querySelector('#tag-ingredients');

    const liIngredients = document.querySelectorAll('.tag-ingredient');

    liIngredients.forEach(element => {

        element.addEventListener('click', () => {
            const text = element.innerText;
            if (!filtresTags.ingredients.includes(text)) {
                filtresTags.ingredients.push(text);
                const tag = document.createElement('div');
                tag.classList.add('tag');
                tag.setAttribute('data-type', 'ingredients');
                tag.setAttribute('data-content', text);
                const span = document.createElement('span');
                span.innerText = text;
                tag.appendChild(span);
                const button = document.createElement('button');
                button.classList.add('deleteTag');
                button.innerText = 'X';
                button.addEventListener('click', deleteTag);
                tag.appendChild(button);
                tagIngredients.appendChild(tag);
                applyFilters(currentRecipes, filtresTags, initialRecipes);
                console.log(currentRecipes);
                renderRecipes(currentRecipes);
                element.closest('.dropdown').classList.remove('show');
            }
        })
    });
    function deleteTag(e) {
    
        const tagParent = e.target.parentElement;
        tagParent.remove();
        const type = tagParent.getAttribute('data-type');
        filtresTags[type] = filtresTags[type].filter(tag => tag !== tagParent.getAttribute('data-content'));
        applyFilters(currentRecipes, filtresTags, initialRecipes);
        renderRecipes(currentRecipes);
    }
}

function applyFilters(currentRecipes, filtresTags, initialRecipes) {
    console.log(filtresTags);
    currentRecipes = initialRecipes;
    currentRecipes = currentRecipes.filter(recipe => {
        const filtreIngretients = filtresTags.ingredients

        const filtreAppareils = filtresTags.appareils
        const filtreUstensils = filtresTags.ustensils
        const appareilsExistants = filtreAppareils.some(appareil => recipe.appliance === appareil);
        const ustensilsExistants = filtreUstensils.some(ustensil => recipe.ustensils.includes(ustensil));
        const ingredientsExistants = filtreIngretients.some(ingredient => recipe.ingredients.some(ing => ing.ingredient === ingredient));
        console.log(appareilsExistants, ustensilsExistants, ingredientsExistants);
        return appareilsExistants || ustensilsExistants || ingredientsExistants
    })
}

// export les fonctions 
export {renderRecipes, renderFilters}