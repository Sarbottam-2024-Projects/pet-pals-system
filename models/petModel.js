const { client } = require('../dbConnection.js');
const petCollection = client.db("TestDB").collection("pets");

const addPetRequest = async (petDetails) => {
    try {
        await client.connect();
        let newPet = {
            ...petDetails,
            creation_date: new Date(),
        };

        let result = await petCollection.insertOne(newPet);
        return result;
    } catch (error) {
        throw error;
    }
};


// Function to get all watches and sending them into api/items routes
async function getPetItems(req, res) {
    try {
        await client.connect();
        let data = await petCollection.find({}).toArray();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    addPetRequest,
    getPetItems
};
