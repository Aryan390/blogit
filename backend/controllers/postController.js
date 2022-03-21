const Post = require('../models/postModel');
const Factory = require('./handleFactory');

const setUserId = (req, res, next) => {
  if (!req.body.user) req.body.user = req.user._id;
  next();
};

module.exports = {
  setUserId,
  getPosts: Factory.getAll(Post),
  createPost: Factory.createOne(Post),
  getPost: Factory.getOne(Post),
  updatePost: Factory.updateOne(Post),
  deletePost: Factory.deleteOne(Post),
};
