import {
  getPosts,
  makePost,
  retrieveSinglePost,
  removePost,
} from '../constants/postConstants';
import { utlitiyFunctionForReducers } from '../../utils/utilityFunction';

export const listPostsReducer = (state = { posts: [] }, action) => {
  return utlitiyFunctionForReducers(state, action, getPosts);
};

export const getSinglePostReducer = (state = { post: {} }, action) => {
  return utlitiyFunctionForReducers(state, action, retrieveSinglePost);
};

export const createPostReducer = (state = {}, action) => {
  return utlitiyFunctionForReducers(state, action, makePost);
};

export const deletePostReducer = (state = {}, action) => {
  return utlitiyFunctionForReducers(state, action, removePost);
};
