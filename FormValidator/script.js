//Get DOM elements

const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const password2 = document.querySelector('#password2');
const form = document.querySelector('#form');

//Event Listener
form.addEventListener('submit', e => {
  //Check that the field is not empty
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordsMatch(password, password2);

  checkRequired([username, email, password, password2]);
  e.preventDefault();
});

function checkRequired(inputArray) {
  inputArray.forEach(input => {
    if (input.value.trim() === '') {
      showError(input, `${getName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

function checkLength(input, min, max) {
  if (input.value.length < min || input.value.length > max) {
    showError(
      input,
      `${getName(input)} must be between ${min} and ${max} characters.`
    );
  } else {
    showSuccess(input);
  }
}

//Use the element id and capitalize it in order to display it in the error message
function getName(input) {
  return input.id.slice(0, 1).toUpperCase() + input.id.slice(1);
}

function checkEmail(input) {
  //Regular expression to check email validity
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!re.test(String(email.value.toLowerCase()))) {
    showError(input, 'Invalid email');
  } else {
    showSuccess(input);
  }
}

function checkPasswordsMatch(input1, input2) {
  if (!input1.value === input2.value) {
    showError(password2, 'Passwords do not match');
  } else {
    showSuccess(password2);
  }
}

function showError(input, message) {
  //Access the parent div of the input
  const formControl = input.parentElement;

  //Add the error class to the parent div
  formControl.classList.add('error');

  //Access the small element
  const small = formControl.querySelector('small');

  //Change the text content of the small element with the message passed to showError()
  small.textContent = message;
}

function showSuccess(input) {
  //Access the parent div of the input
  const formControl = input.parentElement;

  //Add the success class to the parent div
  formControl.classList.add('success');
}
