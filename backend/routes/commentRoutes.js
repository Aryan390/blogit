const express = require('express');
const router = express.Router({ mergeParams: true });
const authController = require('../controllers/authController');
const commentController = require('../controllers/commentController');

// so comments can get a bit tricky as they have a link to a post and a user as well
// so we need to use the postId and it's a nested route which is mentioned in postRoutes.js
// by router.use('/:postId/comments', commentRouter);
// and also we need to mergeParams in the commentRoutes.js by writing :
// express.Router({mergeParams: true})
// so when comments are called just on /comment path, we can get all the comments and perfrom CRUD operations as we will require a unique comment id, everything will be handled by that
// but if we want to get a particular comment, pertaining to a particular post, we need to use the postId as well, and we define a middleware to put the postId and userId in req.body, and also we cannot create a comment without a postId and a userId

router.use(authController.protect);

router
  .route('/')
  .get(commentController.getComments)
  .post(commentController.setPostAndUserId, commentController.createComment);

router
  .route('/:id')
  .get(commentController.getComment)
  .delete(commentController.deleteComment)
  .patch(commentController.updateComment);

module.exports = router;
