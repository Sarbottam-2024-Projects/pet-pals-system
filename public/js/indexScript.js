


function mainNavbar() {
    let navbar = document.getElementById("mainNavbar");

    let navbarComponent = `
        <nav class="navbar navbar-expand-lg">
            <div class="container mt-3">
                <div class="d-flex justify-content-between w-100">
                    <div>
                        <a class="navbar-brand" href="#">
                            <img src="../img/petpals_logo.png" />
                        </a>
                    </div>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                        <div class="navbar-nav">
                            <a class="nav-link" href="/home">Home</a>
                            <a class="nav-link" href="/pets">Adopt Pets</a>
                            <a class="nav-link" href="/profile">My Profile</a>
                            <a class="nav-link" id="shelter-link" href="/shelter">Shelter</a>
                            <a class="nav-link" id="adopter-link" href="/adopter">Adopter</a>
                            <a class="nav-link" href="/logout" id="logout_a">Logout</a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        <br>
        <br>
        <br>
    `;

    navbar.innerHTML = navbarComponent;
}

function mainFooter() {
    let footer = document.getElementById("mainFooter");

    let footerComponent = `
    <div class="container">
        <div class="d-flex justify-content-between w-100">
            <div class="footer-info">
                <p>Pet Pals is a web-based platform that allows potential pet adopters to identify and connect with a loving companion animal in need of a family and home. </p>
                <p>©PetPals 2024. All rights reserved</p>
            </div>
            <div class="footer-links">
                    <a href="">Home</a>
                    <a href="">Adopt Pets</a>
                    <a href="">My Profile</a>
            </div>
        </div>
    </div>
    `;

    footer.innerHTML = footerComponent;
}

mainNavbar();
mainFooter();


document.addEventListener('DOMContentLoaded', function () {
    let shelterLink = document.getElementById('shelter-link');
    let adopterLink = document.getElementById('adopter-link');

    function handleRole(data) {
        try {
            if (data.user.role === 'shelter') {
                shelterLink.style.display = 'block';
                adopterLink.style.display = 'none';
            } else {
                shelterLink.style.display = 'none';
                adopterLink.style.display = 'block';
            }

        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    }

    function getUserRole(email) {
        console.log(email);
        fetch(`/user/${email}`)
            .then(response => response.json())
            .then(handleRole)
            .catch(error => {
                console.error('Error:', error);
                throw error;
            });
    }

    // Ensure the email is loaded from localStorage
    const email = localStorage.getItem('email');
    if (email) {
        getUserRole(email);
    }
});

