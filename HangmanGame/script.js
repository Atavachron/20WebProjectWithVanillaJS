const $word = document.getElementById('word');
const $wrongLetters = document.getElementById('wrong-letters');
const $popup = document.getElementById('popup-container');
const $playAgainBtn = document.getElementById('play-button');
const $finalMessage = document.getElementById('final-message');
const $notificaton = document.getElementById('notification-container');
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

//Update wrong letters element
function update$wrongLetters() {
  $wrongLetters.innerHTML = `
  ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
  ${wrongLetters.map(letter => `<span>${letter}</span>`).join(', ')}
  `;

  $figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = 'block';
    } else {
      part.style.display = 'none';
    }
  });

  if (wrongLetters.length === $figureParts.length) {
    $finalMessage.innerText = `You lost!`;
    $popup.style.display = 'flex';
  }
}

//Show notification

function showNotification() {
  $notificaton.classList.add('show');

  setTimeout(() => {
    $notificaton.classList.remove('show');
  }, 2000);
}

//Check letter when pressed
window.addEventListener('keydown', e => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;

    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);

        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        update$wrongLetters();
      } else {
        showNotification();
      }
    }
  }
});

//Restart the game

$playAgainBtn.addEventListener('click', () => {
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];

  displayWord();
  update$wrongLetters();
  $popup.style.display = 'none';
});

displayWord();
