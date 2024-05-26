document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/pets')
        .then(response => response.json())
        .then(pets => {
            const petListGrid = document.getElementById('pet_list_grid');
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
                            <a href="">View this pet</a>
                        </div>
                    </div>
                `;

                petListGrid.appendChild(petCard);
            });
        })
        .catch(error => {
            console.error('Error fetching pets:', error);
        });
});
