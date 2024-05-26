document.addEventListener("DOMContentLoaded", function() {
  const params = new URLSearchParams(window.location.search);
  const petId = params.get('id');

  if (petId) {
    fetch(`/api/pets/${petId}`)
      .then(response => response.json())
      .then(pet => {
        document.getElementById('petName').textContent = pet.name;
        document.getElementById('petImage').src = pet.image;
        document.getElementById('petBreed').textContent = `Breed: ${pet.breed}`;
        document.getElementById('petLocation').textContent = `Location: ${pet.location}`;
        document.getElementById('petDescription').textContent = `Description: ${pet.description}`;
      })
      .catch(error => console.error('Error:', error));
  }
});
