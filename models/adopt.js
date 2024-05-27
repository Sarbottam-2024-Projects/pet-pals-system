const { client } = require('../dbConnection.js');

const addApplication = async (form) => {
  try {
    await client.connect();
    let collection = client.db("TestDB").collection("application");
    let result = await collection.insertOne(form);
    return result;
  } catch (error) {
      throw error;
  }
};

module.exports = { addApplication };
