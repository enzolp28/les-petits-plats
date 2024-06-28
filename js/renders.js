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
                                <p>${ingredient.quantity} ${ingredient.unit ? ingredient.unit : ''} </p>
                            </div>`)}
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    document.querySelector('.container-card').innerHTML = html;

    document.querySelector('#compteur-recipes').innerText = `${recipes.length} recettes`;

}

function renderFilters(currentRecipes){
    const appareilsList = document.querySelector('#appareils-list');
    const ustensilsList = document.querySelector('#ustensiles-list');
    const ingredientsList = document.querySelector('#ingredients-list');

    let appareils = new Set();
    let ustensils = new Set();
    let ingredients = new Set();

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
        appareilsList.innerHTML += `<li>${appareil}</li>`
    })
    
    ustensilsList.innerHTML = '';
    ustensils.forEach((ustensil) => {
        ustensilsList.innerHTML += `<li>${ustensil}</li>`
    })

    ingredientsList.innerHTML = '';
    ingredients.forEach((ingredient) => {
        ingredientsList.innerHTML += `<li>${ingredient}</li>`
    })


}

export {renderRecipes, renderFilters}