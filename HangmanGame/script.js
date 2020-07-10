const $word = document.getElementById('word');
const $wrongLetters = document.getElementById('wrong-letters');
const $popup = document.getElementById('popup-container');
const $playAgainBtn = document.getElementById('play-button');
const $finalMessage = document.getElementById('final-message');
const $notificaton = document.getElementById('notification');
const $figureParts = document.querySelectorAll('.figure-part');

const words = ['abracadabra', 'university', 'dictionary', 'bread'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

function displayWord() {
  $word.innerHTML = `${selectedWord
    .split('')
    .map(
      letter => `
      <span class="letter">${
        correctLetters.includes(letter) ? letter : ''
      }</span>
    `
    )
    .join('')}`;

  let innerWord = $word.innerText.replace(/\n/g, '');

  if (innerWord === selectedWord) {
    $finalMessage.innerText = 'Congratulations! You won.';
    $popup.style.display = 'flex';
  }
}

displayWord();
