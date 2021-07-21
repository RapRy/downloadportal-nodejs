const express = require('express');
const { signUp, register } = require('../controllers/usersController.js');

const router = express.Router();

router.post('/register', register);
router.post('/signup', signUp);

module.exports = router;