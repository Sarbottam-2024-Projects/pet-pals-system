const signUpMessageDiv = document.getElementById('signup-message');

window.onbeforeunload = function () {
  clearSignUpMessage();
}
window.onload = function () { // Run after DOM loads
  console.log("onload")
  let registeredEmail = sessionStorage.getItem('emailRegistered');
  console.log('registered email', registeredEmail);
  sessionStorage.removeItem('emailRegistered');

  if (registeredEmail) {
    console.log("show")
    showSignUpMessage(`${registeredEmail} is Created`);
    let emailInput = document.getElementById('email');
    emailInput.value = registeredEmail;
  } else {
    console.log("clear")
    clearSignUpMessage();
  }
}

function showSignUpMessage(message) {
  signUpMessageDiv.textContent = message;
  signUpMessageDiv.classList.remove('hidden'); // Remove hidden class to show
  signUpMessageDiv.classList.add('show'); // Add show class for styling (optional)
}
// Function to clear the signup message (optional)
function clearSignUpMessage() {
  signUpMessageDiv.textContent = '';
  signUpMessageDiv.classList.remove('show'); // Remove hidden class to show
  signUpMessageDiv.classList.add('hidden'); // Add show class for styling (optional)
  const emailInput = document.getElementById('email');
  emailInput.value = ""
}

const errorMessageDiv = document.getElementById('error-message');
// Function to show the login error message
function showErrorMessage(message) {
  errorMessageDiv.textContent = message;
  errorMessageDiv.classList.remove('hidden'); // Remove hidden class to show
  errorMessageDiv.classList.add('show'); // Add show class for styling (optional)
}
// Function to clear the login error message (optional)
function clearErrorMessage() {
  errorMessageDiv.textContent = '';
  errorMessageDiv.classList.add('hidden'); // Hide the message
  errorMessageDiv.classList.remove('show'); // Remove styling class (optional)
}

const loginForm = document.getElementById('login-form');
const errorMessage = document.getElementById('error-message');

function handleLoginResponse(data) {
  console.log(data)
  if (data.error) {
    showErrorMessage(data.error);
  }

  if (data.token && data.email) {
    clearErrorMessage();
    localStorage.setItem('jwt_token', data.token);
    localStorage.setItem('email', data.email);
    window.location.href = '/home';
  }
}

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  // Handle server response
  fetch('/login', {
    method: 'POST',
    body: JSON.stringify({
      "email": document.getElementById('email').value,
      "password": document.getElementById('password').value,
    }),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(response => response.json())
  .then(handleLoginResponse)
});