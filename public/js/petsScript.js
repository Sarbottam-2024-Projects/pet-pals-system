document.addEventListener('DOMContentLoaded', () => {
    let allPets = [];

    fetch('/api/pets')
        .then(response => response.json())
        .then(pets => {
            allPets = pets;
            displayPets(pets);
        })
        .catch(error => {
            console.error('Error fetching pets:', error);
        });

    const searchPetByName = document.getElementById('search-name');
    const filterPetBySpecies = document.getElementById('species-filter');

    searchPetByName.addEventListener('input', filterPets);
    filterPetBySpecies.addEventListener('change', filterPets);

    function filterPets() {
        const searchName = searchPetByName.value.toLowerCase();
        const selectedSpecies = filterPetBySpecies.value;

        const filteredPets = allPets.filter(pet => {
            const matchesName = pet.pet_name.toLowerCase().includes(searchName);
            const matchesSpecies = selectedSpecies === '' || pet.pet_species === selectedSpecies;
            return matchesName && matchesSpecies;
        });

        displayPets(filteredPets);
    }

    function displayPets(pets) {
        const petListGrid = document.getElementById('pet_list_grid');
        petListGrid.innerHTML = ''; 

        pets.forEach((pet, index) => {
            const petCard = document.createElement('div');
            petCard.classList.add('col-md-3');
            petCard.id = index;

            petCard.innerHTML = `
                <div class="pet-card text-left mb-5">
                    <img src="${pet.pet_image}" alt="">
                    <div class="pet-card-info">
                        <h2>${pet.pet_name}</h2>
                        <p>Age: ${pet.pet_age}</p>
                        <p>Species: ${pet.pet_species}</p>
                        <a href="/single-pet?id=${pet.id}">View Single Pet</a>
                    </div>
                </div>
            `;

            petListGrid.appendChild(petCard);
        });
    }
});
