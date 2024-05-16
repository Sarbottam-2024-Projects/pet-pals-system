const signupForm = document.getElementById('signup-form');
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
  try {
    if (data.errors === 'Email already exists') {
      showErrorMessage('Email already exists');
      sessionStorage.removeItem('emailRegistered');
    }  else {
      clearErrorMessage();
      sessionStorage.setItem('emailRegistered', data.message);
      window.location.href = '/login';
    }
  } catch (error) {
    console.error('Error registering:', error);
    return res.status(500).json({ error: 'Internal server error' }); 
  }
  
}

signupForm.addEventListener('submit', (event) => {
  console.log(signupForm)
  event.preventDefault();
  // Handle server response
  fetch('/register', {
    method: 'POST',
    body: JSON.stringify({
      "full_name": document.getElementById('full_name').value,
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