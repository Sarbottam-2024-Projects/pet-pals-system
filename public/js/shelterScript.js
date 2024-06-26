document.addEventListener('DOMContentLoaded', () => {
    let petsData = [];
    let applicationModalDiv = document.getElementById('applicationModal');

    function fetchApplications() {
        fetch('/api/applications')
            .then(response => response.json())
            .then(applications => {
                console.log('Applications data:', applications);
                const applicationList = document.getElementById('application_list_table');
                applications.forEach((application, index) => {
                    // To ensure id are in string for filtering
                    const pet = petsData.find(p => p.id.toString() === application.pet_id); 
                    const petName = pet ? pet.pet_name : 'Unknown'; 

                    const applicationRow = document.createElement('tr');

                    // function for status
                    function statusBar() {
                        if (application.status === "Pending") {
                            return `<button class="btn btn-warning" disabled>${application.status}</button>`;
                        } else if (application.status === "Rejected") {
                            return `<button class="btn btn-danger" disabled>${application.status}</button>`;
                        } else {
                            return `<button class="btn btn-success" disabled>${application.status}</button>`;
                        }
                    }

                    function updateViewWithStatus() {
                        if (application.status === "Pending") {
                            return `<button class="btn page-btn view-btn" type="button" data-index="${index}">View</button>`;
                        } else {
                            return `<button class="btn page-btn view-btn" type="button" disabled data-index="${index}">View</button>`;
                        }
                    }
                    
                    

                    applicationRow.innerHTML = `
                        <th scope="row">${index + 1}</th>
                        <td>${application.full_name}</td>
                        <td>${application.email}</td>
                        <td>${petName}</td> 
                        <td>${statusBar()}</td>
                        <td>${updateViewWithStatus()}</td>
                    `;

                    applicationList.appendChild(applicationRow);
                });

                const viewButtons = document.querySelectorAll('.view-btn');
                viewButtons.forEach(button => {
                    button.addEventListener('click', (event) => {
                        const index = event.target.getAttribute('data-index');
                        const application = applications[index];
                        displayApplicationDetails(application);
                        applicationModalDiv.style.display = "block";
                    });
                });
            })
            .catch(error => {
                console.error('Error fetching applications:', error);
            });
    }

    function displayApplicationDetails(application) {
        const pet = petsData.find(p => p.id.toString() === application.pet_id);
        const petImage = pet ? pet.pet_image : '';
        const petName = pet ? pet.pet_name : 'Unknown';
    
        const applicationViewContent = document.getElementById('application_view_content');
        applicationViewContent.innerHTML = `
            <button class="application-close-btn" id="closeApplicationModal">X</button>
            <div class="row">
            <div class="col-md-6">
                <div class="application-pet-details">
                    <h2>${petName}</h2>
                    <p><b>Pet ID:</b> ${application.pet_id}</p>
                    ${petImage ? `<img src="${petImage}" alt="${petName}" style="max-width: 100%; height: auto;">` : ''}
                </div>
              
            </div>
            <div class="col-md-6">
            <div class="text-left" >
                <h2>Applicant Details</h2>
                <br>
                <p><b>Applicant Full Name:</b> ${application.full_name}</p>
                <p><b>Applicant Address:</b> ${application.address}</p>
                <p><b>Phone:</b> ${application.phone}</p>
                <p><b>Email:</b> ${application.email}</p>
                <p><b>Occupation:</b> ${application.occupation}</p>
                <p><b>Have Pets:</b> ${application.have_pets}</p>
                <p><b>Adults:</b> ${application.adults}</p>
                <p><b>Children:</b> ${application.children}</p>
                <p><b>Agreement:</b> ${application.agreement}</p>
                <p><b>Home Type:</b> ${application.home_type}</p>
                <p><b>Home Description:</b> ${application.home_description}</p>
             
                <p><b>Status:</b> ${application.status}</p>
    
                <div class="d-flex">
                    <button class="btn btn-success" id="approveButton">Approve</button>
                    <button class="btn btn-danger" id="rejectButton" style="margin-left: 15px">Reject</button>
                </div>
                </div>
            </div>
        
        </div>
        `;
    
        document.getElementById('closeApplicationModal').addEventListener('click', () => {
            applicationModalDiv.style.display = "none";
        });
    
        document.getElementById('approveButton').addEventListener('click', () => updateApplicationStatus(application.id, 'Approved'));
        document.getElementById('rejectButton').addEventListener('click', () => updateApplicationStatus(application.id, 'Rejected'));
    }
    
    function updateApplicationStatus(applicationId, status) {
        fetch(`/api/applications/${applicationId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: status })
        })
        .then(response => response.json())
        .then(updatedApplication => {
            applicationModalDiv.style.display = "none";
            location.reload();
        })
        .catch(error => {
            console.error('Error updating application status:', error);
        });
    }
    

    // Fetch Pets
    // Function to delete a pet
    const deletePet = async (petId) => {
        try {
            const response = await fetch(`/api/pets/${petId}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                // Remove the deleted pet from the DOM
                const petRow = document.getElementById(`pet_row_${petId}`);
                if (petRow) {
                    petRow.remove();
                }
            } else {
                console.error('Failed to delete pet');
            }
        } catch (error) {
            console.error('Error deleting pet:', error);
        }
    };

    fetch('/api/pets')
        .then(response => response.json())
        .then(pets => {
            console.log('Pets data:', pets); 
            petsData = pets;
            const petList = document.getElementById('pet_list_table');
            pets.forEach((pet) => {
                const petRow = document.createElement('tr');

                petRow.id = `pet_row_${pet.id}`; // Set a unique ID for each pet row

                petRow.innerHTML = `
                    <th scope="row">${pet.id}</th>
                    <th scope="row">
                        <img width="75px" src="${pet.pet_image}" />
                    </th>
                    <td>${pet.pet_name}</td>
                    <td>${pet.pet_age} ${pet.pet_age > 1 ? 'years' : 'year'}</td>
                    <td>${pet.pet_species}</td>

                `;

                petList.appendChild(petRow);
            });

            fetchApplications();

            // Attach click event listeners to delete buttons
            const deleteButtons = document.querySelectorAll('.delete-btn');
            deleteButtons.forEach(button => {
                button.addEventListener('click', (event) => {
                    const petId = event.target.dataset.petId;
                    deletePet(petId);
                });
            });
        })
        .catch(error => {
            console.error('Error fetching pets:', error);
        });
});
