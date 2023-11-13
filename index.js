const url = 'https://perenual.com/api/species-list?key=sk-84tn654db175ec8652898'
let plantList = []

fetch (url)
.then(res => res.json())
.then(data => {
    plantList = data;
    loopThroughPlants(plantList)
})

function loopThroughPlants(plant){
    for (let key in plant) {
        if (plant.hasOwnProperty(key)) {
            displayPlantNames(plant[key]);
        }
    }
}

function displayPlantNames(plant){
    const newPlantName = document.createElement('li');
    const plantNames = document.getElementById('first-section')
    newPlantName.innerHTML = plant.name
    plantNames.append(newPlantName)

    newPlantName.addEventListener('click', () => {
        addNewPlant(plant.id)
    })
}

function addNewPlant(id){
    fetch(`${url}/${id}`)
    .then(res => res.json())
    .then(data => displayPlantInfo(data))
}

function displayPlantInfo(plant){
    const plantDisplay = document.getElementById('middle-section')
    plantList.innerHTML = `
    <h3>${plant.name}</h3>
    <img src=${plant.img} />
    <p>${plant.description}</p>
    `

    const button = document.querySelector('plant-list')
    button.addEventListener('click', () => {
        //send plant name to list
        //addPlantToShoppingList(plant)
    })
}

function addPlantToShoppingList(plant){
    const list = document.getElementById('shopping-list')
    const plantToBuy = document.createElement('li')
    plantToBuy.innerHTML = plant.name
    list.append(plant)

    plant.addEventListener('click', () => {
        list.parentNode.removeChild(plantToBuy)
    })
}