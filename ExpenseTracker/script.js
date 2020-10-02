//DOM variables

const balance = document.querySelector('#balance');
const moneyPlus = document.querySelector('#money-plus');
const moneyMinus = document.querySelector('#money-minus');
const list = document.querySelector('#list');
const form = document.querySelector('#form');
const text = document.querySelector('#text');
const amount = document.querySelector('#amount');

const testTransactions = [
  { id: 1, text: 'Groceries', amount: -50 },
  { id: 2, text: 'Salary', amount: 2000 },
  { id: 3, text: 'Book', amount: -60 },
  { id: 4, text: 'Lottery', amount: 1000 },
];

let transactions = testTransactions;

function addTransactionToDOM(transaction) {
  //Create a new list element
  let li = document.createElement('li');

  //Add the respective class to the list item, depending on the amount (positive or negative)
  li.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  //Set the inner html of the new list item to the desired format
  li.innerHTML = `
  ${transaction.text}<span>${transaction.amount}</span><button class="delete-btn">x</button>`;

  //Append the list item to the unordered list
  list.appendChild(li);
}

function init() {
  //Clear the displayed history when the init function runs
  list.innerHTML = '';

  //Display the transactions in the history
  transactions.forEach(addTransactionToDOM);
}

init();
