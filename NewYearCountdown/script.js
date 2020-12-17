const days = document.getElementById('days');
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const countdown = document.getElementById('countdown');

const currentYear = new Date().getFullYear();

const newYearTime = new Date(`January 01 ${currentYear + 1} 00:00:00`);

function updateCountdown() {
  const now = new Date();

  //Get the difference in miliseconds
  const difference = newYearTime - now;

  //Get the days
  const d = Math.floor(difference / 1000 / 60 / 60 / 24);
  //Get the hours of the day by divind the total hours using the modulus operator
  const h = Math.floor(difference / 1000 / 60 / 60) % 24;
  //Get the minutes
  const m = Math.floor(difference / 1000 / 60) % 60;
  //Get the seconds
  const s = Math.floor(difference / 1000) % 60;

  //Display the times on the page
  days.innerHTML = d;
  hours.innerHTML = h < 10 ? '0' + h : h;
  minutes.innerHTML = m < 10 ? '0' + m : m;
  seconds.innerHTML = s < 10 ? '0' + s : s;
}

setInterval(updateCountdown, 1000);
