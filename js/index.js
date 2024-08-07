// import des fonctions pour pouvoir les utiliser dans ce fichier
import { renderRecipes, renderFilters, applyFilters } from './renders.js';


let currentRecipes;
let initialRecipes;
console.log(currentRecipes);
console.log(initialRecipes);

let filtresTags = {
    searchValue: '',
    ingredients: [],
    appliance: [],
    ustensils: []
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


    if (searchValue.length === 0) {
        //currentRecipes = initialRecipes;
        filtresTags.searchValue = "";
        console.log('aaaaa');
        currentRecipes = applyFilters(filtresTags, initialRecipes);
        renderRecipes(currentRecipes);
        return;
    }


    // tant que la recherche est trop courte on ne fait rien
    if (searchValue.length < 3) {
        return;
    };
    filtresTags.searchValue = searchValue;
    const filtredRecipies = applyFilters(filtresTags, initialRecipes);
    renderRecipes(filtredRecipies);
    // const filteredRecipes = currentRecipes.filter((recipe) => {
    //     return recipe.name.toLowerCase().includes(searchValue) || recipe.ingredients.some((ingredient) => ingredient.ingredient.toLowerCase().includes(searchValue)) || recipe.description.toLowerCase().includes(searchValue);
    // });


    // si aucune recette ne correspond à la recherche afficher
    if (filtredRecipies.length === 0) {
        console.log('aucune recette ne correspond à la recherche');
        let html = `<p class="no-result">Aucune recette ne correspond à ${searchValue}</p>`;
        document.querySelector('.container-card').innerHTML = html;
        return;
    }
    renderRecipes(filtredRecipies);
    console.log('+++++++++++++++++++++++++++++++++++++++++++++++');
    currentRecipes = renderFilters(filteredRecipes, filtresTags, initialRecipes);
    console.log('currentRecipes', currentRecipes);
});

// const inputIngredients = document.querySelector('#search-ingredients');

// inputIngredients.addEventListener('input', (e) => {
//     const searchValue = e.target.value.toLowerCase().trim();
//     let filteredIngredients = [];
//     if (searchValue.length === 0) {
//         filteredIngredients = [...ingredients];
//     }
//     else {
//         filteredIngredients = [...ingredients].filter((ingredient) => {
//             return ingredient.toLowerCase().includes(searchValue);
//         });
//     }
//     const ingredientsList = document.querySelector('#ingredients-list');
//     ingredientsList.innerHTML = '';
//     filteredIngredients.forEach((ingredient) => {
//         ingredientsList.innerHTML += `<li>${ingredient}</li>`

//     })
// });

function handleOpenDropdown() {
    const arrowMenu = document.querySelectorAll('.arrow');
    const dropdownHeaders = document.querySelectorAll('.dropdown-header');
    dropdownHeaders.forEach((dropdownHeader, index) => {
        dropdownHeader.addEventListener('click', e => {
            const dropdownParent = e.target.closest('.dropdown');
            dropdownParent.classList.toggle('show');
            arrowMenu[index].classList.toggle('rotate-180');
            console.log(index);

        });
    });
}


async function init() {
    initialRecipes = await getRecipes();
    currentRecipes = initialRecipes;
    renderRecipes(currentRecipes);
    renderFilters(currentRecipes, filtresTags, initialRecipes);
    handleOpenDropdown();

}

init()