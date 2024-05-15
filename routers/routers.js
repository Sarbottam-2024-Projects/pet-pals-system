// routers/routers.js
let express = require('express');
let router = express.Router();
let path = require('path');
let { login } = require('../controllers/loginController');
let { register } = require('../controllers/registerController');
let { logout } = require('../controllers/logoutController');

router.get('/', (req, res) => {
  res.redirect('/login');
});

router.get('/login', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'views', 'login.html'));
});

router.get('/logout', (req, res) => {
  res.redirect('/login');
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

// Add error handling for route that might not be found
router.get('*', (req, res) => {
  res.status(404).sendFile(path.resolve(__dirname, '..', 'views', '404.html'));
});

// API routes
router.post('/login', login);
router.post('/register', register);
router.get('/logout', logout);

module.exports = router;
