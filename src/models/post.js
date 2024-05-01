const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
  // userID: { type: String, required: true },
  userID: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  postID: { type: String, required: true },
  postVisibility: { type: String, required: true },
  postStatus: { type: String, required: true},
  imgSrc: { type: String, required: true },
  imgAlt: { type: String, required: true },
  imgHeight: { type: String, required: true },
  postText: { type: String, required: true },
  postLikes: { type: Number, required: true },
  postComments: { type: Array, required: true }
});

module.exports = mongoose.model('Post', postSchema);