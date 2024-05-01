const HttpError = require('../models/http-error');
const DUMMY_DATA = require('../data/dummy-data');
const uuid = require('uuid');
const { validationResult } = require('express-validator');
const Post = require('../models/post');

const getPostsByUserId = async (req, res, next) => {
  const userID = req.params.uid;
  const user = DUMMY_DATA.users.find(user => user.userID === userID);
  
  let posts;
  try {
    posts = await Post.find({ userID: userID });
  } catch(err) {
    const error = new HttpError("Failed to fetch user's posts.", 500);
    return next(error);
  }

  // res.status(200).json({posts: posts});
  res.status(200).json({posts: posts.map(post => post.toObject({ getters:  true }))});
}

// const getPostsByUserId = (req, res, next) => {
//   const userID = req.params.uid;
//   const user = DUMMY_DATA.users.find(user => user.userID === userID);
  
//   if (!user) {
//    return next(new HttpError("Could not find a user with the provided user ID.", 404));
//   }

//   if (!user.posts || user.posts.length === 0 ) {
//     return next(new HttpError("Could not find any posts associated with provided user ID", 404));
//   }

//   res.status(200).json(user.posts);
// }


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

// const getPostByUserId = (req, res, next) => {
//   const userID = req.params.uid;
//   const postID = req.params.pid;
//   const user = DUMMY_DATA.users.find(user => user.userID === userID);
  
//   if (!user) {
//    return next(new HttpError("Could not find a user with the provided user ID.", 404));
//   }

//   const post = user.posts.find(post => post.postID === postID);

//   if (!post) {
//     return next(new HttpError("Could not find a post with the provided post ID.", 404));
//    }

//   res.status(200).json(post);
// }




const createPost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(new HttpError("Invalid inputs passed. Please check your data.", 422));
  }

  const { postText } = req.body;
  const userID = req.params.uid;

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
  })

  try {
    await createdPost.save();
  } catch(err) {
    const error = new HttpError("Creating post failed. Please try again.", 500);
    return next(error);
  }
  
  res.status(201).json({ post: createdPost});
};



// const createPost = (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     console.log(errors);
//     return next(new HttpError("Invalid inputs passed. Please check your data.", 422));
//   }

//   const { postText, creator } = req.body;
//   const userID = req.params.uid;
//   let moddedUser = DUMMY_DATA.users.find(user => user.userID === userID);

//   if (!moddedUser) {
//     return next(new HttpError("Could not find a user with the provided user ID.", 404));
//   }

//   const createdPost = {
//     postID: "p-" + uuid.v4(),
//     postText,
//     creator
//   }

//   moddedUser.posts.push(createdPost);
//   DUMMY_DATA.users.map(user => {
//     if (user.userID === userID) {
//       return moddedUser;
//     }
//     return user;
//   });
  
//   res.status(201).json({ post: createdPost});
// };

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

// const updatePostByUserId = (req, res, next) => {
//   const postText = req.body.postText;
//   const userID = req.params.uid;
//   const postID = req.params.pid;
//   const user = DUMMY_DATA.users.find(user => user.userID === userID);
  
//   if (!user) {
//    return next(new HttpError("Could not find a user with the provided user ID.", 404));
//   }

//   const post = user.posts.find(post => post.postID === postID);

//   if (!post) {
//     return next(new HttpError("Could not find a post with the provided post ID.", 404));
//    }

//    const moddedPosts = user.posts.map(post => {
//     if (post.postID === postID) {
//       post.postText = postText;
//       return post;
//     }
//     return post;
//    });
//    DUMMY_DATA.users.map(user => {
//     if (user.userID === userID) {
//       user.posts = moddedPosts;
//       return user;
//     }
//     return user;
//   });

//   res.status(201).json({ message: "Post updated!", moddedPosts});
// }

const deletePostByUserId = async (req, res, next) => {
  const userID = req.params.uid;
  const postID = req.params.pid;
  
  let post;
  try {
    post = await Post.findById(postID);
  } catch(err) {
    const error = new HttpError("Something went wrong. Could not delete post.", 500);
    return next(error);
  }

  if (!post) {
    return next(new HttpError("Could not find a post with the provided post ID.", 404));
   }

  try {
    // await post.remove(); Use deleteOne() instead of remove().
    await post.deleteOne();
    // await post.save();
  } catch(err) {
    const error = new HttpError(
      'Something went wrong. Could not delete post.', 500
    );
    return next(error);
  }

  res.status(200).json({ message: "Post deleted!", post: post.toObject({ getters: true }) });
}

// const deletePostByUserId = (req, res, next) => {
//   const userID = req.params.uid;
//   const postID = req.params.pid;
//   const user = DUMMY_DATA.users.find(user => user.userID === userID);
  
//   if (!user) {
//    return next(new HttpError("Could not find a user with the provided user ID.", 404));
//   }

//   const post = user.posts.find(post => post.postID === postID);

//   if (!post) {
//     return next(new HttpError("Could not find a post with the provided post ID.", 404));
//    }

//    const moddedPosts = user.posts.filter(post => post.postID !== postID);
//    DUMMY_DATA.users.map(user => {
//     if (user.userID === userID) {
//       user.posts = moddedPosts;
//       return user;
//     }
//     return user;
//   });

//   res.status(200).json({ message: "Post deleted!", post});
// }

exports.getPostsByUserId = getPostsByUserId;
exports.getPostByUserId = getPostByUserId;
exports.deletePostByUserId = deletePostByUserId;
exports.updatePostByUserId = updatePostByUserId;
exports.createPost = createPost;

