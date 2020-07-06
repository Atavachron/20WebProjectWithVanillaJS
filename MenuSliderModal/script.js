//DOM elements

const toggleBtn = document.getElementById('toggle');
const openBtn = document.getElementById('open');
const closeBtn = document.getElementById('close');
const modal = document.getElementById('modal');

toggleBtn.addEventListener('click', toggleNav);
openBtn.addEventListener('click', showModal);
closeBtn.addEventListener('click', hideModal);

// Checks if there is a click outside of the modal and close it if so
window.addEventListener('click', e => {
  e.target === modal ? hideModal() : null;
});

//Adds a class of show-nav to the body in order to display the nav
function toggleNav() {
  document.body.classList.toggle('show-nav');
}

function showModal() {
  modal.classList.add('show-modal');
}

function hideModal() {
  modal.classList.remove('show-modal');
}
