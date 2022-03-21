import {
  loginTypes,
  registerTypes,
  logoutTypes,
  profileTypes,
  updateProfileTypes,
} from '../constants/userConstants';
import { utlitiyFunctionForReducers } from '../../utils/utilityFunction';

// reducers generally give out the new state based on the action type
export const userLoginReducer = (state = {}, action) => {
  return utlitiyFunctionForReducers(state, action, loginTypes);
};

export const userLogoutReducer = (state = {}, action) => {
  // console.log(action.payload);
  return utlitiyFunctionForReducers(state, action, logoutTypes);
};

export const userRegisterReducer = (state = {}, action) => {
  return utlitiyFunctionForReducers(state, action, registerTypes);
};

export const getUserProfileReducer = (state = {}, action) => {
  return utlitiyFunctionForReducers(state, action, profileTypes);
};

export const updateProfileReducer = (state = {}, action) => {
  return utlitiyFunctionForReducers(state, action, updateProfileTypes);
};
