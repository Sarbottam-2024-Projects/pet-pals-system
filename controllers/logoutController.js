
// Controller For User Model
// let path = require('path');
// const bcrypt = require('bcryptjs');
// let { getUserCredentials } = require('../models/user');

const logout = async (req, res) => {
  // const { email } = req.body;
  try {
    // if (!email) {
    //   return res.status(400).json({ error: 'email is required' });
    // }
    // const user = await getUserCredentials(email);
    // if (!user || user.length === 0) {
    //     return res.status(401).json({ error: 'Invalid username' });
    // }

    // todo remove session token

    // return res.sendFile(path.resolve(__dirname, '..', 'views', 'login.html'));
    return res.status(200).json({ message: "success" });;

  } catch (error) {
    console.error('Error logging out:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { logout };