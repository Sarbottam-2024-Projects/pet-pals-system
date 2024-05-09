let express = require('express');
let router = express.Router();
let userController = require('../controllers/userController');

// defining route for user request
router.get('/', userController.getUsers);

module.exports = router;    