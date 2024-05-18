// routers/routers.js
let express = require('express');
let router = express.Router();
let path = require('path');
let { authenticateToken } = require('../middleware/authenticateToken');
let { login } = require('../controllers/loginController');
let { register } = require('../controllers/registerController');
let { logout } = require('../controllers/logoutController');
let { getUser } = require('../controllers/getUserController');
let { updateUser } = require('../controllers/updateUserProfileController');

router.get('/', (req, res) => {
  res.redirect('/login');
});

router.get('/login', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'views', 'login.html'));
});

router.get('/logout', (req, res) => {
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

// API routes
router.post('/login', login);
router.post('/register', register);
router.get('/user/:email', getUser)
router.put('/updateUser', updateUser)

module.exports = router;
