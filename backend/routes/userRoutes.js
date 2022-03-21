const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

router.route('/').get(userController.getUsers);

router.post('/register', authController.register);
router.post('/login', authController.login);

// with this piece of below line, the routes below this line are automatically protected by the protect middleware
router.use(authController.protect);

router.get('/logout', authController.logout);

// for getting a user, we can also define a custom endpoint like '/profile' or '/me' that get the user profile thanks to the protect middleware putting the user in the req.user
// that is one way of doing it, but I'm gonna go for the other way in this project
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser);

module.exports = router;
