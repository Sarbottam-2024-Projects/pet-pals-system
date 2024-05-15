function mainNavbar() {
    let navbar = document.getElementById("mainNavbar");

    let navbarComponent = `
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <a class="nav-link active" href="/home">Home</a>
                    <a class="nav-link" href="/login">Login</a>
                    <a class="nav-link" href="/signup">Signup</a>
                </div>
            </div>
    
        </nav>
    `;

    navbar.innerHTML = navbarComponent;
}

mainNavbar();

const signupForm = document.getElementById('signup-form');
const errorMessage = document.getElementById('error-message');

const errorMessageDiv = document.getElementById('error-message');
function showErrorMessage(message) {
  errorMessageDiv.textContent = message;
  errorMessageDiv.classList.remove('hidden'); // Remove hidden class to show
  errorMessageDiv.classList.add('show'); // Add show class for styling (optional)
}
// Function to clear the error message (optional)
function clearErrorMessage() {
  errorMessageDiv.textContent = '';
  errorMessageDiv.classList.add('hidden'); // Hide the message
  errorMessageDiv.classList.remove('show'); // Remove styling class (optional)
}

function handleSignupResponse(data) {
  console.log(data)
  if (data.errors === 'Email already exists') {
    showErrorMessage('Email already exists');
    sessionStorage.setItem('signUpResult', false);
  }  else {
    clearErrorMessage();
    sessionStorage.setItem('email', data.message);
    sessionStorage.setItem('signUpResult', true);
    window.location.href = '/login';
  }
}

signupForm.addEventListener('submit', (event) => {
  event.preventDefault();
  // Send signup data to server using fetch or Axios

  // Handle server response
  fetch('/signup', {
    method: 'POST',
    body: JSON.stringify({
      "email": document.getElementById('email').value,
      "password": document.getElementById('password').value,
      "contact_number": document.getElementById('contact_number').value
    }),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(response => response.json())
  .then(handleSignupResponse)
});