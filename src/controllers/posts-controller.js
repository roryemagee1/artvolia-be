const HttpError = require('../models/http-error');
const DUMMY_DATA = require('../data/dummy-data');
const uuid = require('uuid');

// Users
const getUserById = (req, res, next) => {
  const userID = req.params.uid;
  const user = DUMMY_DATA.users.find(user => user.userID === userID);
  
  if (!user) {
    return next(new HttpError("Could not find a user with the provided user ID.", 404));
  }

  res.json({userName: `${user.userName}`});
}

// Posts
const getPostsByUserId = (req, res, next) => {
  const userID = req.params.uid;
  const user = DUMMY_DATA.users.find(user => user.userID === userID);
  
  if (!user) {
   return next(new HttpError("Could not find a user with the provided user ID.", 404));
  }

  if (!user.posts || user.posts.length === 0 ) {
    return next(new HttpError("Could not find any posts associated with provided user ID", 404));
  }

  res.status(200).json(user.posts);
}

const getPostByUserId = (req, res, next) => {
  const userID = req.params.uid;
  const postID = req.params.pid;
  const user = DUMMY_DATA.users.find(user => user.userID === userID);
  
  if (!user) {
   return next(new HttpError("Could not find a user with the provided user ID.", 404));
  }

  const post = user.posts.find(post => post.postID === postID);

  if (!post) {
    return next(new HttpError("Could not find a post with the provided post ID.", 404));
   }

  res.status(200).json(post);
}

const updatePostByUserId = (req, res, next) => {
  const postText = req.body.postText;
  const userID = req.params.uid;
  const postID = req.params.pid;
  const user = DUMMY_DATA.users.find(user => user.userID === userID);
  
  if (!user) {
   return next(new HttpError("Could not find a user with the provided user ID.", 404));
  }

  const post = user.posts.find(post => post.postID === postID);

  if (!post) {
    return next(new HttpError("Could not find a post with the provided post ID.", 404));
   }

   const moddedPosts = user.posts.map(post => {
    if (post.postID === postID) {
      post.postText = postText;
      return post;
    }
    return post;
   });
   DUMMY_DATA.users.map(user => {
    if (user.userID === userID) {
      user.posts = moddedPosts;
      return user;
    }
    return user;
  });

  res.status(201).json({ message: "Post updated!", moddedPosts});
}

const deletePostByUserId = (req, res, next) => {
  const userID = req.params.uid;
  const postID = req.params.pid;
  const user = DUMMY_DATA.users.find(user => user.userID === userID);
  
  if (!user) {
   return next(new HttpError("Could not find a user with the provided user ID.", 404));
  }

  const post = user.posts.find(post => post.postID === postID);

  if (!post) {
    return next(new HttpError("Could not find a post with the provided post ID.", 404));
   }

   const moddedPosts = user.posts.filter(post => post.postID !== postID);
   DUMMY_DATA.users.map(user => {
    if (user.userID === userID) {
      user.posts = moddedPosts;
      return user;
    }
    return user;
  });

  res.status(200).json({ message: "Post deleted!", post});
}


const createPost = (req, res, next) => {
  const { postText, creator } = req.body;
  const userID = req.params.uid;
  let moddedUser = DUMMY_DATA.users.find(user => user.userID === userID);

  if (!moddedUser) {
    return next(new HttpError("Could not find a user with the provided user ID.", 404));
  }

  const createdPost = {
    postID: "p-" + uuid.v4(),
    postText,
    creator
  }

  moddedUser.posts.push(createdPost);
  DUMMY_DATA.users.map(user => {
    if (user.userID === userID) {
      return moddedUser;
    }
    return user;
  });
  
  res.status(201).json({ post: createdPost});
};

// exports.feedController = {getUserById, getPostsByUserId};
exports.getUserById = getUserById;
exports.getPostsByUserId = getPostsByUserId;
exports.getPostByUserId = getPostByUserId;
exports.deletePostByUserId = deletePostByUserId;
exports.updatePostByUserId = updatePostByUserId;
exports.createPost = createPost;