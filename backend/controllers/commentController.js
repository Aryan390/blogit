const Comment = require('../models/commentModel');
const Factory = require('./handleFactory');

// this middleware is used for creation of a post and getting comments to a particular post
const setPostAndUserId = (req, res, next) => {
  if (!req.body.post) req.body.post = req.params.postId;
  if (!req.body.user) req.body.user = req.user._id;
  next();
};

module.exports = {
  setPostAndUserId,
  getComments: Factory.getAll(Comment),
  getComment: Factory.getOne(Comment),
  createComment: Factory.createOne(Comment),
  updateComment: Factory.updateOne(Comment),
  deleteComment: Factory.deleteOne(Comment),
};
