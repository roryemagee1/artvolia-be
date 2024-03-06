const express = require('express');

const HttpError = require('../model/http-error');

const router = express.Router();

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
//       history: []
//     }
//   ]
// }


router.get('/user/:uid', (req, res, next) => {
  const userID = req.params.uid;
  const user = DUMMY_DATA.users.find(user => user.id === userID)
  console.log('GET Request in Users');
 

  if (!user) {
    const error = new HttpError('Could not find a user with the given userID', 404);
    return next(error);
  }

  res.json({ user });
})

module.exports = router;