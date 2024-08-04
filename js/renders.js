
//Permet d'afficher les recettes
function displayRecettes(recettes) {
    let html = '';
    recettes.forEach((recette) => {
        const { image, name, ingredients, time, description } = recette;
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
                                ${ingredient.quantity ? `<p>${ingredient.quantity} ${ingredient.unit ? ingredient.unit : ""} </p>` : ''}
                                
                            </div>`
        ).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    document.querySelector('#compteur-recipes').innerText = `${recettes.length} recettes`;
    document.querySelector('.container-card').innerHTML = html;
}

let filtresTags = {
    searchValue: '',
    tagAppareils: [],
    tagUstensils: [],
    tagIngredients: []
}

const appareilsList = document.querySelector('#appareils-list');
const ustensilsList = document.querySelector('#ustensiles-list');
const ingredientsList = document.querySelector('#ingredients-list');

function displayFiltres(recettesActuelles) {
    let appareils = new Set();
    let ustensils = new Set();
    let ingredients = new Set();

    recettesActuelles.forEach((recette) => {
        appareils.add(recette.appliance);

        recette.ustensils.forEach((ustensil) => {
            ustensils.add(ustensil);
        })

        recette.ingredients.forEach((ingredient) => {
            ingredients.add(ingredient.ingredient);

        })
    })

    return {
        appareils: Array.from(appareils),
        ustensils: Array.from(ustensils),
        ingredients: Array.from(ingredients)
    };
}

function createListFiltres(list, filtres, className) {
    list.innerHTML = '';
    filtres.forEach(filtre => {
        list.innerHTML += `<li class="${className}">${filtre}</li>`;
    });
}

function addTagEventListener(liSelector, tagSelector, filterType, recettes) {
    const tagElement = document.querySelector(tagSelector);
    const liFiltres = document.querySelectorAll(liSelector);
    const arrowsIcon = document.querySelectorAll('.arrow');

    liFiltres.forEach(li => {
        li.addEventListener('click', () => {
            const text = li.innerText;
            console.log(text);
            if (!filtresTags[filterType].includes(text)) {
                filtresTags[filterType].push(text.toLowerCase());

                const tag = document.createElement('div');
                tag.classList.add('tag');
                tag.setAttribute('data-type', filterType);
                tag.setAttribute('data-content', text);

                const span = document.createElement('span');
                span.innerText = text;
                tag.appendChild(span);

                const button = document.createElement('button');
                button.classList.add('deleteTag');
                button.innerText = 'X';

                button.addEventListener('click', deleteTag);
                tag.appendChild(button);
                tagElement.appendChild(tag);
                
                li.closest('.dropdown').classList.remove('show');

                arrowsIcon.forEach(arrow => {
                    arrow.classList.remove('rotate-180');
                })
            }
        });
    });
}

function applyFiltres(filtresTags, recettes) {
    const { tagAppareils, tagUstensils, tagIngredients, searchValue } = filtresTags;

    const recettesFiltrées = [...recettes].filter((recette) => {
        const ingredientsInRecette = recette.ingredients.map((ingredient) => ingredient.ingredient.toLowerCase());
        const appareilsInRecette = recette.appliance.toLowerCase();
        const ustensilsInRecette = recette.ustensils.map((ustensil) => ustensil.toLowerCase());
        return (
            recette.name.toLowerCase().includes(searchValue) &&
            (tagAppareils.length === 0 || tagAppareils.every((appareils) => appareils.includes(appareilsInRecette))) &&
            (tagUstensils.length === 0 || tagUstensils.every((ustensil) => ustensilsInRecette.includes(ustensil))) &&
            (tagIngredients.length === 0 || tagIngredients.every((ingredient) => ingredientsInRecette.includes(ingredient)))
        );
    });

    return recettesFiltrées;
}

function deleteTag(e) {
    const parentTag = e.target.parentElement;
    parentTag.remove();

    const tagType = parentTag.getAttribute('data-type');
    console.log(tagType);
    const tagValue = parentTag.getAttribute('data-content').toLowerCase();
    filtresTags[tagType] = filtresTags[tagType].filter(tag => tag !== tagValue);

}


function displayLists(ingredients, appareils, ustensils) {

    createListFiltres(appareilsList, appareils, 'tag-appareil');
    createListFiltres(ustensilsList, ustensils, 'tag-ustensil');
    createListFiltres(ingredientsList, ingredients, 'tag-ingredient');

    addTagEventListener('.tag-ingredient', '#tag-ingredients', 'tagIngredients');
    addTagEventListener('.tag-appareil', '#tag-appareils', 'tagAppareils');
    addTagEventListener('.tag-ustensil', '#tag-ustensiles', 'tagUstensils');

}



// export les fonctions 
export { displayRecettes, displayFiltres, displayLists, applyFiltres };
