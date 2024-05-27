let { addApplication, getAllApplication, getApplicationById, applicationCollection } = require('../models/adopt');

let lastApplicationId = 0;



const addAdoptApplication = async (req, res) => {

  try {
    lastApplicationId++; 
    const applicationId = lastApplicationId; 

    let applicationForm = {
      id: applicationId,
      full_name: req.body.full_name,
      address: req.body.address,
      phone: req.body.phone,
      email: req.body.email,
      occupation: req.body.occupation,
      have_pets: req.body.have_pets,
      adults: req.body.adults,
      children: req.body.children,
      agreement: req.body.agreement,
      home_type: req.body.home_type,
      home_description: req.body.home_description,
      pet_id: req.body.pet_id,
      status: 'Pending'
    }

    let result = await addApplication(applicationForm);
    if (result) {
      return res.status(200).json({
        pet_id: applicationForm.pet_id,
      });
    } else {
      return res.status(400).json({ error: 'Failed submitting Application' });
    }

  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Function to get all pets
async function getApplicationItems(req, res) {
  try {
      const data = await getAllApplication();
      res.json(data);
  } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
  }
}


async function getSingleApplication(req, res) {
  const applicationId = req.params.id; 
  try {
      const application = await getApplicationById(applicationId);
      if (!application) {
          return res.status(404).send('application not found');
      }
      res.json(application);
  } catch (err) {
      console.error(err);
  }
}

async function updateApplicationStatus(req, res) {
  const applicationId = parseInt(req.params.id);
  const updatedStatus = req.body.status;

  try {
    const result = await applicationCollection.updateOne(
      { id: applicationId },
      { $set: { status: updatedStatus } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Application not found' });
    }

    const updatedApplication = await getApplicationById(applicationId);
    res.status(200).json(updatedApplication);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}



module.exports = { addAdoptApplication, getApplicationItems, getSingleApplication, updateApplicationStatus };