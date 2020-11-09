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

const cardsData = [
  {
    question: 'What is JS?',
    answer: 'A programming language',
  },

  {
    question: 'What is PHP?',
    answer: 'A programming language',
  },
];

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

createCards();
