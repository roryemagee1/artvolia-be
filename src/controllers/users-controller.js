const HttpError = require('../models/http-error');
const DUMMY_DATA = require('../data/dummy-data');
const uuid = require('uuid');
const SignUp = require('../models/sign-up');
const { validationResult } = require('express-validator');
const User = require('../models/user');

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (err) {
    const error = new HttpError("Fetching users failed. Please try again later.", 500);
    return next(error);
  }
  
  if (!users) {
    return next(new HttpError("Requested data not available.", 404));
  }

  res.status(200).json({ users: users.map(user => user.toObject({ getters: true })) });
}

// const getUsers = (req, res, next) => {
//   const users = DUMMY_DATA.users;
  
//   if (!users) {
//     return next(new HttpError("Requested data not available.", 404));
//   }

//   res.status(200).json({users: users});
// }

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
  } catch (err) {
    const error = new HttpError("Signing up failed.  Please try again later.", 500);
    return next(error);
  } 

  if (existingUser) {
    const error = new HttpError("Username already exists.", 422);
    return next(error);
  }

  const createdUser = new User({
    userID: "u-" + uuid.v4(),
    userName,
    email,
    firstName,
    lastName,
    password,
    profileImage: "../data/butterfly.png",
    profileStatus: "active",
    created: Date.now(),
    posts: [],
    loggedIn: true
  });

  try {
    await createdUser.save();
  } catch (err) {
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

const login = async (req, res, next) => {
  const { userName, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ userName: userName })
  } catch (err) {
    const error = new HttpError("Login failed. Please try again later.", 500);
    return next(error);
  }

  if (!existingUser || existingUser.password !== password) {
    const error = new HttpError("Invalid credentials. Could not log in.", 401);
    return next(error);
  }
  
  existingUser.loggedIn = true;

  try {
    await existingUser.save();
  } catch(err) {
    const error = new HttpError("Something went wrong. Could not log in.", 500);
    return next(error);
  }
    
  res.status(200).json({ 
    message: "Login successful!",
    loginStatus: existingUser.toObject({ getters: true }).loggedIn
  });
};

// const login = (req, res, next) => {
//   const { userName, password } = req.body;

//   let user = DUMMY_DATA.users.find(user => user.userName === userName);

//   if (!user || user.settings.information.password !== password) {
//     const error = new HttpError("No user with that username and password combination was found.", 401);
//     return next(error);
//   }

//     DUMMY_DATA.users.map(user => {
//       if (user.userName === userName) {
//         user.loggedIn = true;
//         return user;
//       }
//       return user;
//     });
//     return res.status(200).json({ 
//       message: "Login successful!",
//       login: user.loggedIn
//     });
// };

const logout = async (req, res, next) => {
  const { userName } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ userName: userName })
  } catch (err) {
    const error = new HttpError("Logout failed. Please try again later.", 500);
    return next(error);
  }
  
  existingUser.loggedIn = false;

  try {
    await existingUser.save();
  } catch (err) {
    const error = new HttpError("Something went wrong. Could not logout.", 500);
    return next(error);
  }
    
  res.status(200).json({ 
    message: "Logout successful!",
    loginStatus: existingUser.toObject({ getters: true }).loggedIn
  });
};

// const logout = (req, res, next) => {
//   const { userName } = req.body;

//   let user = DUMMY_DATA.users.find(user => user.userName === userName);

//   if (!user ) {
//     const error = new HttpError("An unknown error has occurred.", 404);
//     return next(error);
//   }

//   user.loggedIn = false;

//   DUMMY_DATA.users.map(user => {
//     if (user.userName === userName) {
//       user.loggedIn = false
//       return user;
//     }
//     return user;
//   });
//   return res.status(200).json({ 
//     message: "Logout successful!",
//     login: user.loggedIn
//     });
// };

exports.getUsers = getUsers;
exports.getUserById = getUserById;
exports.signup = signup;
exports.login = login;
exports.logout = logout;