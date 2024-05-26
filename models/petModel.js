const { client } = require('../dbConnection.js');

const addPetRequest = async (petDetails) => {
    try {
        await client.connect();
        const collection = client.db("TestDB").collection("pets");

        let newPet = {
            ...petDetails,
            creation_date: new Date(),
        };

        let result = await collection.insertOne(newPet);
        return result;
    } catch (error) {
        throw error;
    } finally {
        await client.close();
    }
};

module.exports = {
    addPetRequest,
};
