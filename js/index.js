// import des fonctions pour pouvoir les utiliser dans ce fichier
import { renderRecipes, renderFilters } from './renders.js';

let appareils = new Set();
let ustensils = new Set();
let ingredients = new Set();
let currentRecipes;
let initialRecipes;
let filtresTags = {
    appareils: [],
    ustensils: [],
    ingredients: []
}

// Récupère les recettes dans le fichier json
async function getRecipes() {
    const response = await fetch('./api/recipes.json');
    console.log(response);
    const recipes = await response.json();
    return recipes
}


const mainSearch = document.querySelector('#main-search');

// Permet de rechercher dans les recettes
mainSearch.addEventListener('input', (e) => {
    const searchValue = e.target.value.toLowerCase().trim();
    console.log(searchValue);

    if (searchValue.length === 0) {
        currentRecipes = initialRecipes;
        renderRecipes(currentRecipes);
        return;
    }

    // tant que la recherche est trop courte on ne fait rien
    if (searchValue.length < 3) {
        return;
    };

    const filteredRecipes = currentRecipes.filter((recipe) => {
        return recipe.name.toLowerCase().includes(searchValue) || recipe.ingredients.some((ingredient) => ingredient.ingredient.toLowerCase().includes(searchValue)) || recipe.description.toLowerCase().includes(searchValue);
    });

    renderRecipes(filteredRecipes);
});

const inputIngredients = document.querySelector('#search-ingredients');

inputIngredients.addEventListener('input', (e) => {
    const searchValue = e.target.value.toLowerCase().trim();
    let filteredIngredients = [];
    if (searchValue.length === 0) {
        filteredIngredients = [...ingredients];

    }
    else {
        filteredIngredients = [...ingredients].filter((ingredient) => {
            return ingredient.toLowerCase().includes(searchValue);
        });
    }
    const ingredientsList = document.querySelector('#ingredients-list');
    ingredientsList.innerHTML = '';
    filteredIngredients.forEach((ingredient) => {
        ingredientsList.innerHTML += `<li>${ingredient}</li>`

    })
});

function handleOpenDropdown() {
    const dropdownHeaders = document.querySelectorAll('.dropdown-header');
    dropdownHeaders.forEach((dropdownHeader) => {
        dropdownHeader.addEventListener('click', e => {
            const dropdownParent = e.target.closest('.dropdown');
            dropdownParent.classList.toggle('show');
        });
    });
}


async function init() {
    initialRecipes = await getRecipes();
    currentRecipes = initialRecipes;
    renderRecipes(currentRecipes);
    renderFilters(currentRecipes, appareils, ustensils, ingredients, filtresTags, initialRecipes);
    handleOpenDropdown();

}

init()