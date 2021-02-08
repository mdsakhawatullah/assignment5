// getting search value
const mealItems = () => {
    document.getElementById('heading').style.display = "block";
    document.getElementById('errorBtn').style.display = "none";
    document.getElementById('foodCard').innerHTML = ``;
    document.getElementById('foodDetails').style.display = "none";
    const input = document.getElementById('mealSearch').value
    const inputLength = input.length
    if (inputLength == 1) {
        firstLetter(input)
    }
    else {
        foodNames(input)
    }
}


const firstLetter = (letter) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
        .then(response => response.json())
        .then(data => foodItemsShow(data))
        .catch((e) => {
        document.getElementById('errorBtn').style.display = "block"
    })
}


const foodNames= (foodName) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`)
        .then(response => response.json())
        .then(data => foodItemsShow(data))
        .catch((e) => {
        document.getElementById('errorBtn').style.display = "block"
    })
}


const foodItemsShow = (mealItem) => {
    const items = mealItem.meals
    items.forEach(meal => {
        const foodContainer = document.getElementById('foodQuantity');
        const foodDiv = document.getElementById('foodCard');
        const foodName = meal.strMeal;
        const foodId = meal.idMeal;
        const mealThumb = meal.strMealThumb;
        const foodDetails = `
        <div class="col">
        <div class="card">
            <div>
                <img src="${mealThumb}" class="card-img-top" alt="${foodId}">
                <div class="card-body">
                    <h5 class="card-title">${foodName}</h5>
                    <h6><button class="recipeBtn" onclick="itemDetails(${foodId})" type="submit">Ingredients</button>
                </div>
            </div>
            </div>
        </div>
        `
        foodDiv.innerHTML += foodDetails
        foodContainer.appendChild(foodDiv)
    
    });
}


const itemDetails = (foodId) => {
    const itemsContainer = document.getElementById('foodDetails')
    itemsContainer.style.display = "block"
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodId}`)
    .then(res => res.json())
    .then(data => {
        const items = data.meals[0];
        const insertedItem =`
        <img id="imageBorder" src="${items.strMealThumb}" alt="">
        <h2>${items.strMeal}</h2>
        <h4 class="mealdetails>Ingredients</h4>
        <div class="mealdetails" id="ingredientList">
        </div>
        `
        itemsContainer.innerHTML = insertedItem
        const ingredientList = document.getElementById('ingredientList')
        const itemLists = `
            <h6>${items.strIngredient1}</h6>
            <h6>${items.strIngredient2}</h6>
            <h6>${items.strIngredient3}</h6>
            <h6>${items.strIngredient4}</h6>
            <h6>${items.strIngredient5}</h6>
            <h6>${items.strIngredient6}</h6>
            <h6>${items.strIngredient7}</h6>
            <h6>${items.strIngredient8}</h6>
            <h6>${items.strIngredient9}</h6>
            <h6>${items.strIngredient10}</h6>
            
        `
        ingredientList.innerHTML = itemLists;
    })
} 