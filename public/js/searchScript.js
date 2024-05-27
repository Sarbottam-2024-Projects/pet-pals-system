// Function to fetch pets based on the search criteria
async function fetchPets(species, breed, location) {
  try {
    // Connect to the database
    await connectDB();

    const db = client.db('TestDB'); // Replace 'petPals' with your actual database name
    console.log("success")
    const collection = db.collection('pets'); // Replace 'pets' with your actual collection name

    // Build the query based on the search criteria
    const query = {};
    if (species && species !== 'Choose Pet Type...') query.species = species;
    if (breed) query.breed = { $regex: breed, $options: 'i' }; // Case-insensitive search
    if (location && location !== 'Filter Location...') query.location = location;

    // Fetch the pets matching the query
    const pets = await collection.find(query).toArray();
    return pets;
  } catch (error) {
    console.error('Error fetching pets:', error);
    return [];
  } finally {
    // Close the database connection
    await client.close();
  }
}

// Function to render pets in the pet list grid
function renderPets(pets) {
  const petListGrid = document.getElementById('searchBtn');
  petListGrid.innerHTML = '';

  pets.forEach(pet => {
    const petCard = `
      <div class="col-md-4">
        <div class="card mb-4">
          <img src="${pet.image}" class="card-img-top" alt="${pet.name}">
          <div class="card-body">
            <h5 class="card-title">${pet.name}</h5>
            <p class="card-text">${pet.breed}</p>
            <p class="card-text">${pet.location}</p>
          </div>
        </div>
      </div>
    `;
    petListGrid.innerHTML += petCard;
  });
}

// Event listener for the search button
document.querySelector('.btn.page-btn').addEventListener('click', async () => {
  const species = document.getElementById('species_dropdown').value;
  const breed = document.querySelector('.form-control').value;
  const location = document.getElementById('location_dropdown').value;

  const pets = await fetchPets(species, breed, location);
  renderPets(pets);
});

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("searchBtn").addEventListener("click", function() {
    fetch('/api/pets')  
      .then(response => response.json())
      .then(pets => {
        const petListGrid = document.getElementById('pet_list_grid');
        petListGrid.innerHTML = '';
        console.log(pets);
        pets.forEach((pet, index) => {
          const species = document.getElementById("species_dropdown").value;
          const breed = document.querySelector(".form-control").value;
          const location = document.getElementById("location_dropdown").value;
          if (species == pet.pet_species){

            const petCard = document.createElement('div');
                petCard.classList.add('col-md-3');
                petCard.id = index;
                petCard.innerHTML = `
                    <div class="pet-card text-left mb-5">
                        <img src="${pet.pet_image}" alt="">
                        <div class="pet-card-info">
                            <h2>${pet.pet_name}</h2>
                            <p>Age: ${pet.pet_age}</p>
                            <a href="/single-pet?id=${pet.id}">View Single Pet</a>
                        </div>
                    </div>
                `;
                petListGrid.appendChild(petCard);
          } 
        }) 
      });
  });
});

