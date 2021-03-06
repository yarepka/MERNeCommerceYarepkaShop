import axios from 'axios';
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_LOAD_MYORDERS_PAGE_REQUEST,
  ORDER_LOAD_MYORDERS_PAGE_SUCCESS,
  ORDER_LOAD_MYORDERS_PAGE_FAIL,
  ORDER_LIST_LOAD_PAGE_REQUEST,
  ORDER_LIST_LOAD_PAGE_SUCCESS,
  ORDER_LIST_LOAD_PAGE_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
  CART_CLEAR_CART,
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

      // clear cart
      localStorage.removeItem('cartItems');
      dispatch({ type: CART_CLEAR_CART });
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

export const getOrderDetails = (orderId) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_DETAILS_REQUEST,
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

      const { data } = await axios.get(`/api/orders/${orderId}`, config);

      dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: ORDER_DETAILS_FAIL,
        // remember we putted custom error handler
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
};

export const payOrder = (orderId, paymentResult) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_PAY_REQUEST,
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

      const { data } = await axios.put(
        `/api/orders/${orderId}/pay`,
        paymentResult,
        config
      );

      dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: ORDER_PAY_FAIL,
        // remember we putted custom error handler
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
};

export const deliverOrder = (orderId) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_DELIVER_REQUEST,
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

      const { data } = await axios.put(
        `/api/orders/${orderId}/deliver`,
        {},
        config
      );

      dispatch({ type: ORDER_DELIVER_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: ORDER_DELIVER_FAIL,
        // remember we putted custom error handler
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
};

export const loadMyOrdersPage = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_LOAD_MYORDERS_PAGE_REQUEST });

      const {
        orderLoadMyOrdersPage: { date, page },
      } = getState();

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const nextPage = page + 1;
      const currentDate = date !== null ? date : new Date().getTime();

      const { data } = await axios.get(
        `/api/orders/myorders/loadPage?page=${nextPage}&date=${currentDate}`,
        config
      );

      dispatch({
        type: ORDER_LOAD_MYORDERS_PAGE_SUCCESS,
        payload: {
          orders: data,
          page: nextPage,
          date: currentDate,
        },
      });
    } catch (err) {
      dispatch({
        type: ORDER_LOAD_MYORDERS_PAGE_FAIL,
        // remember we putted custom error handler
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
};

export const loadListOrdersPage = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_LIST_LOAD_PAGE_REQUEST });

      const {
        orderListLoadPage: { date, page },
      } = getState();

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const nextPage = page + 1;
      const currentDate = date !== null ? date : new Date().getTime();

      const { data } = await axios.get(
        `/api/orders/loadPage?page=${nextPage}&date=${currentDate}`,
        config
      );

      dispatch({
        type: ORDER_LIST_LOAD_PAGE_SUCCESS,
        payload: {
          orders: data,
          page: nextPage,
          date: currentDate,
        },
      });
    } catch (err) {
      dispatch({
        type: ORDER_LIST_LOAD_PAGE_FAIL,
        // remember we putted custom error handler
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
};
