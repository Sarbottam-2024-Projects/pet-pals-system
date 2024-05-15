const { client } = require('../dbConnection.js');

const getUserCredentials = async (email) => {
  try {
    let query = { email: email};
    await client.connect();
    let collection = await client.db("TestDB").collection("users");
    let result = await collection.findOne(query);
    return result;
  } catch (error) {
    throw error;
  } finally {
    client.close()
  }
}


const addUser = async (email, password, contact_number) => {
  try {
    await client.connect();
    let collection = client.db("TestDB").collection("users");

    let newUser = { 
      email: email,
      password: password, 
      contact_number: contact_number,
      creation_date: new Date()
    };
    let result = await collection.insertOne(newUser);
    return result;
  } catch (error) {
      throw error;
  }
}


module.exports = { 
  getUserCredentials,
  addUser
};