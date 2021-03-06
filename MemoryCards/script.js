// DOM elements

const $cardsContainer = document.getElementById('cards-container');
const $prevBtn = document.getElementById('prev');
const $nextBtn = document.getElementById('next');
const $currentEl = document.getElementById('current');
const $showBtn = document.getElementById('show');
const $hideBtn = document.getElementById('hide');
const $questionEl = document.getElementById('question');
const $answerEl = document.getElementById('answer');
const $addCardBtn = document.getElementById('add-card');
const $clearBtn = document.getElementById('clear');
const $addContainer = document.getElementById('add-container');

//Create a variable to keep track of the number of the current card
let currentActiveCard = 0;

//Create an array to hold the DOM cards

const cardsEl = [];

//Create an array to store the cards data

const cardsData = getCardsData();

//Function that will loop through the cards data and call a function creating a card for each one
function createCards() {
  cardsData.forEach((data, index) => createCard(data, index));
}

//Function that will create a card and adds it to the cards Element array
function createCard(data, index) {
  const card = document.createElement('div');
  card.classList.add('card');

  if (index === 0) {
    card.classList.add('active');
  }

  card.innerHTML = `
  <div class="inner-card">
    <div class="inner-card-front">
      <p>${data.question}</p>
    </div>

    <div class="inner-card-back">
      <p>${data.answer}</p>
    </div>
  </div>
`;

  //Add an event listener to the card that will add the .show-answer class to flip the card
  card.addEventListener('click', () => {
    card.classList.toggle('show-answer');
  });

  //Add the new card to the cards elements array
  cardsEl.push(card);

  //Append the card to the cards container
  $cardsContainer.appendChild(card);

  //Call the function showing the number of cards in the $currentEl element
  updateCurrentEl();
}

//Show current card and number of cards by calculating the length of the card elements array
function updateCurrentEl() {
  $currentEl.innerText = `${currentActiveCard + 1}/${cardsEl.length}`;
}

//Function to get the items from local storage
function getCardsData() {
  const cards = JSON.parse(localStorage.getItem('cards'));
  return cards === null ? [] : cards;
}

function setCardsData(cards) {
  localStorage.setItem('cards', JSON.stringify(cards));

  //Reload the page
  window.location.reload();
}

createCards();

//Event Listeners
$nextBtn.addEventListener('click', () => {
  cardsEl[currentActiveCard].className = 'card left';

  currentActiveCard = currentActiveCard + 1;

  if (currentActiveCard > cardsEl.length - 1) {
    currentActiveCard = cardsEl.length;
  }

  cardsEl[currentActiveCard].className = 'card active';

  updateCurrentEl();
});

$prevBtn.addEventListener('click', () => {
  cardsEl[currentActiveCard].className = 'card right';

  currentActiveCard = currentActiveCard - 1;

  if (currentActiveCard < 0) {
    currentActiveCard = 0;
  }

  cardsEl[currentActiveCard].className = 'card active';

  updateCurrentEl();
});

$showBtn.addEventListener('click', () => {
  $addContainer.classList.add('show');
});

$hideBtn.addEventListener('click', () => {
  $addContainer.classList.remove('show');
});

$addCardBtn.addEventListener('click', () => {
  const question = $questionEl.value;
  const answer = $answerEl.value;

  if (question.trim() && answer.trim()) {
    const newCard = { question, answer };

    createCard(newCard);

    $questionEl.value = '';
    $answerEl.value = '';

    $addContainer.classList.remove('show');

    cardsData.push(newCard);
    setCardsData(cardsData);
  }
});

$clearBtn.addEventListener('click', () => {
  localStorage.removeItem('cards');
  $cardsContainer.innerHTML = '';
  window.location.reload();
});
