const express = require('express');

const usersController = require('../controllers/users-controller');

const router = express.Router();


router.get('/', usersController.getUsers);

router.get('/:uid', usersController.getUserById);

// router.post('/signup', console.log("Sign-up requested!"));

// router.post('/login', console.log("Login requested!"));


module.exports = router;