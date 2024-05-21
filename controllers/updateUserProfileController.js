
// Controller For User Model
let path = require('path');
const bcrypt = require('bcryptjs');
let { getUserCredentials, updateUserProfile } = require('../models/user');

const updateUser = async (req, res) => {
  try {
    if (!req.body.email) {
      return res.status(400).send('email is required');
    }

    const result = await updateUserProfile(
      req.body.email || undefined,
      req.body.full_name|| undefined,
      req.body.contact_number|| undefined,
      req.body.address|| undefined, 
      req.body.state || undefined, 
      req.body.profile_description|| undefined
    )

    res.status(200).json({
      email: req.body.email,
      result: result
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { updateUser };