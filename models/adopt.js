const { client } = require('../dbConnection.js');

let applicationCollection = client.db("TestDB").collection("application");

const addApplication = async (form) => {
  try {
    let result = await applicationCollection.insertOne(form);
    return result;
  } catch (error) {
      throw error;
  }
};


// Function to get all pets
async function getAllApplication() {
  return await applicationCollection.find({}).toArray();
}


module.exports = { addApplication, getAllApplication };
