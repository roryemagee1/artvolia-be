const HttpError = require('../models/http-error');
const SignUp = require('../models/sign-up');

// const DUMMY_DATA = require('../data/dummy-data');
let DUMMY_DATA = require('../data/dummy-data');

// const DUMMY_DATA = {
//   users: [
//     {
//       id: 'u1',
//       userName: 'SaveJarvis',
//       details: {
//         firstName: 'Jarvis',
//         lastName: 'Considine',
//         email: 'jarvis@considine.com',
//         password: 'test123!',
//         created: Date.now(),
//         status: active
//       },
//       settings: {},
//       posts: [],
//       history: [],
//       loggedIn: true
//     }
//   ]
// }

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

const loginUserByID = (req, res, next) => {
  const userID = req.body.id;
  let updatedUser = { ...DUMMY_DATA.users.find(user => user.id === userID) };
  let userIndex = DUMMY_DATA.users.findIndex(user => user.id === userID);

  if (userIndex === -1) {
    const error = new HttpError('Could not find a user with the given userID', 404);
    return next(error);
  }

  updatedUser.loggedIn = !updatedUser.loggedIn;
  DUMMY_DATA.users[userIndex] = updatedUser;
  console.log(DUMMY_DATA);

  res.json({ updatedUser });
}

const signUpUser = (req, res, next) => {
  const newUser = new SignUp(req.body)
  console.log(newUser);
  DUMMY_DATA.users.push(newUser);
  console.log(DUMMY_DATA);

  res.status(201).json({ newUser });
}

const deleteUser = (req, res, next) => {
  const deleteID = req.params.uid;
  const updatedUsers = DUMMY_DATA.users.filter(user => user.id !== deleteID);
  const deletedUser = { ...DUMMY_DATA.users.find(user => user.id === deleteID) };
  console.log(updatedUsers);
  console.log(deletedUser);
  // DUMMY_DATA[0] = updatedUsers;
  DUMMY_DATA.users = updatedUsers;
  console.log(DUMMY_DATA);

  res.status(200).json({ deletedUser });
}


// module.exports = { getAllUsers, getUserByID, loginUserByID };

exports.getAllUsers = getAllUsers;
exports.getUserByID = getUserByID;
exports.loginUserByID = loginUserByID;
exports.signUpUser = signUpUser;
exports.deleteUser = deleteUser;