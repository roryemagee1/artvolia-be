const express = require('express');

const router = express.Router();

// const { getAllUsers, getUserByID, loginUserByID }= require('../controllers/users-controllers');
const usersControllers = require('../controllers/users-controllers');


router.get('/all', usersControllers.getAllUsers);

router.get('/user/:uid', usersControllers.getUserByID);

router.patch('/login', usersControllers.loginUserByID);

router.post('/sign-up', usersControllers.signUpUser);

router.delete('/user/:uid', usersControllers.deleteUser);

module.exports = router;