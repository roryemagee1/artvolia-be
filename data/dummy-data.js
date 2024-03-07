const SignUp = require('../models/sign-up');
// { email, userName, firstName, lastName, password }

const user2 = new SignUp('bob@smith.com', 'BobSmith', 'Bob', 'Smith');
const user3 = new SignUp('jane@anderson.com', 'JaneAnderson', 'Jane', 'Anderson');
const user4 = new SignUp('eric@larson.com', 'EricLarson', 'Eric', 'Larson');
const user5 = new SignUp('david@bergman.com', 'DavidBergman', 'David', 'Bergman');
const user6 = new SignUp('brigid@magee.com', 'BrigidMagee', 'Brigid', 'Magee');
const user7 = new SignUp('flash@mccritter', 'FlashMcCritter', 'Flash', 'McCritter');
const user8 = new SignUp('anderson@paak.com', 'AndersonPaak', 'Anderson', 'Paak');
const user9 = new SignUp('bob@dylan.com', 'BobDylan', 'Bob', 'Dylan');
const user10 = new SignUp('dillon@francis.com', 'DillonFrancis', 'Dillon', 'Francis');
user2.userID = 'u2';
user3.userID = 'u3';
user4.userID = 'u4';
user4.userID = 'u4';
user5.userID = 'u5';
user6.userID = 'u6';
user7.userID = 'u7';
user8.userID = 'u8';
user9.userID = 'u9';
user10.userID = 'u10';

const DUMMY_DATA = {
  users: [
    {
      userID: 'u1',
      userName: 'SaveJarvis',
      loggedIn: true,
      settings: {
        information: {
          firstName: 'Jarvis',
          lastName: 'Considine',
          email: 'jarvis@considine.com',
          password: 'Test123!',
          created: 1709833769253,
          status: "active"
        },
        privacy: {},
        messaging: {},
        notifications: {}
      },
      posts: [],
      history: [
        {
          historyID: 'h' + '1709833769253',
          interactionChain: ['u1', 'u1'],
          action: 'login',
          time: 1709833769253
        }
      ],
    },
    user2,
    user3,
    user4,
    user5,
    user6,
    user7,
    user8,
    user9,
    user10
  ]
};

module.exports = DUMMY_DATA;

// const DUMMY_DATA = {
//   users: [
//     {
//       userID: 'u1',
//       userName: 'SaveJarvis',
//       details: {
//         firstName: 'Jarvis',
//         lastName: 'Considine',
//         email: 'jarvis@considine.com',
//         password: 'Test123!',
//         created: Date.now(),
//         status: "active"
//       },
//       settings: {
//         privacy: {},
//         messaging: {},
//         notifications: {}
//       },
//       posts: [],
//       history: [
//         {
//           action: 'login',
//           time: 1709833769253
//         }
//       ],
//       loggedIn: true
//     },
//     {
//       userID: 'u2',
//       userName: 'BobSmith',
//       details: {
//         firstName: 'Bob',
//         lastName: 'Smith',
//         email: 'bob@smith.com',
//         password: 'test123!',
//         created: Date.now(),
//         status: active
//       },
//       settings: {},
//       posts: [],
//       history: [],
//       loggedIn: false
//     },
//    {
//       userID: 'u3',
//       userName: 'JaneAnderson',
//       details: {
//         firstName: 'Jane',
//         lastName: 'Anderson',
//         email: 'jane@anderson.com',
//         password: 'test123!',
//         created: Date.now(),
//         status: active
//       },
//       settings: {},
//       posts: [],
//       history: [],
//       loggedIn: false
//     },
//     {
//       userID: 'u4',
//       userName: 'EricLarson',
//       details: {
//         firstName: 'Eric',
//         lastName: 'Larson',
//         email: 'eric@larson.com',
//         password: 'test123!',
//         created: Date.now(),
//         status: active
//       },
//       settings: {},
//       posts: [],
//       history: [],
//       loggedIn: false
//     },
//     {
//       userID: 'u5',
//       userName: 'DavidBergman',
//       details: {
//         firstName: 'David',
//         lastName: 'Bergman',
//         email: 'david@bergman.com',
//         password: 'test123!',
//         created: Date.now(),
//         status: active
//       },
//       settings: {},
//       posts: [],
//       history: [],
//       loggedIn: false
//     },
//     {
//       userID: 'u6',
//       userName: 'BrigidMagee',
//       details: {
//         firstName: 'Brigid',
//         lastName: 'Magee',
//         email: 'brigid@magee.com',
//         password: 'test123!',
//         created: Date.now(),
//         status: active
//       },
//       settings: {},
//       posts: [],
//       history: [],
//       loggedIn: false
//     },
//     {
//       userID: 'u7',
//       userName: 'FlashKolorkin',
//       details: {
//         firstName: 'Flash',
//         lastName: 'Kolorkin',
//         email: 'flash@kolorkin.com',
//         password: 'test123!',
//         created: Date.now(),
//         status: active
//       },
//       settings: {},
//       posts: [],
//       history: [],
//       loggedIn: false
//     }
//   ],
//   general: {
//     things: 'stuff'
//   } 
// }
