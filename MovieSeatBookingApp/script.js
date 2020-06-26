const container = document.querySelector('.container');
const movie = document.querySelector('#movie');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.querySelector('.count');
const total = document.querySelector('.total');
let ticketPrice = Number(movie.value);

function updateTotal() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  let totalSelectedSeats = selectedSeats.length;
  count.textContent = totalSelectedSeats;
  total.textContent = totalSelectedSeats * ticketPrice;
}

container.addEventListener('click', e => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  )
    e.target.classList.toggle('selected');
  updateTotal();
});

movie.addEventListener('change', e => {
  ticketPrice = Number(e.target.value);
  updateTotal();
});
