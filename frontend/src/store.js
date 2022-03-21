import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
  userLoginReducer,
  userRegisterReducer,
  userLogoutReducer,
  getUserProfileReducer,
  updateProfileReducer,
} from './redux/reducers/userReducer';

import {
  listPostsReducer,
  createPostReducer,
  getSinglePostReducer,
  deletePostReducer,
} from './redux/reducers/postReducer';

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userLogout: userLogoutReducer,
  listPosts: listPostsReducer,
  createPost: createPostReducer,
  userProfile: getUserProfileReducer,
  updateProfile: updateProfileReducer,
  singlePost: getSinglePostReducer,
  deletePost: deletePostReducer,
});

// get auth information from local storage
const userStateFromStorage = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : null;

// console.log(userStateFromStorage);

const initialState = { userLogin: { storeData: userStateFromStorage } };

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
