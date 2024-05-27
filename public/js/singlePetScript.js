async function fetchPetById(id) {
    try {
        const response = await fetch(`/api/pets/${id}`);
        if (!response.ok) {
            throw new Error('Pet not found');
        }
        const petData = await response.json();
        return petData;
    } catch (error) {
        console.error('Error fetching pet data:', error);
        return null;
    }
}

async function displaySinglePet() {
    const urlParams = new URLSearchParams(window.location.search);
    const petId = urlParams.get('id');
    const petDetailsDiv = document.getElementById('petDetails');
    
    if (petId) {
        const petData = await fetchPetById(petId);
        if (petData) {
            petDetailsDiv.innerHTML = `
                <h2>${petData.pet_name}</h2>
                <h3>Description: ${petData.pet_description}</p>
                <h3>Species: ${petData.pet_species}</p>
                <h3>Breed: ${petData.pet_breed}</p>
                <h3>Age: ${petData.pet_age}</p>
                <h3>Personality: ${petData.pet_personality}</p>
                <h3>Special Requirement: ${petData.pet_special_requirement}</p>
                <img src="${petData.pet_image}" alt="${petData.pet_name}" width="500">
                <br>
                <a href="/adopt?id=${petData.id}">Send adoption application</a>
            `;
        } else {
            petDetailsDiv.innerHTML = '<p>Pet not found</p>';
        }
    } else {
        petDetailsDiv.innerHTML = '<p>Pet ID not provided</p>';
    }
}

// Calling the function to display single pet when the page loads
displaySinglePet();
