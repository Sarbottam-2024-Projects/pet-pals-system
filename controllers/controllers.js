
// Controller For User Model
let userModel = require('../models/user');

function login(req, res) {
    let { email, password } = req.body;
    let users = userModel.getAllUsers();
    let user = users.find(user => user.email === email && user.password === password);
    if (user) {
        res.redirect('/home');
    } else {
        res.send('Login Failed');
    }
}

module.exports = { login };