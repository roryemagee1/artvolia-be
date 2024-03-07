const HttpError = require('../models/http-error');
const SignUp = require('../models/sign-up');

const DUMMY_DATA = require('../data/dummy-data');

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
//         created: Date.now()
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
  let user = DUMMY_DATA.users.find(user => user.id === userID);
  user.loggedIn = !user.loggedIn;

  if (!user) {
    const error = new HttpError('Could not find a user with the given userID', 404);
    return next(error);
  }

  res.json({ user });
}

const signUpUser = (req, res, next) => {
  const newUser = new SignUp(req.body)
  console.log(newUser);
  DUMMY_DATA.users.push(newUser);
  console.log(DUMMY_DATA);

  res.status(201).json({ newUser });
}


// module.exports = { getAllUsers, getUserByID, loginUserByID };

exports.getAllUsers = getAllUsers;
exports.getUserByID = getUserByID;
exports.loginUserByID = loginUserByID;
exports.signUpUser = signUpUser;