const express = require('express');
const { check } = require('express-validator');

const usersController = require('../controllers/users-controller');

const router = express.Router();


router.get('/', usersController.getUsers);

router.get('/:uid', usersController.getUserById);

router.post(
  '/signup',
  [
    check('userName')
      .not()
      .isEmpty(),
    check('firstName')
      .not()
      .isEmpty(),
    check('lastName')
      .not()
      .isEmpty(),
    check('email')
      .normalizeEmail()
      .isEmail()
      .not()
      .isEmpty(),
    check('password')
      .isLength({ min: 6 })
  ], 
  usersController.signup);

router.patch('/login', usersController.login);

router.patch('/logout', usersController.logout);


module.exports = router;