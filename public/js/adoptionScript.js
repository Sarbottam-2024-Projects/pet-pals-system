
const formMessageDiv = document.getElementById('form-message');

function showFormMessageDiv(message) {
  formMessageDiv.textContent = message;
  formMessageDiv.classList.remove('hidden'); // Remove hidden class to show
  formMessageDiv.classList.add('show'); // Add show class for styling (optional)
}

function clearFormMessage() {
  formMessageDiv.textContent = '';
  formMessageDiv.classList.remove('show'); // Remove hidden class to show
  formMessageDiv.classList.add('hidden'); // Add show class for styling (optional)
}

window.onbeforeunload = function () {
  clearFormMessage();
}

const adoptForm = document.getElementById('adopt-form');

adoptForm.addEventListener('submit', (event) => {
  event.preventDefault();
  let urlParams = new URLSearchParams(window.location.search);
  let petId = urlParams.get('id');
  // Handle server response
  fetch('/adopt/application', {
    method: 'POST',
    body: JSON.stringify({
      full_name: document.getElementById('fullName').value,
      address: document.getElementById('address').value,
      phone: document.getElementById('phone').value,
      email: document.getElementById('email').value,
      occupation: document.getElementById('occupation').value,
      have_pets: document.getElementById('have_pets').value,
      adults: document.getElementById('adults').value,
      children: document.getElementById('children').value,
      agreement: document.getElementById('agreement').value,
      home_type: document.getElementById('homeType').value,
      home_description: document.getElementById('homeDescription').value,
      pet_id: petId || undefined,   
    }),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(response => response.json())
  .then(data => {
    if (data.pet_id) {
      showFormMessageDiv(`Application for Pet: ${data.pet_id} is Created`);
    } else {
      clearFormMessage();
    }
  })
  .catch(error => {
    console.error('Error submitting application form:', error);
    clearFormMessage();
  })
});