// This is a seeder script which is to be run independent from the server.js file, and is responsible for importing data and destroying data (from Users and posts collections)

const fs = require('fs');
const dotenv = require('dotenv');
const colors = require('colors');
const User = require('./models/userModel');
const Post = require('./models/postModel');
dotenv.config({ path: './config.env' });

const connectDB = require('./config/connectDB');

connectDB();

// converts users.json file into an array of objects
// fs.readFileSync() gives o/p in a string format
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/data/users.json`, 'utf-8')
);

const posts = JSON.parse(
  fs.readFileSync(`${__dirname}/data/posts.json`, 'utf-8')
);

const importData = async () => {
  try {
    await User.create(users);
    await Post.create(posts);
    console.log('Data Imported...'.green.underline.bold);
  } catch (error) {
    console.error(`Error: ${error}`.red.underline.bold);
  }
  process.exit();
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Post.deleteMany();
    console.log('Data Destroyed...'.yellow.underline.bold);
  } catch (error) {
    console.error(`Error: ${error}`.red.underline.bold);
  }
  process.exit();
};

if (process.argv[2] === '--destroy') destroyData();
else importData();
