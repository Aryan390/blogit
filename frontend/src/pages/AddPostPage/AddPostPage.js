import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './AddPostPage.scss';
import useInput from '../../hooks/use-input';
import {
  createPost,
  getSinglePost,
  updatePost,
} from '../../redux/actions/postActions';
import Input from '../../components/Inputs/Input';
import { motion } from 'framer-motion';

const AddPostPage = () => {
  const [editMode, setEditMode] = useState(false);
  const [file, setFile] = useState('');

  const dispatch = useDispatch();
  const { postId } = useParams();

  const singlePost = useSelector((state) => state.singlePost);
  const { loading, error, storeData: onePost } = singlePost;

  const {
    value: title,
    setInputState: setTitle,
    isValid: titleIsValid,
    inputChangeHandler: titleChangeHandler,
    reset: titleReset,
  } = useInput((value) => value.trim() !== '');

  const {
    value: post,
    setInputState: setPost,
    isValid: postIsValid,
    inputChangeHandler: postChangeHandler,
    reset: postReset,
  } = useInput((value) => value.trim() !== '');

  useEffect(() => {
    if (postId) {
      setEditMode(true);
    }
  }, [postId]);

  // this will get a single post based on the postId provided in the params, and then from the useSelector it will get stored in the storeData: onePost, I went through this approach because if the user manually enters the id of the post rather than clicking on the link, the post will not be the one that the user is looking for, because the singlePost in redux will have a different post , It will be a longshot, but just to cover all the bases , this approach is used.
  useEffect(() => {
    if (postId) dispatch(getSinglePost(postId));
  }, [dispatch, postId]);

  useEffect(() => {
    if (onePost) {
      if (onePost._id === postId) {
        setTitle(onePost.title);
        setPost(onePost.body);
      }
    }
  }, [postId, onePost, setTitle, setPost]);

  const editPostHandler = () => {
    if (!titleIsValid || !postIsValid) {
      alert('Please input valid data and fill all details');
      return;
    }

    dispatch(updatePost(postId, { title, body: post }));
  };

  // console.log(file);
  const submitHandler = (e) => {
    e.preventDefault();

    if (!titleIsValid || !postIsValid || !file) {
      alert('Please fill all required fields');
      return;
    }

    const formData = new FormData();
    formData.append('pics', file);

    dispatch(
      createPost(
        {
          title: title,
          body: post,
        },
        formData
      )
    );

    titleReset();
    postReset();
    setFile(null);
  };

  const fileChangeHandler = (e) => {
    // setFile((prevState) => [...prevState, ...e.target.files]);
    setFile(e.target.files[0]);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className='addpost-page'>
        <div className='addpost-container'>
          <div className='addpost-card'>
            <h1>Add A Post</h1>
            <form className='addpost-details'>
              <div className='input-container'>
                <Input
                  type='text'
                  placeholder='Title of the Post'
                  value={title}
                  onChange={titleChangeHandler}
                />
              </div>

              <div className='input-container'>
                <textarea
                  className='textarea'
                  type='textarea'
                  placeholder='Write Your Post Here...'
                  value={post}
                  onChange={postChangeHandler}
                />
              </div>
              <div className='input-container fileUpload'>
                <input
                  type='file'
                  className='upload'
                  onChange={fileChangeHandler}
                />
                <span>Upload</span>
              </div>

              {!editMode ? (
                <button
                  className='btn addpost-btn'
                  type='submit'
                  onClick={submitHandler}
                >
                  Add Post
                </button>
              ) : (
                <button
                  className='btn addpost-btn'
                  type='submit'
                  onClick={editPostHandler}
                >
                  Update Post
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AddPostPage;
