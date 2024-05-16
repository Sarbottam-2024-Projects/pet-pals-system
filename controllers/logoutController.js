
// Controller For User Model
// let path = require('path');
// const bcrypt = require('bcryptjs');
// let { getUserCredentials } = require('../models/user');

const logout = async (req, res) => {
  try {

    // todo remove session token
    console.log("LOGOUT")
    return res.status(200).json({ message: "success" });

  } catch (error) {
    console.error('Error logging out:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { logout };