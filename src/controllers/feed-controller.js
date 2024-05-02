const HttpError = require('../models/http-error');
const DUMMY_DATA = require('../data/dummy-data');

const getAllFeed = (req, res, next) => {
  let feed = [];
  DUMMY_DATA.users.forEach(user => {
    user.posts.forEach(post => {
      feed.concat(post);
    });
  });
  
  if (feed.length === 0) {
    return next(new HttpError("Requested data not available.", 404));
  }

  res.status(200).json({posts: feed});
}

exports.getAllFeed = getAllFeed;