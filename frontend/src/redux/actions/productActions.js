import axios from 'axios';

import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  CLEAR_PRODUCT,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_RESET,
} from './types';

export const listProducts = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: PRODUCT_LIST_REQUEST,
      });

      const { data } = await axios.get('/api/products');

      dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: PRODUCT_LIST_FAIL,
        // remember we putted custom error handler
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
};

export const listProductDetails = (productId) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: PRODUCT_DETAILS_REQUEST,
      });

      const { data } = await axios.get(`/api/products/${productId}`);

      dispatch({
        type: PRODUCT_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: PRODUCT_DETAILS_FAIL,
        // remember we putted custom error handler
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
};

export const deleteProduct = (productId) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: PRODUCT_DELETE_REQUEST,
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

      await axios.delete(`/api/products/${productId}`, config);

      dispatch({ type: PRODUCT_DELETE_SUCCESS });
    } catch (err) {
      dispatch({
        type: PRODUCT_DELETE_FAIL,
        // remember we putted custom error handler
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
};

export const createProduct = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: PRODUCT_CREATE_REQUEST,
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

      const { data } = await axios.post(`/api/products`, {}, config);

      dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: PRODUCT_CREATE_FAIL,
        // remember we putted custom error handler
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
};

export const updateProduct = (product) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_UPDATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      console.log(product.image);
      console.log(typeof product.image);

      if (product.image instanceof File) {
        // upload an image
        const formData = new FormData();
        const configUpload = {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        };
        formData.append('image', product.image);
        const { data } = await axios.post(
          '/api/upload/',
          formData,
          configUpload
        );

        console.log('filePath: ', data);
        if (data) {
          product.image = data;
        }
      } else {
        if (product.image === '') {
          delete product.image;
        }
      }

      const { data } = await axios.put(
        `/api/products/${product.id}`,
        product,
        config
      );

      dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: PRODUCT_UPDATE_FAIL,
        // remember we putted custom error handler
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
};

export const clearProduct = () => {
  return async (dispatch) => {
    dispatch({
      type: CLEAR_PRODUCT,
    });
  };
};
