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
    const hiddenButton = document.querySelector('.hidden')

    plantName.textContent = plant.common_name
    plantCycle.textContent = `Cycle: ${plant.cycle}`
    plantWatering.textContent = `Watering: ${plant.watering}`
    plantSunlight.textContent = `Sunlight: ${plant.sunlight}`
    plantImage.src = plant.default_image.original_url

    // const button = document.getElementById('add-plant')
    // button.addEventListener('click', () => {
    //     addPlantToShoppingList(plant)
    //     button.classList.remove('hidden')
    // })
}

const button = document.getElementById('add-plant')
button.addEventListener('click', () => {
    addPlantToShoppingList(displayedPlant)
    button.classList.remove('hidden')
})

//once 'add to list' is clicked, the plant name is added to the right div- NOT WORKING
//if name is clicked, it'll be removed from the right div- ERROR MESSAGE    
function addPlantToShoppingList(plant){
    const list = document.getElementById('shopping-list')
    const plantToBuy = document.createElement('li')
    const plantNumberButton = document.createElement('button')
    plantNumberButton.textContent = 1
    plantToBuy.innerHTML = plant.common_name

    const listItems = list.getElementsByTagName('li')
    for (let i = 0; i < listItems.length; i++) {
        if (listItems[i].innerHTML === plant.common_name) {
            alert("Plant has already been added to the list!");
            return;
        }
    }

    //tried changing to appendChild- will see if this works
    list.appendChild(plantToBuy)
    plantToBuy.append(plantNumberButton)

    plantToBuy.addEventListener('click', (e) => {
            e.target.remove()
    })

    plantNumberButton.addEventListener('click', (e) => {
    let currentNumber = parseInt(plantNumberButton.innerHTML, 10);
        if (!isNaN(currentNumber)) {
            plantNumberButton.innerHTML = currentNumber + 1;
            console.log('I was clicked')
            }
        })
    }