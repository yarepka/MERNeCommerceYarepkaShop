import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_RESET,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  ORDER_LIST_MYORDERS_RESET,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_LIST_LOAD_PAGE_SUCCESS,
  USER_LIST_LOAD_PAGE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
} from './types';
import axios from 'axios';

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: USER_LOGIN_REQUEST,
      });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        '/api/users/login',
        { email, password },
        config
      );

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });

      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (err) {
      dispatch({
        type: USER_LOGIN_FAIL,
        // remember we putted custom error handler
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({
      type: USER_LOGOUT,
    });

    dispatch({
      type: USER_DETAILS_RESET,
    });

    dispatch({
      type: ORDER_LIST_MYORDERS_RESET,
    });

    dispatch({
      type: USER_LIST_RESET,
    });
  };
};

export const register = (name, email, password) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        '/api/users/',
        { name, email, password },
        config
      );

      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data,
      });

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });

      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (err) {
      dispatch({
        type: USER_REGISTER_FAIL,
        // remember we putted custom error handler
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
};

export const getUserDetails = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_DETAILS_REQUEST,
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
      const { data } = await axios.get(`/api/users/${id}`, config);

      dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: USER_DETAILS_FAIL,
        // remember we putted custom error handler
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
};

export const updateUserProfile = (user) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_UPDATE_PROFILE_REQUEST,
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
      const { data } = await axios.put(`/api/users/profile`, user, config);

      dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: USER_UPDATE_PROFILE_FAIL,
        // remember we putted custom error handler
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
};

export const listUsers = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_LIST_REQUEST,
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

      const { data } = await axios.get(`/api/users`, config);

      dispatch({ type: USER_LIST_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: USER_LIST_FAIL,
        // remember we putted custom error handler
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
};

export const loadListUsersPage = () => {
  return async (dispatch, getState) => {
    try {
      const {
        userListLoadPage: { date, page },
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
        `/api/users/loadPage?page=${nextPage}&date=${currentDate}`,
        config
      );

      dispatch({
        type: USER_LIST_LOAD_PAGE_SUCCESS,
        payload: {
          users: data,
          page: nextPage,
          date: currentDate,
        },
      });
    } catch (err) {
      dispatch({
        type: USER_LIST_LOAD_PAGE_FAIL,
        // remember we putted custom error handler
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
};

export const deleteUser = (userId) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_DELETE_REQUEST,
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

      await axios.delete(`/api/users/${userId}`, config);

      dispatch({ type: USER_DELETE_SUCCESS });
    } catch (err) {
      dispatch({
        type: USER_DELETE_FAIL,
        // remember we putted custom error handler
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
};

export const updateUser = (user) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_UPDATE_REQUEST,
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

      const { data } = await axios.put(`/api/users/${user.id}`, user, config);

      dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: USER_UPDATE_FAIL,
        // remember we putted custom error handler
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
};
