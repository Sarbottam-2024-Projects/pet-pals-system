const { client } = require('../dbConnection.js');

const petCollection = client.db("TestDB").collection("pets");

// Function to insert a new pet
async function insertPet(petData) {
    return await petCollection.insertOne(petData);
}

// Function to get all pets
async function getAllPets() {
    return await petCollection.find({}).toArray();
}

module.exports = {
    insertPet,
    getAllPets
};
