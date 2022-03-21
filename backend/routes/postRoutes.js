const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authController = require('../controllers/authController');
const uploadController = require('../controllers/uploadController');
const commentRouter = require('./commentRoutes');

router.use('/:postId/comments', commentRouter);

// this is a route only for uploading images
router.post(
  '/uploads',
  uploadController.uploadPics,
  uploadController.sendFilePath
);

router
  .route('/')
  .get(postController.getPosts)
  .post(
    authController.protect,
    postController.setUserId,
    postController.createPost
  );

router.use(authController.protect);

router
  .route('/:id')
  .get(postController.getPost)
  .patch(postController.updatePost)
  .delete(postController.deletePost);

module.exports = router;
