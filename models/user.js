const { client } = require('../dbConnection.js');

const getUserCredentials = async (email) => {
  try {
    let query = { email: email};
    await client.connect();
    let collection = client.db("TestDB").collection("users");
    let result = await collection.findOne(query);
    return result;
  } catch (error) {
    throw error;
  } finally {
    client.close()
  }
};



const addUser = async (full_name, email, password, contact_number, role) => {
  try {
    await client.connect();
    let collection = client.db("TestDB").collection("users");

    let newUser = { 
      full_name: full_name,
      email: email,
      password: password, 
      contact_number: contact_number,
      creation_date: new Date(),
      role: role
    };
    let result = await collection.insertOne(newUser);
    return result;
  } catch (error) {
      throw error;
  }
};

const updateUserProfile = async (email, full_name, contact_number, address, state, profile_description) => {
  try {
    let attributes = {};
    attributes['full_name'] = full_name || undefined;
    attributes['contact_number'] = contact_number || undefined;
    attributes['address'] = address || undefined;
    attributes['state'] = state || undefined;
    attributes['profile_description'] = profile_description || undefined;

    await client.connect();
    let collection = client.db("TestDB").collection("users");

    let result = await collection.updateOne(
      { email: email},
      { $set: attributes}
    );
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = { 
  getUserCredentials,
  addUser,
  updateUserProfile
};