const { client } = require('../dbConnection.js');

const petCollection = client.db("TestDB").collection("pets");

// Function to insert a new pet
async function insertPet(petData) {
    // https://www.mongodb.com/docs/manual/reference/method/db.collection.countDocuments/
    const petCount = await petCollection.countDocuments();
    const petId = petCount + 1;
    const petWithId = { ...petData, id: petId };
    return await petCollection.insertOne(petWithId);
}

// Function to get all pets
async function getAllPets() {
    return await petCollection.find({}).toArray();
}

async function getPetById(id) {
    // Reference https://www.mongodb.com/docs/manual/reference/method/db.collection.findOne/
    return await petCollection.findOne({ id: parseInt(id) });
}

module.exports = {
    insertPet,
    getAllPets,
    getPetById
};
