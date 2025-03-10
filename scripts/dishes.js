const Dishes = {
    STORAGE_KEY: 'dishes'
    , list: []
    , saveDishes: function() { localStorage.setItem(Dishes.STORAGE_KEY, JSON.stringify(Dishes.list)); }
    , loadDishes: function() { 
        Dishes.list = JSON.parse(localStorage.getItem(Dishes.STORAGE_KEY) || '[]')
        Dishes.updateDishList();
        Dishes.updateIngredientList();
    }
    , addDish: function () {
        Dishes.list.unshift({ name: '', ingredients: '' });
        Dishes.updateDishList();
        Dishes.updateIngredientList();
        Dishes.saveDishes();
    }
    , deleteDish: function (index) {
        Dishes.list.splice(index, 1);
        Dishes.updateDishList();
        Dishes.updateIngredientList();
        Dishes.saveDishes();
    }
    , updateDishList: function () {
        elems.dishListElement.innerHTML = '';
        for (let i = 0; i < Dishes.list.length; i++) {
            const dish = Dishes.list[i];
            const listItem = document.createElement('li');
    
            const nameInput = document.createElement('input');
            nameInput.type = 'text';
            nameInput.value = dish.name;
            nameInput.placeholder = "Название блюда";
    
            const ingredientsInput = document.createElement('textarea');
            ingredientsInput.rows = dish.ingredients.split("\n").length;
            ingredientsInput.value = dish.ingredients;
            ingredientsInput.placeholder = "Ингредиенты (картофель 3, 1.5 литра воды, майонез, ...)";
    
            nameInput.addEventListener('input', () => Dishes.saveEditedDish(i, nameInput.value, ingredientsInput.value));
            ingredientsInput.addEventListener('input', () => Dishes.saveEditedDish(i, nameInput.value, ingredientsInput.value));
            ingredientsInput.addEventListener('input', () => ingredientsInput.rows = ingredientsInput.value.split("\n").length);
    
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Удалить';
            deleteButton.onclick = () => {
                if (confirm('Точно?????')) 
                    Dishes.deleteDish(i)
            };
    
            listItem.appendChild(nameInput);
            listItem.appendChild(ingredientsInput);
            listItem.appendChild(deleteButton);
    
            elems.dishListElement.appendChild(listItem);
        }
    }
    , updateIngredientList: function () {
        const ingredientsMap = new Map();
    
        Dishes.list.forEach(dish => {
            if (dish.ingredients) {
                const ingredients = dish.ingredients
                    .split(/[,;]+/)
                    .map(ingredient => ingredient.trim());
    
                ingredients.forEach(item => {
                    // const parts = item.split(':').map(part => part.trim());
                    const ingredientName = item.replace(/[0-9.]+/g, '').trim();
                    const quantity = parseFloat(item.replace(/[^0-9.]+/g, ''));
                        if (ingredientsMap.has(ingredientName))
                            ingredientsMap.set(ingredientName, ingredientsMap.get(ingredientName) + (!isNaN(quantity) ? quantity : 1));
                        else
                            ingredientsMap.set(ingredientName, !isNaN(quantity) ? quantity : 1);
                })
            }
    
        })
        elems.ingredientListElement.innerHTML = "";
        Array.from(ingredientsMap).sort((a,b) => a[0] < b[0] ? -1 : 1).map((e) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${e[0]}: ${e[1]}`;
            elems.ingredientListElement.appendChild(listItem);
        })
    
    }
    , saveEditedDish: function (index, newName, newIngredients) {
        Dishes.list[index].name = newName;
        Dishes.list[index].ingredients = newIngredients;
        Dishes.updateIngredientList()
        Dishes.saveDishes();
    }
}