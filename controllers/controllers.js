let userModel = require('../models/user');

function getUsers(req, res) {
    let users = userModel.getAllUsers();
    res.json(users);
}

module.exports = { getUsers };