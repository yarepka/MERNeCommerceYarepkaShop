import axios from 'axios';
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
} from './types';

export const createOrder = (order) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_CREATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      // in order to get '/api/users/profile' we'll pass
      // 'prodile' string as an id, it's made so we'll not
      // create separate actions for both routes
      const { data } = await axios.post(`/api/orders`, order, config);

      dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: ORDER_CREATE_FAIL,
        // remember we putted custom error handler
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
};
