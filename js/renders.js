function renderRecipes(recipes) {
    let html = '';
    recipes.forEach((recipe) => {
        const { image, name, ingredients, time, description } = recipe;
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

    document.querySelector('#compteur-recipes').innerText = `${recipes.length} recettes`;
    document.querySelector('.container-card').innerHTML = html;
}

function renderApp(currentRecipes, filtresTags, initialRecipes) {
    renderRecipes(currentRecipes);
    renderFilters(currentRecipes, filtresTags, initialRecipes);
}

function renderFilters(currentRecipes, filtresTags, initialRecipes) {
    let appareils = new Set();
    let ustensils = new Set();
    let ingredients = new Set();
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

    renderLists(ingredients, appareils, ustensils);


    function renderLists(ingredients, appareils, ustensils) {

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
                    filtresTags.ingredients.push(text.toLowerCase());
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
                    currentRecipes = applyFilters(filtresTags, initialRecipes);
                    console.log(currentRecipes);
                    //renderRecipes(currentRecipes);
                    element.closest('.dropdown').classList.remove('show');
                    renderApp(currentRecipes, filtresTags, initialRecipes);
                }
            })
        });

        const liAppareils = document.querySelectorAll('.tag-appareil');
        const tagAppareils = document.querySelector('#tag-appareils');
        liAppareils.forEach(element => {
            element.addEventListener('click', () => {
                const text = element.innerText;
                if (!filtresTags.appliance.includes(text)) {
                    filtresTags.appliance.push(text.toLowerCase());
                    const tag = document.createElement('div');
                    tag.classList.add('tag');
                    tag.setAttribute('data-type', 'appliance');
                    tag.setAttribute('data-content', text);
                    const span = document.createElement('span');
                    span.innerText = text;
                    tag.appendChild(span);
                    const button = document.createElement('button');
                    button.classList.add('deleteTag');
                    button.innerText = 'X';
                    button.addEventListener('click', deleteTag);
                    tag.appendChild(button);
                    tagAppareils.appendChild(tag);
                    currentRecipes = applyFilters(filtresTags, initialRecipes);
                    //renderRecipes(currentRecipes);
                    element.closest('.dropdown').classList.remove('show');
                    renderApp(currentRecipes, filtresTags, initialRecipes);
                }
            })
        });


        const liUstensils = document.querySelectorAll('.tag-ustensil');
        const tagUstensils = document.querySelector('#tag-ustensiles');

        liUstensils.forEach(element => {
            element.addEventListener('click', () => {
                const text = element.innerText;
                if (!filtresTags.ustensils.includes(text)) {
                    filtresTags.ustensils.push(text.toLowerCase());
                    const tag = document.createElement('div');
                    tag.classList.add('tag');
                    tag.setAttribute('data-type', 'ustensils');
                    tag.setAttribute('data-content', text);
                    const span = document.createElement('span');
                    span.innerText = text;
                    tag.appendChild(span);
                    const button = document.createElement('button');
                    button.classList.add('deleteTag');
                    button.innerText = 'X';
                    button.addEventListener('click', deleteTag);
                    tag.appendChild(button);
                    tagUstensils.appendChild(tag);
                    currentRecipes = applyFilters(filtresTags, initialRecipes);
                    //renderRecipes(currentRecipes);
                    element.closest('.dropdown').classList.remove('show');
                    renderApp(currentRecipes, filtresTags, initialRecipes);
                }
            })


            
            const deleteInput = document.querySelectorAll('#delete-search');

            deleteInput.forEach(element => {
                element.addEventListener('click', () => {
                    inputIngredients.value = '';
                    renderFilters(currentRecipes, filtresTags, initialRecipes);
                    console.log("zzzz");
                })
            })

            // deleteInput.addEventListener('click', () => {
            //     inputIngredients.value = '';

            //     renderFilters(currentRecipes, filtresTags, initialRecipes);
            //     console.log("zzzz");

            // })



            const inputAppareils = document.querySelector('#search-appareils');
            inputAppareils.addEventListener('input', (e) => {
                const searchValue = e.target.value.toLowerCase().trim();
                let filteredAppareils = [];
                if (searchValue.length === 0) {
                    filteredAppareils = [...appareils];
                }
                else {
                    filteredAppareils = [...appareils].filter((appareil) => {
                        return appareil.toLowerCase().includes(searchValue);
                    });
                }
                const appareilsList = document.querySelector('#appareils-list');
                appareilsList.innerHTML = '';
                filteredAppareils.forEach((appareil) => {
                    appareilsList.innerHTML += `<li>${appareil}</li>`
                })
            });

            const inputUstensiles = document.querySelector('#search-ustensiles');
            inputUstensiles.addEventListener('input', (e) => {
                const searchValue = e.target.value.toLowerCase().trim();
                let filteredUstensiles = [];
                if (searchValue.length === 0) {
                    filteredUstensiles = [...ustensils];
                }
                else {
                    filteredUstensiles = [...ustensils].filter((ustensile) => {
                        return ustensile.toLowerCase().includes(searchValue);
                    });
                }
                const ustensilesList = document.querySelector('#ustensiles-list');
                ustensilesList.innerHTML = '';
                filteredUstensiles.forEach((ustensile) => {
                    ustensilesList.innerHTML += `<li>${ustensile}</li>`
                })
            });
        });

        const inputIngredients = document.querySelector('#search-ingredients');

        inputIngredients.addEventListener('input', (e) => {
            const searchValue = e.target.value.toLowerCase().trim();
            console.log("searchValue", searchValue);
            let filteredIngredients = [];
            if (searchValue.length === 0) {
                filteredIngredients = [...ingredients];
            }
            else {
                filteredIngredients = [...ingredients].filter((ingredient) => ingredient.toLowerCase().includes(searchValue));
            }
            // const ingredientsList = document.querySelector('#ingredients-list');
            // ingredientsList.innerHTML = '';
            // filteredIngredients.forEach((ingredient) => {
            //     ingredientsList.innerHTML += `<li>${ingredient}</li>`

            // })
            try {
                const filteredIngredientsSet = new Set(filteredIngredients);
                renderLists(filteredIngredientsSet, appareils, ustensils);
            } catch (error) {
                console.log(error);
            }
            
        });
    }

    function deleteTag(e) {

        const tagParent = e.target.parentElement;
        tagParent.remove();
        const type = tagParent.getAttribute('data-type');
        const tagValue = tagParent.getAttribute('data-content').toLowerCase();
        filtresTags[type] = filtresTags[type].filter(tag => tag !== tagValue);
        console.log(tagParent.getAttribute('data-content'));
        currentRecipes = applyFilters(filtresTags, initialRecipes);
        // renderRecipes(currentRecipes);
        renderApp(currentRecipes, filtresTags, initialRecipes);
    }
}

