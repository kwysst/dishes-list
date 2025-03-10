elems.addDishButton.addEventListener('click', Dishes.addDish);
elems.toggleViewButton.addEventListener('click', toggleView);
elems.toggleViewButtonIngredients.addEventListener('click', toggleView);
elems.saveBtn.addEventListener('click', saveLocalStorageToFile);
elems.loadBtn.addEventListener('click', loadDishesFromFileAndAppend);
elems.generatePdfButton.addEventListener('click', generatePdf);
Dishes.loadDishes();