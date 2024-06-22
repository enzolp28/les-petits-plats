function renderRecipes(recipes){
    let html = '';
    recipes.forEach((recipe) => {
        html += `
            <div class="recipe-card">
                <h3>${recipe.name}</h3>
            </div>
        `;
    });

    document.querySelector('#recipes-container').innerHTML = html;

}

export {renderRecipes}