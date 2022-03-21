const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please add a valid email'],
    },
    photo: {
      type: String,
      default: 'default.jpg',
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      select: false,
      minlength: 6,
    },
  },
  {
    timestamps: true,
  }
);

// middleware to hash the password before saving the user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// INSTANCE METHODS:
// in this below method, this will not work, as select is kept to false for password in the user Model
userSchema.methods.checkPassword = async function (
  inputPassword,
  userPassword
) {
  return await bcrypt.compare(inputPassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
