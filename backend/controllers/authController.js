const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');

// utility function to create token
const createToken = (id) => {
  // payload ({ id }) is the data that will be encoded in the token
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_TOKEN_EXPIRES_IN,
  });
};

const cookifyToken = (user, statusCode, res) => {
  const token = createToken(user._id);
  res.cookie('jwt', token, {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    // this amounts to 1 day, as expires_in is set as '1' in the .env file
    expiresIn: process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
  });

  // remove password from frontend
  user.password = undefined;

  // return the user object with the token
  res.status(statusCode).json({
    token,
    user,
  });
};

// FUNCTIONS TO BE EXPORTED:
const register = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // const newUser = await User.create({
  //   ...req.body,
  // });
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    isAdmin: req.body.isAdmin,
    photo: req.body.photo,
  });

  // send the user object with the token
  cookifyToken(newUser, 201, res);

  // const token = createToken(newUser._id);

  // res.status(201).json({
  //   token,
  //   newUser,
  // });
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    res.status(400);
    throw new Error('User does not exist');
  }

  const isMatch = await user.checkPassword(password, user.password);
  console.log(isMatch);

  if (!isMatch) {
    res.status(400);
    throw new Error('Password is incorrect');
  }

  // send the user object with the token
  cookifyToken(user, 200, res);

  // const token = createToken(user._id);
  // res.status(200).json({
  //   token,
  //   user,
  // });
});

const logout = catchAsync(async (req, res, next) => {
  // console.log('from logout');
  res.cookie('jwt', 'loggedout', {
    expiresIn: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    status: 'success',
  });
});

// protect middlware always puts the logged in user in req.user
const protect = catchAsync(async (req, res, next) => {
  // console.log('from protect');
  // console.log(req.files);
  if (!req.headers.authorization) {
    res.status(401);
    throw new Error('No token provided');
  }
  const headers = req.headers.authorization;
  let token = headers.startsWith('Bearer') ? headers.split(' ')[1] : null;

  if (!token) {
    res.status(400);
    throw new Error('Token is not valid');
  }

  // decoded gets the payload of the token that we passed during the signing/creating the token
  // jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN})
  // jwt.verify() : If a callback is supplied, function acts asynchronously. The callback is called with the decoded payload
  //If a callback is not supplied, function acts synchronously
  // promisify makes the callback function return a promise
  // const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  if (!decoded) {
    res.status(401);
    throw new Error('user is not authorized for this route');
  }
  const user = await User.findById(decoded.id);
  if (!user) {
    res.status(400);
    throw new Error('User does not exist');
  }
  req.user = user;
  next();
});

const onlyAdmin = catchAsync(async (req, res, next) => {
  if (!req.user.isAdmin) {
    res.status(403);
    throw new Error(
      'Only admins allowed, you are unauthorized access this resources/page'
    );
  }
  next();
});

module.exports = { register, login, logout, protect, onlyAdmin };
