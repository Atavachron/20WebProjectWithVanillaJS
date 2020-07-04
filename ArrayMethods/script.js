//Dom Variables

const $addUser = document.getElementById('addUser');
const $doubleMoney = document.getElementById('doubleMoney');
const $showMillionaires = document.getElementById('showMillionaires');
const $sort = document.getElementById('sort');
const $calculateTotal = document.getElementById('calculateTotal');
const $main = document.getElementById('main');

//An Array with the user name and wealth
const data = [];

$addUser.addEventListener('click', getUser);

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

//Add the new user to the data array
function addData(newUser) {
  data.push(newUser);
}
