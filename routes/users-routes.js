const express = require('express');
const { check } = require('express-validator');

const router = express.Router();

// const { getAllUsers, getUserByID, loginUserByID }= require('../controllers/users-controllers');
const usersControllers = require('../controllers/users-controllers');

// User & Profile Routes
router.get('/users', usersControllers.getAllUsers);

router.get('/users/:uid', usersControllers.getUserByID);

// router.get('/profile/:uid); // Will get a certain user's profile.
// router.patch('/profile/:uid/update); // Will allow a user to update their profile.
// router.get('/public/profile/:uid); // Will get a certain user's public profile if it is available.

// Auth Routes
router.patch('/login', usersControllers.loginUser);

router.post(
  '/sign-up', 
  [ 
    check(['email', 'userName', 'firstName', 'lastName', 'password'])
      .not()
      .isEmpty(),
    check('email')
      .normalizeEmail()
      .isEmail(),
    check('password')
      .isLength({ min: 5 })
  ],
  usersControllers.signUpUser
);

// Feed Routes
// router.get('/feed'); // Will retrieve a list of all posts.
// router.get('/feed?num=16&index=0'); // Will retrieve the 16 posts found startings at index 0, which are the 16 most recent posts.
// router.get('/feed?num=16&index=0/filter?'); // Will give the user options for searches and filters.
// router.get('/public/feed); // Will retrieve a list of public only posts.

// Posts Routes
// router.post('/posts/:uid/post); // Will create a post.
// router.get('/posts/:uid/:pid); // Will return the user's post with that postID along with comment data, etc.
// // router.put('/posts/:uid/:pid); // Will edit a post.
// router.patch('/posts/:uid/:pid); // Will like a post.
// router.delete('/posts/:uid/:pid); // Will delete a post.
// router.patch('/posts/:uid/:pid/settings) // Will modify the settings for a specific post.

// router.post('/posts/:uid/:pid/comment'); // Will create a new comment.
// // router.get('/posts/:uid/:pid/:cid): // Will get a specific comment.
// // router.put('/posts/:uid/:pid/:cid); // Will edit a comment.
// router.patch('/posts/:uid/:pid/:cid'): // Will like a comment.
// router.delete('/posts/:uid/:pid/:cid'): // Will delete a comment.

// router.post('/posts/:uid/:pid/:cid/reply'): // Will create a new reply.
// // router.get('/posts/:uid/:pid/:cid/:rid'): // Will get a specific reply.
// // router.put('/posts/:uid/:pid/:cid/:rid'): // Will edit a reply.
// router.patch('/posts/:uid/:pid/:cid/:rid'): // Will like a reply.
// router.delete('/posts/:uid/:pid/:cid/:rid'): // Will delete a reply.
// Note: the PUT route will be reserved for the possibility of editting text in the future.

// Settings Routes
router.delete('/users/user/:uid', usersControllers.deleteUser); // This will be refactored to a new controller.

// router.get('/settings/:uid'); // This will get the current user's settings.
// router.patch('/settings/:uid/:option); // This will update the the setting specified at the end of the URL.


module.exports = router;