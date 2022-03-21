import {
  loginTypes,
  logoutTypes,
  registerTypes,
  profileTypes,
  updateProfileTypes,
} from '../constants/userConstants';
import utlitiyFunction from '../../utils/utilityFunction';

// AUTH ACTIONS
// 1. LOGIN
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const user = await utlitiyFunction(
    dispatch,
    loginTypes,
    config,
    'post',
    '/api/v1/users/login',
    {
      email,
      password,
    }
  );
  if (user) {
    dispatch({ type: loginTypes.SUCCESS, payload: user });
    localStorage.setItem('user', JSON.stringify(user));
  }
};

// 2. LOGOUT
export const logout = () => async (dispatch, getState) => {
  const {
    userLogin: { storeData: currentUser },
  } = getState();

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${currentUser.token}`,
    },
  };

  const {
    userRegister: { storeData: isUserRegistered },
  } = getState();

  const data = await utlitiyFunction(
    dispatch,
    logoutTypes,
    config,
    'get',
    '/api/v1/users/logout'
  );

  if (data.status !== 'success') {
    console.log('there was a problem with logging out');
    return;
  }

  localStorage.removeItem('user');
  dispatch({ type: logoutTypes.SUCCESS });
  dispatch({ type: loginTypes.LOGOUT });

  if (isUserRegistered) {
    if (Object.keys(isUserRegistered).length !== 0) {
      dispatch({ type: registerTypes.LOGOUT });
    }
  }
};

// 3. REGISTER
export const register = (name, email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const user = await utlitiyFunction(
    dispatch,
    registerTypes,
    config,
    'post',
    '/api/v1/users/register',
    {
      name,
      email,
      password,
    }
  );
  if (user) {
    dispatch({ type: registerTypes.SUCCESS, payload: user });
    dispatch({ type: loginTypes.SUCCESS, payload: user });
    localStorage.setItem('user', JSON.stringify(user));
  }
};

// PROFILE ACTIONS
// 1. get user profile
export const getProfile = () => async (dispatch, getState) => {
  const {
    userLogin: { storeData: currentUser },
  } = getState();

  const config = {
    headers: {
      Authorization: `Bearer ${currentUser.token}`,
    },
  };

  const user = await utlitiyFunction(
    dispatch,
    profileTypes,
    config,
    'get',
    `/api/v1/users/${currentUser.user._id}`
  );

  if (user) {
    dispatch({ type: profileTypes.SUCCESS, payload: user });
  }
};

// 2. update user profile
export const updateProfile = (name, email) => async (dispatch, getState) => {
  const {
    userLogin: { storeData: currentUser },
  } = getState();

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${currentUser.token}`,
    },
  };

  const user = await utlitiyFunction(
    dispatch,
    updateProfileTypes,
    config,
    'patch',
    `/api/v1/users/${currentUser.user._id}`,
    { name, email }
  );
  if (user) {
    dispatch({ type: profileTypes.SUCCESS, payload: user });
    dispatch({ type: updateProfileTypes.SUCCESS, payload: user });
  }
};