function applyFilters(filtresTags, initialRecipes) {
    const { ingredients, appliance, ustensils } = filtresTags;
    console.log(ingredients);
    const filtredRecipes = [...initialRecipes].filter(recipe => {
        const applianceInRecipe = recipe.appliance.toLowerCase();
        const ustensilsInRecipe = recipe.ustensils.map(ustensil => ustensil.toLowerCase());
        const ingredientsInRecipe = recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase());

        // let resultSearch = search(recipe, filtres.searchValue);

        let resultAppliance = false;
        if (appliance.length === 0) {
            resultAppliance = true;
        } else {
            //resultAppliance = appliance.includes(applianceInRecipe);
            resultAppliance = filtresTags.appliance.every(appliance => applianceInRecipe.includes(appliance.toLowerCase()));
        }

        let resultUstensils = false;
        if (ustensils.length === 0) {
            resultUstensils = true;
        } else {
            //resultUstensils = ustensilsInRecipe.some(ustensil => ustensils.includes(ustensil.toLowerCase()));
            resultUstensils = filtresTags.ustensils.every(ustensil => ustensilsInRecipe.includes(ustensil.toLowerCase()));
        }

        let resultIngredients = false;
        if (ingredients.length === 0) {
            resultIngredients = true;
        } else {
            //resultIngredients = ingredientsInRecipe.some(ingredient => ingredients.includes(ingredient));
            resultIngredients = filtresTags.ingredients.every(ingredient => ingredientsInRecipe.includes(ingredient.toLowerCase()));
        }


        return resultAppliance && resultUstensils && resultIngredients;
    });
    return filtredRecipes
}

// export les fonctions 
export { renderRecipes, renderFilters }