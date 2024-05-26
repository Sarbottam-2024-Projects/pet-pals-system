// router.js

const express = require('express');
const router = express.Router();
const path = require('path');
const { authenticateToken } = require('../middleware/authenticateToken');
const { login } = require('../controllers/loginController');
const { register } = require('../controllers/registerController');
const { logout } = require('../controllers/logoutController');
const { getUser } = require('../controllers/getUserController');
const { updateUser } = require('../controllers/updateUserProfileController');
const petController = require('../controllers/petController');

// User Routes
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

router.get('/shelter', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'views', 'shelter.html'));
});

// API routes
router.post('/login', login);
router.post('/register', register);
router.get('/user/:email', getUser)
router.put('/updateUser', updateUser)

// Pet Routes
router.get('/pets', petController.getAllPets);
router.get('/pets/:id', petController.getPetById);
router.post('/pets', petController.createPet);
router.put('/pets/:id', petController.updatePet);
router.delete('/pets/:id', petController.deletePet);

module.exports = router;
