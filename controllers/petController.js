const { insertPet, getAllPets } = require('../models/petModel');

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
        await insertPet({
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

module.exports = { addNewPet, getPetItems };
