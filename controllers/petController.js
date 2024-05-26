const Pet = require('../models/user.js');

exports.getAllPets = async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPetById = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (pet) {
      res.json(pet);
    } else {
      res.status(404).json({ message: 'Pet not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createPet = async (req, res) => {
  const pet = new Pet({
    name: req.body.name,
    location: req.body.location,
    image: req.body.image,
    breed: req.body.breed,
    description: req.body.description
  });

  try {
    const newPet = await pet.save();
    res.status(201).json(newPet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updatePet = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (pet) {
      pet.name = req.body.name || pet.name;
      pet.location = req.body.location || pet.location;
      pet.image = req.body.image || pet.image;
      pet.breed = req.body.breed || pet.breed;
      pet.description = req.body.description || pet.description;

      const updatedPet = await pet.save();
      res.json(updatedPet);
    } else {
      res.status(404).json({ message: 'Pet not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deletePet = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (pet) {
      await pet.remove();
      res.json({ message: 'Pet deleted' });
    } else {
      res.status(404).json({ message: 'Pet not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
