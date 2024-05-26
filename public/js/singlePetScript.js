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
                <p>Description: ${petData.pet_description}</p>
                <p>Species: ${petData.pet_species}</p>
                <p>Breed: ${petData.pet_breed}</p>
                <p>Age: ${petData.pet_age}</p>
                <p>Personality: ${petData.pet_personality}</p>
                <p>Special Requirement: ${petData.pet_special_requirement}</p>
                <img src="${petData.pet_image}" alt="${petData.pet_name}" width="200">
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
