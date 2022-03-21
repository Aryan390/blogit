const User = require('../models/userModel');
const Factory = require('./handleFactory');

module.exports = {
  getUsers: Factory.getAll(User),
  getUser: Factory.getOne(User),
  updateUser: Factory.updateOne(User),
  deleteUser: Factory.deleteOne(User),
};
