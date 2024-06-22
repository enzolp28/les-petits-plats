import {renderRecipes} from './renders.js';

async function getRecipes(){
    const response = await fetch('./api/recipes.json');
    const recipes = await response.json();
    return recipes
}


const mainSearch = document.querySelector('#main-search');
mainSearch.addEventListener('input', (e) => {
    const searchValue = e.target.value.toLowerCase().trim();

    if (searchValue.length === 0) {
        currentRecipes = initialRecipes;
        renderRecipes(currentRecipes);
        return;
    }

    // tant que la recherche est trop courte on ne fait rien
    if(searchValue.length < 3){
        return;
    }; 

    const filteredRecipes = currentRecipes.filter((recipe) => {
        return recipe.name.toLowerCase().includes(searchValue);
    });

    renderRecipes(filteredRecipes);
});


let currentRecipes;
let initialRecipes;

async function init(){
    initialRecipes = await getRecipes();
    currentRecipes = initialRecipes;
    renderRecipes(currentRecipes);

}

init()