const uuid = require('uuid');

class SignUp {
  constructor({ email, userName, firstName, lastName, password }) {
    this.userID = 'u' + uuid.v4();
    this.userName = userName;
    this.loggedIn = true;
    this.details = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      created: Date.now()
    };
    this.settings = {
      privacy: {
        profileVisibility: 'public',
        postVisibilityDefault: 'public',
        blockList: []
      },
      messaging: {},
      notifications: {
        login: true,
        profileViews: true,
        posts: true,
        comments: true,
        replies: true,
      },
    };
    this.posts = [];
    this.history = [
      {
        historyID: 'h' + uuid.v4(),
        interactionChain: ['userID', 'otherUserID', 'postID', 'commentID', 'replyID'],
        action: 'login',
        time: 1709833769253
      }
    ];
  }
}

module.exports = SignUp;

/*

Data Template:

{
  userID: 'u1',
  userName: 'SaveJarvis',
  loggedIn: true,
  details: {
    firstName: 'Jarvis',
    lastName: 'Considine',
    email: 'jarvis@considine.com',
    password: 'test123!',
    created: Date.now(),
    userStatus: "active" | "deleted"
  },
  settings: {
    privacy: {
      profileVisibility: 'private' | 'friends' | 'public',
      postVisibilityDefault: 'private' | 'friends' | 'public',
      blockList: []
    },
    feed: {
      subscriptions: []
    }
    notifications: {
      login: true | false,
      profileViews: true | false,
      posts: true | false,
      comments: true | false,
      replies: true | false,
    },
    messaging: {},
  },
  posts: [
    {
      postID: 'p' + uuid.v4(),
      postVisibility: 'private' | 'friends' | 'public',
      postStatus: "active" | "deleted",
      imgSrc: 'exampleImg.com/img',
      imgAlt: 'Example image",
      imgHeight: '300px',
      postText: 'This is a post.',
      postLikes: 17,
      postComments: [
        {
          otherUserID: // otherUserID === userID of commenter.
          commentID: 'c' + uuid.v4(),
          commentStatus: "active" | "deleted",
          commentText: 'This is a comment.'
          commentLikes: 1,
          commentReplies: [
            {
              otherUserID: otherUserID === userID
              replyID: 'r' + uuid.v4(),
              replyStatus: "active" | "deleted",
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
      historyID: 'h' + uuid.v4(),
      interactionChain: ['userID', 'otherUserID', 'postID', 'commentID', 'replyID'],
        // Note: the interactionChain will simplify locating changes in the database for notifications.
        // Index 0 = Doer of the action.
        // Index 1 = Receiver of the action.
        // Index 1 + N = Pathway to the action.
        // If the ID in Index 0 is the user's, then it indicates that the user interacted with someone else's data structure on the website.
        // If the ID in Index 1 is the user's, then it indicates that someone else interacted with the user's data structure on the website.
      action: 'login' | 'comment' | etc.,
      time: 1709833769253
    }
  ]
}

*/