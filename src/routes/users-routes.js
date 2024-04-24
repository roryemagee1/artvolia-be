const express = require('express');

const usersController = require('../controllers/users-controller');

const router = express.Router();


router.get('/', usersController.getUsers);

router.get('/:uid', usersController.getUserById);

router.post('/signup', usersController.signup);

router.post('/login', usersController.login);

router.post('/logout', usersController.logout);


module.exports = router;