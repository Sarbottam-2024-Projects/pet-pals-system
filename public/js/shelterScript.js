document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/pets')
        .then(response => response.json())
        .then(pets => {
            const petList = document.getElementById('pet_list_table');
            pets.forEach((pet, index) => {
                const petRow = document.createElement('tr');
                
                petRow.innerHTML = `
                    <th scope="row">${index + 1}</th>
                    <td>${pet.pet_name}</td>
                    <td>${pet.pet_age} ${pet.pet_age > 1 ? 'years' : 'year'}</td>
                    <td>${pet.pet_species}</td>
                    <td><button class="btn page-btn" type="button">Delete</button></td>
                `;
                
                petList.appendChild(petRow);
            });
        })
        .catch(error => {
            console.error('Error fetching pets:', error);
        });
});
