let plantList = []
const url = 'http://localhost:3000/data'

//fetches and displays first plant
fetch(`${url}/1`)
.then(res => res.json())
.then(data => {
    plantList = data;
    displayPlantInfo(plantList)
})

//fetches all plants
fetch (url)
.then(res => res.json())
.then(data => {
    plantList = data;
    loopThroughPlants(plantList)
})

//loops through all plants
function loopThroughPlants(plant){
    console.log(plant);
    plant.forEach(displayPlantNames)
}

//displays plant names in the left div
function displayPlantNames(plant){
    const newPlantName = document.createElement('li');
    const plantNames = document.getElementById('first-section')
    newPlantName.innerHTML = plant.common_name
    newPlantName.classList.add("plant-name")
    plantNames.append(newPlantName)

    newPlantName.addEventListener('click', () => {
        addNewPlant(plant.id)
    })
}

//adds the clicked-on plant to the middle div
function addNewPlant(id){
    fetch(`${url}/${id}`)
    .then(res => res.json())
    .then(data => displayPlantInfo(data))
}

let displayedPlant;

//displays the plant in the middle div
function displayPlantInfo(plant){
    displayedPlant = plant;
    const plantName = document.getElementById('plantname')
    const plantImage = document.getElementById('image')
    const plantCycle = document.getElementById('plantcycle')
    const plantWatering = document.getElementById('plantwatering')
    const plantSunlight = document.getElementById('plantsunlight')

    plantName.textContent = plant.common_name
    plantCycle.textContent = `Cycle: ${plant.cycle}`
    plantWatering.textContent = `Watering: ${plant.watering}`
    plantSunlight.textContent = `Sunlight: ${plant.sunlight}`
    plantImage.src = plant.default_image.original_url
}

const button = document.getElementById('add-plant')
button.style.width = '100px'
button.style.height = '40px'
button.style.borderRadius = '5px'
button.addEventListener('click', () => {
    addPlantToShoppingList(displayedPlant)
})

let plantOnShoppingList = []

//once 'add to list' is clicked, the plant name is added to the right div- NOT WORKING
//if name is clicked, it'll be removed from the right div- ERROR MESSAGE    
function addPlantToShoppingList(plant){
    const list = document.getElementById('shopping-list')
//searches through the array if there is a match
//if true, it'll be the index of the element it finds
//if false, it'll be -1
    let idx = plantOnShoppingList.indexOf(plant)

//need to make sure this condition doesn't include -1
    if (idx > -1) {
        console.log(idx)
        alert("This plant has already been added!")
    } else { 

    plantOnShoppingList.push(plant)
    const plantToBuy = document.createElement('li')
    const plantNumberButton = document.createElement('button')
    plantNumberButton.textContent = 1
    plantNumberButton.style.borderRadius = '3px'
    plantToBuy.innerHTML = plant.common_name
    
    plantNumberButton.style.marginLeft = '10px'

    list.appendChild(plantToBuy)
    plantToBuy.append(plantNumberButton)

//deleting the item from the shopping list and in the array
    plantToBuy.addEventListener('click', (e) => {
            e.target.remove()
            plantOnShoppingList = plantOnShoppingList.filter(p => {
                return p != plant;
            })
    })

    plantNumberButton.addEventListener('click', (e) => {
        e.stopPropagation()
    let currentNumber = parseInt(plantNumberButton.innerHTML, 10);
        if (!isNaN(currentNumber)) {
            plantNumberButton.innerHTML = currentNumber + 1;
            console.log('I was clicked')
            }
        })
    }
    }