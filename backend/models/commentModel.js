const mongoose = require('mongoose');

const commentModel = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, 'Please add a comment'],
    },
    likes: {
      type: Number,
      default: 0,
    },
    dislikes: {
      type: Number,
      default: 0,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: [true, 'A comment must have a post'],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'A comment must have a user attached'],
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model('Comment', commentModel);

module.exports = Comment;
