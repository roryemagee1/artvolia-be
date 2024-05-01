const HttpError = require('../models/http-error');
const DUMMY_DATA = require('../data/dummy-data');
const uuid = require('uuid');
const SignUp = require('../models/sign-up');
const { validationResult } = require('express-validator');
const User = require('../models/user');

const getUsers = (req, res, next) => {
  const users = DUMMY_DATA.users;
  
  if (!users) {
    return next(new HttpError("Requested data not available.", 404));
  }

  res.status(200).json({users: users});
}

const getUserById = (req, res, next) => {
  const userID = req.params.uid;
  const user = DUMMY_DATA.users.find(user => user.userID === userID);
  
  if (!user) {
    return next(new HttpError("Could not find a user with the provided user ID.", 404));
  }

  res.json({userName: `${user.userName}`});
}

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError(`Invalid ${errors.errors[0].path} value.`, 422));
  }

  const { email, userName, firstName, lastName, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ userName: userName })
  } catch(err) {
    const error = new HttpError("Signing up failed.  Please try again later.", 500);
    return next(error);
  } 

  if (existingUser) {
    const error = new HttpError("Username already exists.", 422);
    return next(error);
  }

  const createdUser = new User({
    userID: "u" + uuid.v4(),
    userName,
    email,
    firstName,
    lastName,
    password,
    profileImage: "../data/butterfly.png",
    profileStatus: "active",
    created: Date.now(),
    posts: "posts",
    loggedIn: true
  });

  try {
    await createdUser.save();
  } catch(err) {
    const error = new HttpError("Signing up failed. Please try again later.", 500);
    return next(error);
  }
  
  res.status(201).json({ newUser: createdUser.toObject({ getters: true })});
};

// const signup = (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return next(new HttpError(`Invalid ${errors.errors[0].path} value.`, 422));
//   }

//   const { email, userName, firstName, lastName, password } = req.body;
//   const user = DUMMY_DATA.users.find(user => user.userName === userName);

//   if (user) {
//     const error = new HttpError("The provided username is already in use.", 422);
//     return next(error);
//   }

//   const newUser = new SignUp(email, userName, firstName, lastName, password);
//   DUMMY_DATA.users.push(newUser);

//   return res.status(201).json({ newUser: newUser });
// };

const login = (req, res, next) => {
  const { userName, password } = req.body;

  let user = DUMMY_DATA.users.find(user => user.userName === userName);

  if (!user || user.settings.information.password !== password) {
    const error = new HttpError("No user with that username and password combination was found.", 401);
    return next(error);
  }

    DUMMY_DATA.users.map(user => {
      if (user.userName === userName) {
        user.loggedIn = true;
        return user;
      }
      return user;
    });
    return res.status(200).json({ 
      message: "Login successful!",
      login: user.loggedIn
      });
};

const logout = (req, res, next) => {
  const { userName } = req.body;

  let user = DUMMY_DATA.users.find(user => user.userName === userName);

  if (!user ) {
    const error = new HttpError("An unknown error has occurred.", 404);
    return next(error);
  }

  user.loggedIn = false;

  DUMMY_DATA.users.map(user => {
    if (user.userName === userName) {
      user.loggedIn = false
      return user;
    }
    return user;
  });
  return res.status(200).json({ 
    message: "Logout successful!",
    login: user.loggedIn
    });
};

exports.getUsers = getUsers;
exports.getUserById = getUserById;
exports.signup = signup;
exports.login = login;
exports.logout = logout;