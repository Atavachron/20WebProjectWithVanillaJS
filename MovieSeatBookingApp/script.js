const container = document.querySelector('.container');
const movie = document.querySelector('#movie');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.querySelector('.count');
const total = document.querySelector('.total');
let ticketPrice = Number(movie.value);

//Update the total seats and update local storage
function updateTotal() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  let totalSelectedSeats = selectedSeats.length;
  count.textContent = totalSelectedSeats;
  total.textContent = totalSelectedSeats * ticketPrice;

  let indicesArray = [...selectedSeats].map(currentSeat =>
    [...seats].indexOf(currentSeat)
  );

  localStorage.setItem('selectedSeats', JSON.stringify(indicesArray));
}

//Save the selected movie in the drop down menu and the price
function updateMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

container.addEventListener('click', e => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');
    updateTotal();
  }
});

movie.addEventListener('change', e => {
  ticketPrice = Number(e.target.value);
  updateMovieData(e.target.selectedIndex, e.target.value);
  updateTotal();
});
