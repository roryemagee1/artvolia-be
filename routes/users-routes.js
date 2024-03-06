const express = require('express');

const router = express.Router();

const DUMMY_USERS = [
  {
    id: 'u1',
    userName: 'SaveJarvis',
    details: {
      firstName: 'Jarvis',
      lastName: 'Considine',
      email: 'jarvis@considine.com',
      password: 'test123!',
      created: Date.now()
    },
    settings: {},
    posts: [],
    history: []
  }
]

router.get('/user/:uid', (req, res, next) => {
  const userID = req.params.uid;
  const user = DUMMY_USERS.find(user => user.id === userID)
  console.log('GET Request in Users');
  res.json({ user });
})

module.exports = router;