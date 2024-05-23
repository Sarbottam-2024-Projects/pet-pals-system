let fullName = document.getElementById('full_name');
let email = document.getElementById('email');
let email_under = document.getElementById('email_under');
let contactNumber = document.getElementById('contact_number');
let address = document.getElementById('address');
let state = document.getElementById('state');
let profileDescription = document.getElementById('profile_description');

function handleResponse(data) {
  try {
    fullName.value = data.user.full_name || null;
    email.value = localStorage.getItem('email') || undefined;
    email_under.textContent = localStorage.getItem('email') || undefined;
    contactNumber.value = data.user.contact_number || null;
    address.value = data.user.address || null;
    state.value = data.user.state || null;
    profileDescription.value = data.user.profile_description || null;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

function getUser(email) {
  console.log(email)
  fetch(`/user/${email}`)
    .then(response => response.json())
    .then(handleResponse)
    .catch(error => {
     throw error;
    })
}

const updateForm = document.getElementById('update-form');

updateForm.addEventListener('submit', (event) => {
  event.preventDefault();
  // Handle server response
  fetch('/updateUser', {
    method: 'PUT',
    body: JSON.stringify({
      "email": email.value || undefined,
      "full_name": fullName.value || undefined,
      "contact_number": contactNumber.value || undefined,
      "address": address.value || undefined,
      "state": state.value || undefined,
      "profile_description": profileDescription.value || undefined
    }),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(response => getUser(localStorage.getItem('email')))
  .catch(error => {
    console.error('Error:', error)
    alert("Getting profile failed!");
  })
});


window.onload = function () {
  console.log("getting user details")
  getUser(localStorage.getItem('email'));
}

