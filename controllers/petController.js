const { insertPet, getAllPets, getPetById } = require('../models/petModel');

let lastPetId = 0;

// Function to add new pet
async function addNewPet(req, res) {
    const {
        pet_name,
        pet_description,
        pet_species,
        pet_breed,
        pet_age,
        pet_personality,
        pet_special_requirement,
        pet_image
    } = req.body;

    try {
        lastPetId++; 
        const petId = lastPetId; 
        await insertPet({
            id: petId,
            pet_name,
            pet_description,
            pet_species,
            pet_breed,
            pet_age,
            pet_personality,
            pet_special_requirement,
            pet_image
        });
        res.redirect('/shelter');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}

// Function to get all pets
async function getPetItems(req, res) {
    try {
        const data = await getAllPets();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}

// Function to get a single pet by ID
async function getSinglePet(req, res) {
    const petId = req.params.id; 
    try {
        const pet = await getPetById(petId);
        if (!pet) {
            return res.status(404).send('Pet not found');
        }
        res.json(pet);
    } catch (err) {
        console.error(err);
    }
}

module.exports = { addNewPet, getPetItems, getSinglePet };
