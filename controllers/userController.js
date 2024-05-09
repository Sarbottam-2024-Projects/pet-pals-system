// userController.js

let userModel = require('../models/userModel');

function getUsers(req, res) {
    let users = userModel.getAllUsers();
    res.json(users);
}

module.exports = { getUsers };
