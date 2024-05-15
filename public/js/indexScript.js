function mainNavbar() {
  let navbar = document.getElementById("mainNavbar");

  let navbarComponent = `
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div class="navbar-nav">
                  <a class="nav-link active" href="/home">Home</a>
                  <a class="nav-link" href="/logout">Logout</a>
              </div>
          </div>
  
      </nav>
  `;

  navbar.innerHTML = navbarComponent;
}
mainNavbar()

window.onload = function () { // Run after DOM loads
  console.log("onload")
  const sessionEmail = sessionStorage.getItem('logged_in_email');
  if (!sessionEmail) {
    console.log("Not logged in")
    window.location.href = "/login";
  }
}

function logout() {
  // Send an AJAX request to the server-side logout script
  fetch('/logout')
    .then(response => {
      console.log(response)
      // Check the response data (e.g., success message)
      if (response.ok) {
        // Clear any local user data (optional)
        window.location.href = "/login"; // Redirect to login page
      } else {
        // Handle any errors from the server
        alert("Logout failed!");
      }
    })
    .catch(error => {
      console.error("Error:", error);
      alert("Logout failed!");
    });
}