//DOM elements

const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const word = document.getElementById('word');
const text = document.getElementById('text');
const endgameEl = document.getElementById('end-game-container');
const timeEl = document.getElementById('time');
const scoreEl = document.getElementById('score');
const difficultySelect = document.getElementById('difficulty');

//List of random words
const words = [
  'nondefiner',
  'pollen',
  'gnosticiser',
  'anaclitic',
  'individual',
  'pastiness',
  'holdership',
  'liner',
  'omuta',
  'yellows',
  'threadless',
  'counselorship',
  'aldington',
  'tertianship',
  'oleaster',
  'slipshod',
  'phrenitis',
  'drawtube',
  'ventless',
  'lacing',
  'intercolonize',
  'esthetics',
  'inappetency',
  'hypoplasty',
  'dogless',
  'strategist',
  'noncondiment',
  'medell',
  'phosphorism',
  'tumefaction',
  'advertised',
  'gapingly',
  'wenceslaus',
  'reappearance',
  'talismanically',
  'foretasting',
  'nonharmony',
  'albumin',
  'kilogauss',
  'chattahoochee',
  'spilt',
  'precongratulated',
  'rehonor',
  'necessitous',
  'palmerworm',
  'underscript',
  'clairton',
  'ruc',
];

//Declare a variable to hold a random word
let randomWord;

//Initialize the score variable
let score = 0;

//Initialize the time
let time = 10;

//Declare a function to get a random word from the list
function getRandomWord() {
  let randomNumber = Math.floor(Math.random() * words.length);
  return words[randomNumber];
}

//Function to add the random word to the DOM
function addWordToDom() {
  //Set the global randomWord variable to the result of running getRandomWord()
  randomWord = getRandomWord();
  //Set the inner text of the word element to the random word
  word.innerText = randomWord;
}

//Function to update the score
function updateScore() {
  //Increment the global score variable
  score++;

  //Udate the text content of the score element
  scoreEl.innerText = score;
}

addWordToDom();

//Event listener on the input element, that will run every time an input is made
text.addEventListener('input', e => {
  const userInput = e.target.value;

  if (userInput === randomWord) {
    //Add a new random word to the DOM
    addWordToDom();

    //Update the score
    updateScore();

    //Clear the input field
    e.target.value = '';
  }
});
