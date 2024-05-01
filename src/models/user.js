// const uuid = require('uuid');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    userID: { type: String, required: true },
    userName: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, minlength: 6 },
    profileImage: { type: String },
    profileStatus: { type: String, required: true },
    created: { type: String, required: true },
    posts: [{ type: mongoose.Types.ObjectId, required: true, ref: "Post" }],
    loggedIn: { type: Boolean, required: true }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);