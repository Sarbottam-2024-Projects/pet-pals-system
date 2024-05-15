// routers/routers.js
let express = require('express');
let router = express.Router();
let path = require('path');
let { login } = require('../controllers/loginController');
let { signup } = require('../controllers/signupController');
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

router.get('/signup', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'views', 'signup.html'));
});


router.get('/home', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'views', 'index.html'));
});

// Add error handling for route that might not be found
router.get('*', (req, res) => {
  res.status(404).sendFile(path.resolve(__dirname, '..', 'views', '404.html'));
});

// API routes
router.post('/login', login);
router.post('/signup', signup);
router.get('/logout', logout);

module.exports = router;
