function mainNavbar() {
  let navbar = document.getElementById("mainNavbar");

  let navbarComponent = `
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div class="navbar-nav">
                  <a class="nav-link" href="/signup">Signup</a>
              </div>
          </div>
  
      </nav>
  `;

  navbar.innerHTML = navbarComponent;
}
mainNavbar()

const signUpMessageDiv = document.getElementById('signup-message');

window.onbeforeunload = function () {
  clearSignUpMessage();
}
window.onload = function () { // Run after DOM loads
  console.log("onload")
  const sessionEmail = sessionStorage.getItem('email');
  const signUpResult = sessionStorage.getItem('signUpResult');

  if (sessionEmail && signUpResult) {
    console.log("show")
    showSignUpMessage(`${sessionEmail} is Created`);
    const emailInput = document.getElementById('email');
    emailInput.value = sessionEmail;
    sessionStorage.setItem('signUpResult', false);
    sessionStorage.removeItem('email')
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

  if (data.message) {
    clearErrorMessage();
    sessionStorage.setItem('logged_in_email', data.message);
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