let plantList = []
const url = 'https://perenual.com/api/species-list?key=sk-84tn654db175ec8652898'

//displays first plant
fetch('https://perenual.com/api/species/details/1?key=sk-UTOg6552bdc03db892898')
.then(res => res.json())
.then(data => {
    plantList = data;
    displayPlantInfo(plantList)
})

//fetches all plants
fetch ('https://perenual.com/api/species-list?key=sk-UTOg6552bdc03db892898', {"Access-Control-Allow-Origin": "*",})
.then(res => res.json())
.then(data => {
    plantList = data;
    loopThroughPlants(plantList)
})

//loops through all plants
function loopThroughPlants(plant){
    plant.data.forEach(displayPlantNames)
}

//displays plant names in the left div
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

//adds the clicked-on plant to the middle div
function addNewPlant(id){
    fetch(`https://perenual.com/api/species/details/${id}?sk-UTOg6552bdc03db892898`)
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

//once 'add to list' is clicked, the plant name is added to the right div- NOT WORKING
//if name is clicked, it'll be removed from the right div- ERROR MESSAGE    
function addPlantToShoppingList(plant){
    const list = document.getElementById('shopping-list')
    const plantToBuy = document.createElement('li')
    const plantNumberButton = document.getElementById('buymoreplants')
    plantToBuy.innerHTML = plant.common_name

    const listItems = list.getElementsByTagName('li')
    for (let i = 0; i < listItems.length; i++) {
        if (listItems[i].innerHTML === plant.common_name) {
            alert("Plant has already been added to the list!");
            return;
        }
    }
    
    list.append(plantToBuy)
    plantToBuy.append(plantNumberButton)

    list.addEventListener('click', (e) => {
        if (e.target.tagName === 'LI') {
            e.target.parentNode.removeChild(e.target)
        }
    })

    // plantNumberButton.addEventListener('click', (e) => {
    //     if (plantNumberButton.innerHTML >= 1) {
    //         plantNumberButton.innerHTML += 1
    //     }
    // })
}