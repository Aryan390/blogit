import axios from 'axios';

// utility function for actions
const utlitiyFunction = async (dispatch, types, config, method, url, data) => {
  // return (dispatch) => {
  //   dispatch({ type: types.REQUEST });
  //   return axios[method](url, config)
  //     .then((res) => {
  //       dispatch({ type: types.SUCCESS, payload: res.data });
  //       return res.data;
  //     })
  //     .catch((err) => {
  //       dispatch({ type: types.FAILURE, payload: err.response.data.message });
  //       return err.response.data.message;
  //     });
  // };
  dispatch({ type: types.REQUEST });
  let res;
  try {
    if (method === 'post' || method === 'put' || method === 'patch') {
      res = await axios[method](url, data, config);
    } else {
      res = config
        ? await axios[method](url, config)
        : await axios[method](url);
    }
    return res.data;
  } catch (error) {
    dispatch({
      type: types.FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// utility function for reducers
export const utlitiyFunctionForReducers = (
  state,
  action,
  { REQUEST, SUCCESS, FAILURE, LOGOUT, RESET }
) => {
  switch (action.type) {
    case REQUEST:
      return { loading: true };
    case SUCCESS:
      return { loading: false, storeData: action.payload };
    case FAILURE:
      return { loading: false, error: action.payload };
    case LOGOUT:
      return {};
    case RESET:
      return {};
    default:
      return state;
  }
};

export default utlitiyFunction;
