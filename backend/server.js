const express = require('express');
const morgan = require('morgan');
const path = require('path');
const dotenv = require('dotenv');
// you put the .config() in the program as soon as possible to put the environment variables in process.env globally
dotenv.config({ path: './config.env' });
// here there are 2 ways to write with colors, one is to extend String.prototype
// and the other is like this: colors.green('hello');
const colors = require('colors');
const connectDB = require('./config/connectDB');
const { notFound, errorHandler } = require('./controllers/errorController');
const userRouter = require('./routes/userRoutes');
const postRouter = require('./routes/postRoutes');
const commentRouter = require('./routes/commentRoutes');
const uploadController = require('./controllers/uploadController');

// console.log(__dirname)

const app = express();

connectDB();

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// MIDDLEWARES:
app.use(express.json());

// ROUTES:
app.use('/api/v1/users', userRouter);
app.use('/api/v1/posts', postRouter);
app.use('/api/v1/comments', commentRouter);

// app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  );
});
