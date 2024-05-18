const bcrypt = require('bcryptjs');
let path = require('path');
let { getUserCredentials } = require('../models/user');


const getUser = async (req, res) => {
    try {
      let email = req.params.email;
      if (!email) {
        return res.status(400).json({ error: 'email is required' });
      }
      const user = await getUserCredentials(email);
      if (user) {
        return res.status(200).json({ user: user });
      } else {
        res.status(404).send('User not found');
      }
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports = { getUser };