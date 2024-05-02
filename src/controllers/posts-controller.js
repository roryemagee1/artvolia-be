const uuid = require('uuid');

const HttpError = require('../models/http-error');
const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
const Post = require('../models/post');
const User = require('../models/user');

const getPostsByUserId = async (req, res, next) => {
  const userID = req.params.uid;

  let userWithPosts;
  try {
    userWithPosts = await Post.findById(userID).populate('posts');
  } catch(err) {
    const error = new HttpError("Failed to fetch user's posts.", 500);
    return next(error);
  }

  if (!userWithPosts || userWithPosts.posts.length === 0) {
    const error = new HttpError("Could not find posts for the provided user ID.", 404);
    return next(error);
  }

  res.status(200).json({posts: userWithPosts.map(post => post.toObject({ getters:  true }))});
}

const getPostByUserId = async (req, res, next) => {
  const postID = req.params.pid;

  let post;
  try {
    post = await Post.findById(postID);
  } catch(err) {
    const error = new HttpError("Something went wrong. Could not find a post.", 500);
    return next(error);
  }

  if (!post) {
    return next(new HttpError("Could not find a post with the provided post ID.", 404));
   }

  res.status(200).json({ post: post });
}

const createPost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid inputs passed. Please check your data.", 422));
  }

  const { postText, userID } = req.body;

  const createdPost = new Post({
    userID: userID,
    postID: "p-" + uuid.v4(),
    postVisibility: "public",
    postStatus: "active",
    imgSrc: "../data/butterfly.png",
    imgAlt: "Default Butterfly",
    imgHeight: "300px",
    postText: postText,
    postLikes: 0,
    postComments: []
  });

  let user;
  try {
    user = await User.findById(userID);
  } catch (err) {
    const error = new HttpError("Creating post failed. Please try again.", 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError("Could not find a user for the provided user ID.", 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdPost.save({ session: sess });
    user.posts.push(createdPost);
    await user.save({ session: sess });
    sess.commitTransaction();
  } catch(err) {
    const error = new HttpError("Creating post failed. Please try again.", 500);
    return next(error);
  }
  
  res.status(201).json({ post: createdPost});
};

const updatePostByUserId = async (req, res, next) => {
  const postText = req.body.postText;
  const userID = req.params.uid;
  const postID = req.params.pid;
  
  let post;
  try {
    post = await Post.findById(postID);
  } catch(err) {
    const error = new HttpError("Something went wrong. Could not update post.", 500);
    return next(error);
  }

  if (!post) {
    return next(new HttpError("Could not find a post with the provided post ID.", 404));
   }

  post.postText = postText;

  try {
    await post.save();
  } catch(err) {
    const error = new HttpError(
      "Something went wrong. Could not update post", 500
    );
    return next(error);
  }

  res.status(200).json({ updatedPost: post.toObject({ getters: true }) });
}

const deletePostByUserId = async (req, res, next) => {
  const postID = req.params.pid;
  
  let post;
  try {
    post = await Post.findById(postID).populate("userID");
  } catch(err) {
    const error = new HttpError("Something went wrong. Could not delete post.", 500);
    return next(error);
  }

  if (!post) {
    return next(new HttpError("Could not find a post with the provided post ID.", 404));
   }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await post.deleteOne({ session: sess }); // Use deleteOne() instead of remove().
    await post.userID.posts.pull(post); 
    await post.userID.save({ session: sess });
    sess.commitTransaction();
  } catch(err) {
    const error = new HttpError(
      'Something went wrong. Could not delete post.', 500
    );
    return next(error);
  }

  res.status(200).json({ message: "Post deleted!", post: post.toObject({ getters: true }) });
}

exports.getPostsByUserId = getPostsByUserId;
exports.getPostByUserId = getPostByUserId;
exports.deletePostByUserId = deletePostByUserId;
exports.updatePostByUserId = updatePostByUserId;
exports.createPost = createPost;

