const $search = document.getElementById('search');
const $submit = document.getElementById('submit');
const $random = document.getElementById('random');
const $meals = document.getElementById('meals');
const $resultHeading = document.getElementById('result-heading');
const $singleMeal = document.getElementById('single-meal');

$submit.addEventListener('submit', searchMeal);
$random.addEventListener('click', randomMeal);

async function getMealById(mealID) {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
  );
  const data = await res.json();
  const meal = data.meals[0];
  addMealToDOM(meal);
}

function addMealToDOM(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }
  $singleMeal.innerHTML = `
    <div class="single-meal">
      <h1>${meal.strMeal}</h1>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
      <div class="single-meal-info">
        ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
        ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
      </div>
      <div class="main">
        <p>${meal.strInstructions}</p>
        <h2>Ingredients</h2>
        <ul>
          ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
        </ul>
      </div>
    </div>
  `;
}

async function searchMeal(e) {
  e.preventDefault();

  // Clear the single meal
  $singleMeal.innerHTML = '';

  //Get the user input from the search box
  const userInput = $search.value;

  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${userInput}`
  );
  const data = await res.json();
  console.log(data);

  $resultHeading.innerHTML = `<h2>Search results for "${userInput}"</h2>`;

  if (data.meals === null) {
    //Insert a paragraph into the result heading if null was returned from the API
    $resultHeading.innerHTML = `<p>There are no search results for ${userInput}. Please, try again!</p>`;
  } else {
    //Use map method to insert the data into the meals div
    $meals.innerHTML = data.meals
      .map(
        meal => `<div class="meal">
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
        <div class="meal-info" data-mealID="${meal.idMeal}">
          <h3>${meal.strMeal}</h3>
        </div>
      </div>`
      )
      .join('');
    //Empty the search field
    $search.value = '';
  }
}

$meals.addEventListener('click', e => {
  const mealInfo = e.path.find(item => {
    if (item.classList) {
      return item.classList.contains('meal-info');
    } else {
      return false;
    }
  });

  if (mealInfo) {
    const mealID = mealInfo.getAttribute('data-mealid');
    getMealById(mealID);
  }
});
