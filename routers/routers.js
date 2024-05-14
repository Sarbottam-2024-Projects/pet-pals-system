// routers/routers.js
let express = require('express');
let router = express.Router();
let path = require('path');
let controller = require('../controllers/controllers')

router.get('/', (req, res) => {
    res.redirect('/login');
});

router.get('/login', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'views', 'login.html'));
});

router.get('/home', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'views', 'index.html'));
});

router.get('/pets', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'views', 'pets.html'));
});

router.get('/profile', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'views', 'profile.html'));
});

router.get('/register', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'views', 'register.html'));
});

// POST request for login
router.post('/login', controller.login);

module.exports = router;
