const SignUp = require('../src/models/sign-up');
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
user2.userID = 'u-2';
user3.userID = 'u-3';
user4.userID = 'u-4';
user4.userID = 'u-4';
user5.userID = 'u-5';
user6.userID = 'u-6';
user7.userID = 'u-7';
user8.userID = 'u-8';
user9.userID = 'u-9';
user10.userID = 'u-10';

const DUMMY_DATA = {
  users: [
    {
      userID: 'u-1',
      userName: 'SaveJarvis',
      loggedIn: true,
      settings: {
        information: {
          firstName: 'Jarvis',
          lastName: 'Considine',
          email: 'jarvis@considine.com',
          password: 'Test123!',
          created: 1709833769253,
          status: 'active'
        },
        privacy: {},
        messaging: {},
        notifications: {}
      },
      posts: [
        {
          postID: 'p-baa98b89-11d1-41a0-9d80-d3a817532f88',
          postVisibility: 'public',
          postStatus: 'active',
          imgSrc: './butterfly.png',
          imgAlt: 'Butterfly',
          imgHeight: '300px',
          postText: 'This is a post about a butterfly.',
          postLikes: 17,
          postComments: [
            {
              otherUserID: 'u-3', // otherUserID === userID of commenter.
              commentID: 'c-3adbbc8f-c307-4266-ad5d-50bebced7310',
              commentStatus: 'active',
              commentText: 'This is a comment.',
              commentLikes: 1,
              commentReplies: [
                {
                  otherUserID: 'u-2',
                  replyID: 'r-3b2d9370-4dab-4cae-849e-9f9c0a3fd7a6',
                  replyStatus: 'active',
                  replytext: 'This is a reply.',
                  replyLikes: 0
                }
              ]
            } 
          ]
        }
      ],
      history: [
        {
          historyID: 'h-0aebca0e-26a8-4a90-87ef-98abbe2e31f6',
          interactionChain: ['u-1', 'u-1'],
          action: 'login',
          time: 1709833769253
        },
        {
          historyID: 'h-2f9f563c-24eb-4732-a82e-67e6116757d6',
          interactionChain: ['u-2', 'u-1', 'p-baa98b89-11d1-41a0-9d80-d3a817532f88'],
          action: 'reply',
          time: 1709933911518
        },
        {
          historyID: 'h-1ff20512-f6ed-40a3-8bda-cd1ff683bff3',
          interactionChain: ['u-2', 'u-1', 'p-baa98b89-11d1-41a0-9d80-d3a817532f88', 'c-3adbbc8f-c307-4266-ad5d-50bebced7310'],
          action: 'reply',
          time: 1709933911519
        },
        {
          historyID: 'h-f823e122-e2c5-4b92-9a9a-450689b523fb',
          interactionChain: ['u-2', 'u-1', 'p-baa98b89-11d1-41a0-9d80-d3a817532f88', 'c-3adbbc8f-c307-4266-ad5d-50bebced7310', 'r-3b2d9370-4dab-4cae-849e-9f9c0a3fd7a6'],
          action: 'reply',
          time: 1709933911522
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