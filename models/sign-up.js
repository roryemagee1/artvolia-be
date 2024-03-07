const uuid = require('uuid');

class SignUp {
  constructor({ email, userName, firstName, lastName, password }) {
    this.id = 'u' + uuid.v4();
    this.userName = userName;
    this.details = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      created: Date.now()
    }
    this.settings = {};
    this.posts = [];
    this.history = [];
    this.loggedIn = true;
  }
}

module.exports = SignUp;