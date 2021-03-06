//DOM variables

const balance = document.querySelector('#balance');
const moneyPlus = document.querySelector('#money-plus');
const moneyMinus = document.querySelector('#money-minus');
const list = document.querySelector('#list');
const form = document.querySelector('#form');
const text = document.querySelector('#text');
const amount = document.querySelector('#amount');

// const testTransactions = [
//   { id: 1, text: 'Groceries', amount: -50 },
//   { id: 2, text: 'Salary', amount: 2000 },
//   { id: 3, text: 'Book', amount: -60 },
//   { id: 4, text: 'Lottery', amount: 1000 },
// ];

const localStorageTransactions = JSON.parse(
  localStorage.getItem('transactions')
);

let transactions =
  localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

function addTransaction(e) {
  e.preventDefault();

  //Check if empty values

  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please, enter text and amount');
  } else {
    //Generate an id, that will be bigger by one from the id of the last transaction in the array
    const id = transactions.length
      ? transactions[transactions.length - 1].id + 1
      : 1;

    //Create the new transaction, giving it, id, the text and the amount from the form
    const transaction = { id, text: text.value, amount: Number(amount.value) };

    //Add the transaction to the transactions array
    transactions.push(transaction);

    //Add the new transaction to the DOM
    addTransactionToDOM(transaction);

    //Update displayed values on the page
    updateValues();

    //Update the local storage
    updateLocalStorage();

    //Reset the form
    form.reset();
  }
}

function addTransactionToDOM(transaction) {
  //Create a new list element
  let li = document.createElement('li');

  //Add the respective class to the list item, depending on the amount (positive or negative)
  li.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  //Set the inner html of the new list item to the desired format
  li.innerHTML = `
  ${transaction.text}<span>${transaction.amount}</span><button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>`;

  //Append the list item to the unordered list
  list.appendChild(li);
}

function removeTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);

  //Update the local storage
  updateLocalStorage();

  //Call the init function that will update the DOM
  init();
}

function updateValues() {
  const amounts = transactions.map(transaction => transaction.amount);

  const total = amounts.reduce((total, amount) => total + amount, 0).toFixed(2);

  const income = amounts
    .filter(amount => amount > 0)
    .reduce((total, amount) => total + amount, 0)
    .toFixed(2);

  const expense = (
    amounts
      .filter(amount => amount < 0)
      .reduce((total, amount) => total + amount, 0) * -1
  ).toFixed(2);

  //Add the calculated amounts to the DOM
  balance.innerText = `$${total}`;
  moneyPlus.innerText = `$${income}`;
  moneyMinus.innerText = `$${expense}`;
}

//Update local storage
function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

function init() {
  //Clear the displayed history when the init function runs
  list.innerHTML = '';

  //Display the transactions in the history
  transactions.forEach(addTransactionToDOM);
  updateValues();
}

init();

form.addEventListener('submit', addTransaction);
