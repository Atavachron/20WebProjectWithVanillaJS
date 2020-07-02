//Get DOM Elements

const $currencyOne = document.getElementById('currency1');
const $currencyTwo = document.getElementById('currency2');
const $amountOne = document.getElementById('amount1');
const $amountTwo = document.getElementById('amount2');
const $swapBtn = document.getElementById('swap-btn');
const $rate = document.querySelector('.rate');

//Event Listeners

$currencyOne.addEventListener('change', calculateRates);
$currencyTwo.addEventListener('change', calculateRates);
$amountOne.addEventListener('input', calculateRates);
$swapBtn.addEventListener('click', swapCurrencies);

//Fetch the data from the API and update DOM

function calculateRates() {
  const curOne = $currencyOne.value;
  const curTwo = $currencyTwo.value;

  fetch(`https://api.exchangerate-api.com/v4/latest/${curOne}`)
    .then(res => res.json())
    .then(data => {
      const rate = data.rates[curTwo];
      $rate.innerText = `1 ${curOne} = ${rate} ${curTwo}`;
      $amountTwo.value = ($amountOne.value * rate).toFixed(2);
    });
}

function swapCurrencies() {
  const temp = $currencyOne.value;
  $currencyOne.value = $currencyTwo.value;
  $currencyTwo.value = temp;
  calculateRates();
}
