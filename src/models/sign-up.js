const uuid = require('uuid');

class SignUp {
  constructor(email, userName, firstName, lastName, password='Test123!') {
    this.userID = 'u-' + uuid.v4();
    this.userName = userName;
    this.loggedIn = true;
    this.settings = {
      information: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        created: Date.now(),
        status: 'active'
      },
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
        historyID: 'h-' + uuid.v4(),
        interactionChain: [this.userID, this.userID],
        action: 'login',
        time: this.settings.information.created
      }
    ];
  }
}

module.exports = SignUp;