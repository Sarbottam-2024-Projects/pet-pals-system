document.addEventListener("DOMContentLoaded", function() {
  const openModalBtn = document.getElementById("openModalBtn");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const modal = document.getElementById("addPetModal");

  function toggleModal() {
    if (modal.style.display === "none" || modal.style.display === "") {
      modal.style.display = "block";
    } else {
      modal.style.display = "none";
    }
  }

  openModalBtn.addEventListener("click", function() {
    toggleModal();
  });

  closeModalBtn.addEventListener("click", function() {
    toggleModal();
  });

  window.addEventListener("click", function(event) {
    if (event.target === modal) {
      toggleModal();
    }
  });

  // Function to add a pet card
  function addPetCard(pet) {
    const container = document.getElementById("petContainer");
    const cardLink = document.createElement("a");
    cardLink.href = `/pet-details.html?id=${pet._id}`;
    cardLink.className = "card-link";

    const card = document.createElement("div");
    card.className = "card";

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const cardTitle = document.createElement("h5");
    cardTitle.className = "card-title";
    cardTitle.textContent = pet.name;

    const cardText = document.createElement("p");
    cardText.className = "card-text";
    cardText.innerHTML = `
      <strong>Breed:</strong> ${pet.breed}<br>
      <strong>Location:</strong> ${pet.location}<br>
      <strong>Description:</strong> ${pet.description}
    `;

    const cardImage = document.createElement("img");
    cardImage.src = pet.image;
    cardImage.alt = pet.name;
    cardImage.className = "card-img-top";

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    card.appendChild(cardImage);
    card.appendChild(cardBody);
    cardLink.appendChild(card);

    container.appendChild(cardLink);
  }

  // Fetch pets on page load
  fetch('/api/pets')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(pets => {
      pets.forEach(pet => {
        addPetCard(pet);
      });
    })
    .catch(error => {
      console.error('Error:', error);
      // Display a meaningful error message to the user or log it for debugging
    });

  // Form submission event listener
  document.getElementById("addPetForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Retrieve form data
    const name = document.getElementById("petName").value;
    const location = document.getElementById("petLocation").value;
    const image = document.getElementById("petImage").value;
    const breed = document.getElementById("petBreed").value;
    const description = document.getElementById("petDescription").value;

    // Construct the request body
    const requestBody = {
      name: name,
      location: location,
      image: image,
      breed: breed,
      description: description
    };

    // Send a POST request to the server
    fetch('/api/pets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Handle the response data as needed
      console.log('Response:', data);
      // Add the new pet card to the UI
      addPetCard(data);
      // Optionally, perform additional actions such as updating the UI
      document.getElementById("addPetForm").reset();
      toggleModal();
    })
    .catch(error => {
      console.error('Error:', error);
      // Display a meaningful error message to the user or log it for debugging
    });
  });
});
