const $search = document.getElementById('search');
const $submit = document.getElementById('submit');
const $random = document.getElementById('random');
const $meals = document.getElementById('meals');
const $resultHeading = document.getElementById('result-heading');
const $singleMeal = document.getElementById('single-meal');

$submit.addEventListener('submit', searchMeal);

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
    $resultHeading.innerHTML = `<p>There are no search results for ${userInput}. Please, try again!</p>`;
  } else {
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
    $search.value = '';
  }
}
