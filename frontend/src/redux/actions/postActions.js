import {
  getPosts,
  retrieveSinglePost,
  makePost,
  patchPost,
  removePost,
} from '../constants/postConstants';
import utlitiyFunction from '../../utils/utilityFunction';
import axios from 'axios';

// 1. GET ALL POSTS
export const getListPosts = () => async (dispatch) => {
  const posts = await utlitiyFunction(
    dispatch,
    getPosts,
    null,
    'get',
    '/api/v1/posts'
  );

  if (posts) {
    dispatch({ type: getPosts.SUCCESS, payload: posts });
  }
};

// 2. GET SINGLE POST
export const getSinglePost = (postId) => async (dispatch, getState) => {
  const {
    userLogin: { storeData: user },
  } = getState();

  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  const newPost = await utlitiyFunction(
    dispatch,
    retrieveSinglePost,
    config,
    'get',
    `/api/v1/posts/${postId}`
  );

  if (newPost) {
    dispatch({ type: retrieveSinglePost.SUCCESS, payload: newPost });
  }
};

// 3. CREATE POST
export const createPost = (post, formData) => async (dispatch, getState) => {
  let file;
  if (formData) {
    try {
      const fileConfig = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data: fileData } = await axios.post(
        '/api/v1/posts/uploads',
        formData,
        fileConfig
      );
      console.log(fileData);
      file = fileData;
    } catch (error) {
      console.log(error);
    }
  }

  const {
    userLogin: { storeData: user },
  } = getState();

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token}`,
    },
  };

  post = { ...post, images: file ? file : null };
  const newPost = await utlitiyFunction(
    dispatch,
    makePost,
    config,
    'post',
    '/api/v1/posts',
    post
  );

  if (newPost) {
    dispatch({ type: makePost.SUCCESS, payload: 'success' });
    alert('The post was successfully created');
  }
};

// 4. DELETE POST
export const deletePost = (postId) => async (dispatch, getState) => {
  const {
    userLogin: { storeData: user },
  } = getState();

  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  const newPost = await utlitiyFunction(
    dispatch,
    removePost,
    config,
    'delete',
    `/api/v1/posts/${postId}`
  );

  if (newPost) {
    dispatch({ type: removePost.SUCCESS, payload: 'success' });
  }
};

// 5. UPDATE POST
export const updatePost = (postId, post) => async (dispatch, getState) => {
  const {
    userLogin: { storeData: user },
  } = getState();

  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  const newPost = await utlitiyFunction(
    dispatch,
    patchPost,
    config,
    'patch',
    `/api/v1/posts/${postId}`,
    post
  );

  if (newPost) {
    dispatch({ type: patchPost.SUCCESS, payload: 'success' });
  }
};
