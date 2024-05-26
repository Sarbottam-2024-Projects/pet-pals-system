const { addPetRequest } = require('../models/petModel');

const addNewPet = async (req, res) => {
    const { pet_name, pet_description, pet_species, pet_breed, pet_age, pet_personality, pet_special_requirement, pet_image } = req.body;

    const petDetails = {
        pet_name,
        pet_description,
        pet_species,
        pet_breed,
        pet_age,
        pet_personality,
        pet_special_requirement,
        pet_image
    };

    try {
        await addPetRequest(petDetails);
        res.redirect('/shelter');
    } catch (error) {
        console.error('Error adding pet:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports = { addNewPet };
