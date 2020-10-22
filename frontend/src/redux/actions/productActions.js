import axios from 'axios';

import {
  PRODUCT_LOAD_PAGE_REQUEST,
  PRODUCT_LOAD_PAGE_SUCCESS,
  PRODUCT_LOAD_PAGE_FAIL,
  PRODUCT_LIST_LOAD_PAGE_REQUEST,
  PRODUCT_LIST_LOAD_PAGE_SUCCESS,
  PRODUCT_LIST_LOAD_PAGE_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
} from './types';

export const loadProductsPage = (keyword = '') => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_LOAD_PAGE_REQUEST });

      const {
        productLoadPage: { date, page },
      } = getState();

      const nextPage = page + 1;
      const currentDate = date !== null ? date : new Date().getTime();

      const { data } = await axios.get(
        `/api/products/loadPage?page=${nextPage}&date=${currentDate}&keyword=${keyword}`
      );

      dispatch({
        type: PRODUCT_LOAD_PAGE_SUCCESS,
        payload: {
          products: data,
          page: nextPage,
          date: currentDate,
        },
      });
    } catch (err) {
      dispatch({
        type: PRODUCT_LOAD_PAGE_FAIL,
        // remember we putted custom error handler
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
};

export const loadListProductsPage = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_LIST_LOAD_PAGE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const {
        productListLoadPage: { date, page },
      } = getState();

      const nextPage = page + 1;
      const currentDate = date !== null ? date : new Date().getTime();

      const { data } = await axios.get(
        `/api/products/loadListPage?page=${nextPage}&date=${currentDate}`,
        config
      );

      dispatch({
        type: PRODUCT_LIST_LOAD_PAGE_SUCCESS,
        payload: {
          products: data,
          page: nextPage,
          date: currentDate,
        },
      });
    } catch (err) {
      dispatch({
        type: PRODUCT_LIST_LOAD_PAGE_FAIL,
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

export const createProductReview = (productId, review) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.post(`/api/products/${productId}/reviews`, review, config);

      dispatch({ type: PRODUCT_CREATE_REVIEW_SUCCESS });
    } catch (err) {
      dispatch({
        type: PRODUCT_CREATE_REVIEW_FAIL,
        // remember we putted custom error handler
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
};
