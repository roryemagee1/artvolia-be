const HttpError = require('../models/http-error');
const DUMMY_DATA = require('../data/dummy-data');
const uuid = require('uuid');
const SignUp = require('../models/sign-up');

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

const signup = (req, res, next) => {
  const { email, userName, firstName, lastName, password } = req.body;
  const newUser = new SignUp(email, userName, firstName, lastName, password);
  DUMMY_DATA.users.push(newUser);

  return res.status(201).json({ newUser: newUser });
};

const login = (req, res, next) => {
  const { userName, password } = req.body;

  let user = DUMMY_DATA.users.find(user => user.userName === userName);

  if (!user || user.settings.information.password !== password) {
    const error = new HttpError("No user with that username and password combination was found.", 404);
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
    console.log(DUMMY_DATA);
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