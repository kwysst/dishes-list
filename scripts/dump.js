// for saving data into a .json file
function saveLocalStorageToFile() {
    const data = JSON.stringify(Dishes.list, null, 2);

    try {
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'data.json';
        a.click();
        URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Ошибка сохранения:', error);
        alert('Ошибка при сохранении данных в файл.');
    }
}

// for loading data from a .json file
function loadDishesFromFile() {
    return new Promise((resolve, reject) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.style.display = 'none';
        document.body.appendChild(input);

        input.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    try {
                        const data = JSON.parse(e.target.result);
                        resolve(data);
                    } catch (error) {
                        console.error('Ошибка при парсинге файла:', error);
                        reject('Ошибка при загрузке данных из файла.');
                    }
                };
                reader.readAsText(file);
            } else {
                reject('Файл не выбран.');
            }

            document.body.removeChild(input);
        });

        input.click();
    });
}

// for put data into elements from loaded .json file
function loadDishesFromFileAndAppend() {
    loadDishesFromFile()
        .then(loadedDishes => {
            Dishes.list = loadedDishes;
            Dishes.saveDishes();
            Dishes.loadDishes();
        })
        .catch(error => {
            alert(error);
        });
}