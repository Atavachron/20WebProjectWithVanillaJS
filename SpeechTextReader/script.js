//DOM elements variables

const toggleBtn = document.getElementById('toggle');
const main = document.querySelector('main');
const textBox = document.getElementById('text-box');
const closeBtn = document.getElementById('close');
const voicesSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.getElementById('read');

//Array of data object holding the image and the text

const data = [
  {
    image: './img/angry.jpg',
    text: "I'm angry",
  },
  {
    image: './img/drink.jpg',
    text: "I'm thirsty",
  },
  {
    image: './img/food.jpg',
    text: "I'm hungry",
  },
  {
    image: './img/grandma.jpg',
    text: 'I want to see Grandma',
  },
  {
    image: './img/happy.jpg',
    text: "I'm happy",
  },
  {
    image: './img/home.jpg',
    text: 'I want to go home',
  },
  {
    image: './img/hurt.jpg',
    text: "I'm hurt",
  },
  {
    image: './img/outside.jpg',
    text: 'I want to go outside',
  },
  {
    image: './img/sad.jpg',
    text: "I'm sad",
  },
  {
    image: './img/scared.jpg',
    text: "I'm scared",
  },
  {
    image: './img/school.jpg',
    text: 'I want to go to school',
  },
  {
    image: './img/tired.jpg',
    text: "I'm angry",
  },
];

//Run the createBox function for every element of the data array
data.forEach(createBox);

function createBox(item) {
  //use destructuring to access the image and text properties of the item passed as an argument
  const { image, text } = item;

  //Create a div element representing the box
  const box = document.createElement('div');

  //Add a class of box to the new div
  box.classList.add('box');

  //Add html to the div, passing the image and the text from the current item
  box.innerHTML = `
    <img src="${image}" alt="${text}" />
    <p class="info">${text}</p> 
  `;
  main.appendChild(box);
}
