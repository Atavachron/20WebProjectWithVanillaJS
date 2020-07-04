//Dom Variables

const $addUser = document.getElementById('addUser');
const $doubleMoney = document.getElementById('doubleMoney');
const $showMillionaires = document.getElementById('showMillionaires');
const $sort = document.getElementById('sort');
const $calculateTotal = document.getElementById('calculateTotal');
const $main = document.getElementById('main');

//An Array with the user name and wealth
let data = [];

//Generate three users
getUser();
getUser();
getUser();

//Get a random user from the Random User API and generate wealth

async function getUser() {
  const res = await fetch('https://randomuser.me/api/');
  const data = await res.json();

  const userData = data.results[0];
  const newUser = {
    name: `${userData.name.first} ${userData.name.last}`,
    wealth: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
}

//Add the new user to the data array and updates DOM
function addData(newUser) {
  data.push(newUser);

  updateDOM();
}

function updateDOM(providedData = data) {
  //Clear the main element
  $main.innerHTML = `<h2><strong>Person</strong>Wealth</h2>`;

  providedData.forEach(user => {
    const elem = document.createElement('div');
    elem.classList.add('person');
    elem.innerHTML = `<strong>${user.name}</strong> ${formatAsMoney(
      user.wealth
    )}`;
    $main.appendChild(elem);
  });
}

//Format the number as money

function formatAsMoney(num) {
  return new Intl.NumberFormat('en-EN', {
    style: 'currency',
    currency: 'USD',
  }).format(num);
}

function doubleMoney() {
  data = data.map(user => ({ ...user, wealth: user.wealth * 2 }));

  updateDOM();
}

function sortByRichest() {
  data = data.sort((a, b) => b.wealth - a.wealth);

  updateDOM();
}

function showMillionaires() {
  data = data.filter(user => user.wealth >= 1000000);

  updateDOM();
}

function calculateTotal() {
  const totalWealth = data.reduce((acc, cur) => acc + cur.wealth, 0);

  const wealthElement = document.createElement('div');
  wealthElement.innerHTML = `<h3>Combined Wealth: <strong>${formatAsMoney(
    totalWealth
  )}</strong></h3>`;
  $main.appendChild(wealthElement);
}

//Event Listeners
$addUser.addEventListener('click', getUser);
$doubleMoney.addEventListener('click', doubleMoney);
$sort.addEventListener('click', sortByRichest);
$showMillionaires.addEventListener('click', showMillionaires);
$calculateTotal.addEventListener('click', calculateTotal);
