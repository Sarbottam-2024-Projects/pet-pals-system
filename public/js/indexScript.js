function mainNavbar() {
  let navbar = document.getElementById("mainNavbar");

  let navbarComponent = `
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div class="navbar-nav">
                  <a class="nav-link" href="/home">Home</a>
                  <a class="nav-link" href="/pets">Adopt Pets</a>
                  <a class="nav-link" id="logout_a">Logout</a>
              </div>
          </div>
      </nav>
  `;

  navbar.innerHTML = navbarComponent;
}
mainNavbar()