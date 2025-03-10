let currentView = 'dishes';

function toggleView() {
    if (currentView === 'dishes') {
        elems.dishListElement.classList.add('hidden');
        elems.addDishButton.classList.add('hidden');
        elems.toggleViewButton.classList.add('hidden');
        elems.toggleViewButtonIngredients.classList.remove('hidden');
        elems.ingredientListDiv.classList.remove('hidden');
        currentView = 'ingredients';
    } else {
        elems.dishListElement.classList.remove('hidden');
        elems.addDishButton.classList.remove('hidden');
        elems.toggleViewButton.classList.remove('hidden');
        elems.toggleViewButtonIngredients.classList.add('hidden');
        elems.ingredientListDiv.classList.add('hidden');
        currentView = 'dishes';
    }
    // saveDishes();
}