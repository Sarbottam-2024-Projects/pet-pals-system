
// Controller For User Model
let path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
let { getUserCredentials } = require('../models/user');


const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ error: 'email and password are required' });
    }
    const user = await getUserCredentials(email, password);
    if (!user || user.length === 0) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    return res.status(200).json({ 
      email: email,
      token: jwt.sign(email, process.env.JWT_TOKEN)
    });

  } catch (error) {
    console.error('Error logging in:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { login };