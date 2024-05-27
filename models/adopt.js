const { client } = require('../dbConnection.js');

let applicationCollection = client.db("TestDB").collection("application");

// const addApplication = async (form) => {
//   try {
//     let result = await applicationCollection.insertOne(form);
//     return result;
//   } catch (error) {
//       throw error;
//   }
// };


async function addApplication(applicationData) {
  const applicationCount = await applicationCollection.countDocuments();
  const applicationId = applicationCount + 1;
  const applicationWithId = { ...applicationData, id: applicationId };
  return await applicationCollection.insertOne(applicationWithId);
}





// Function to get all pets
async function getAllApplication() {
  return await applicationCollection.find({}).toArray();
}

async function getApplicationById(id) {
  return await applicationCollection.findOne({ id: parseInt(id) });
}


module.exports = { addApplication, getAllApplication, getApplicationById, applicationCollection };
