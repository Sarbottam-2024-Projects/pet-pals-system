const logout_a = document.getElementById('logout_a')

function logout(event) {
  event.preventDefault();
  // Send an AJAX request to the server-side logout script
  fetch('/logout', {
    method: 'GET'
  }).then(response => {
    console.log(response)
    // Check the response data (e.g., success message)
    if (!response.ok) {
      alert("Logout failed!");
    }
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
    window.location.href = "/login"; // Redirect to login page
  })
    .catch(error => {
      console.error("Error:", error);
      alert("Logout failed!");
    });
}

logout_a.addEventListener('click', logout);

