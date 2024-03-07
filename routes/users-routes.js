const express = require('express');

const router = express.Router();

// const { getAllUsers, getUserByID, loginUserByID }= require('../controllers/users-controllers');
const usersControllers = require('../controllers/users-controllers');

// User & Profile Routes
router.get('users/all', usersControllers.getAllUsers);

router.get('users/user/:uid', usersControllers.getUserByID);

// Auth Routes
router.patch('/login', usersControllers.loginUserByID);

router.post('/sign-up', usersControllers.signUpUser);

// Feed Routes
// router.get('/feed', 'function'); Will retrieve a list of all posts.
// router.get('/feed?num=16&index=0'); Will retrieve the 16 posts found startings at index 0, which are the 16 most recent posts.
// router.get('/feed?num=16&index=0/filter?'); Will give the user options for searches and filters.
// router.get('public/feed', 'function'); Will retrieve a list of public only posts.

// Posts Routes

// Settings Routes
router.delete('users/user/:uid', usersControllers.deleteUser);





module.exports = router;