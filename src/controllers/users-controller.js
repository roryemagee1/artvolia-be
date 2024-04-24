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
  console.log(DUMMY_DATA);

  return res.status(201).json({ newUser: newUser });
};

const login = (req, res, next) => {
  next();
};

exports.getUsers = getUsers;
exports.getUserById = getUserById;
exports.signup = signup;
exports.login = login;