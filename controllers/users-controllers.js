const HttpError = require('../models/http-error');
const SignUp = require('../models/sign-up');

// const DUMMY_DATA = require('../data/dummy-data');
let DUMMY_DATA = require('../data/dummy-data');

    // userID: 'u1',
    // userName: 'SaveJarvis',
    // loggedIn: true,
    // details: {
    //   firstName: 'Jarvis',
    //   lastName: 'Considine',
    //   email: 'jarvis@considine.com',
    //   password: 'Test123!',
    //   created: 1709833769253,
    //   status: "active"
    // },
    // settings: {
    //   privacy: {},
    //   messaging: {},
    //   notifications: {}
    // },
    // posts: [],
    // history: [
    //   {
    //     historyID: 'h' + '1709833769253',
    //     interactionChain: ['u1', 'u1'],
    //     action: 'login',
    //     time: 1709833769253
    //   }
    // ]

const getAllUsers = (req, res, next) => {
  const users = DUMMY_DATA.users;
 
  if (!users) {
    const error = new HttpError('Could not find a user with the given userID', 404);
    return next(error);
  }

  res.json({ users });
}

const getUserByID = (req, res, next) => {
  const userID = req.params.uid;
  const user = DUMMY_DATA.users.find(user => user.id === userID)
 
  if (!user) {
    const error = new HttpError('Could not find a user with the given userID', 404);
    return next(error);
  }

  res.json({ user });

}

const loginUser = (req, res, next) => {
  const userName = req.body.userName;
  const password = req.body.password;

  const user = DUMMY_DATA.users.find(user => user.userName === userName);
  const userIndex = DUMMY_DATA.users.findIndex(user => user.userName === userName);

  if (userIndex === -1 || user.settings.information.password !== password) {
    const error = new HttpError('Could not find a user with the given username and password.', 401);
    return next(error);
  }

  let updatedUser = { ...user };

  updatedUser.loggedIn = !updatedUser.loggedIn;
  DUMMY_DATA.users[userIndex] = updatedUser;

  res.json({ updatedUser });
}

const signUpUser = (req, res, next) => {
  const { email, userName, firstName, lastName, password } = req.body;
  
  const existingUser = DUMMY_DATA.users.find(user => user.userName === userName);
  console.log(existingUser);

  if (existingUser) {
    const error = new HttpError('That username is already in use.', 401);
    return next(error);
  }
  
  const newUser = new SignUp(email, userName, firstName, lastName, password);
  console.log(newUser);
  DUMMY_DATA.users.push(newUser);

  res.status(201).json({ newUser });
}

const deleteUser = (req, res, next) => {
  const deleteID = req.params.uid;
  const updatedUsers = DUMMY_DATA.users.filter(user => user.id !== deleteID);
  const deletedUser = { ...DUMMY_DATA.users.find(user => user.id === deleteID) };

  DUMMY_DATA.users = updatedUsers;

  res.status(200).json({ deletedUser });
}


// module.exports = { getAllUsers, getUserByID, loginUserByID };

exports.getAllUsers = getAllUsers;
exports.getUserByID = getUserByID;
exports.loginUser = loginUser;
exports.signUpUser = signUpUser;
exports.deleteUser = deleteUser;