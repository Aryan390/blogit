const mongoose = require('mongoose');

const postModel = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      required: [true, 'Please add a title'],
    },
    body: {
      type: String,
      required: [true, 'Please add the main content of the post'],
    },
    images: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model('Post', postModel);

module.exports = Post;
