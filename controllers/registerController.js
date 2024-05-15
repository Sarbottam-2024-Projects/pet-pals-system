const bcrypt = require('bcryptjs');
let path = require('path');
let { getUserCredentials, addUser } = require('../models/user');


const register = async (req, res) => {
    const { full_name, email, password, contact_number } = req.body;

    try {
        if (!email || !password || !contact_number) {
            return res.status(400).json({ error: 'email, password and contact number are required' });
        }

        const userExists = await getUserCredentials(email);

        if (userExists) {
          return res.status(400).json({ errors: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await addUser(full_name, email, hashedPassword, contact_number)

        return res.status(201).json({ message: email });

    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports = { register };