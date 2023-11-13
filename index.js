let plantList = []
const url = 'https://perenual.com/api/species-list?key=sk-84tn654db175ec8652898'

//display first plant
fetch('https://perenual.com/api/species/details/1?key=sk-84tn654db175ec8652898')
.then(res => res.json())
.then(data => {
    console.log(data)
    plantList = data;
    displayPlantInfo(plantList)
})

//fetch all plants
fetch ('https://perenual.com/api/species-list?key=sk-84tn654db175ec8652898', {"Access-Control-Allow-Origin": "*",})
.then(res => res.json())
.then(data => {
    console.log(data)
    plantList = data;
    loopThroughPlants(plantList)
})

//loops through all plants
function loopThroughPlants(plant){
    plant.data.forEach(displayPlantNames)
}

//displays plant names in the nav bar
function displayPlantNames(plant){
    const newPlantName = document.createElement('li');
    const plantNames = document.getElementById('first-section')
    newPlantName.innerHTML = plant.common_name
    newPlantName.classList.add("plant-name")
    plantNames.append(newPlantName)

    newPlantName.addEventListener('click', () => {
        console.log(plant)
        addNewPlant(plant.id)
    })
}

//adds the clicked on plant to the middle div
function addNewPlant(id){
    fetch(`https://perenual.com/api/species/details/${id}?key=sk-84tn654db175ec8652898`)
    .then(res => res.json())
    .then(data => displayPlantInfo(data))
}

//displays the plant in the middle div
function displayPlantInfo(plant){
    const plantName = document.getElementById('plantname')
    const plantDescription = document.getElementById('plantdescription')
    const plantImage = document.getElementById('poster')
    const plantCycle = document.getElementById('plantcycle')
    const plantWatering = document.getElementById('plantwatering')
    const plantSunlight = document.getElementById('plantsunlight')
    plantName.textContent = plant.common_name
    plantCycle.textContent = `Cycle: ${plant.cycle}`
    plantWatering.textContent = `Watering: ${plant.watering}`
    plantSunlight.textContent = `Sunlight: ${plant.sunlight}`
    plantImage.src = plant.default_image.original_url

    const button = document.getElementById('add-plant')
    button.addEventListener('click', () => {
        addPlantToShoppingList(plant)
    })
}

//once 'add to list' is clicked, the plant name is added to the shopping list- NOT WORKING
//if name is clicked, it'll be removed from the shopping list- ERROR MESSAGE    
function addPlantToShoppingList(plant){
    const list = document.getElementById('shopping-list')
    const plantToBuy = document.createElement('li')
    plantToBuy.innerHTML = plant.common_name
    list.append(plantToBuy)

    list.addEventListener('click', (e) => {
        if (e.target.tagName === 'LI') {
            e.target.parentNode.removeChild(e.target)
        }
    })
}