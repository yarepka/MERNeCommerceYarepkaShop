import axios from 'axios';
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_VALIDITY_POSITIVE,
  CART_VALIDITY_NEGATIVE,
  CART_VALIDITY_FAIL,
} from '../actions/types';

export const addToCart = (productId, qty) => {
  // passing getState() function as a second argument gives us
  // possibility to get state tree
  return async (dispatch, getState) => {
    // get product
    const { data } = await axios.get(`/api/products/${productId}`);

    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        product: data.id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty,
      },
    });

    // save to localStorage
    // don't forget to convert it to JSON, because we can only save
    // string in the localStorage
    localStorage.setItem(
      'cartItems',
      JSON.stringify(getState().cart.cartItems)
    );
  };
};

export const removeFromCart = (productId) => {
  return async (dispatch, getState) => {
    dispatch({
      type: CART_REMOVE_ITEM,
      payload: productId,
    });

    localStorage.setItem(
      'cartItems',
      JSON.stringify(getState().cart.cartItems)
    );
  };
};

export const saveShippingAddress = (formData) => {
  return async (dispatch) => {
    dispatch({
      type: CART_SAVE_SHIPPING_ADDRESS,
      payload: formData,
    });

    localStorage.setItem('shippingAddress', JSON.stringify(formData));
  };
};

export const savePaymentMethod = (paymentMethod) => {
  return async (dispatch) => {
    dispatch({
      type: CART_SAVE_PAYMENT_METHOD,
      payload: paymentMethod,
    });

    localStorage.setItem('paymentMethod', JSON.stringify(paymentMethod));
  };
};

export const checkValidity = (cartItems) => {
  return async (dispatch, getState) => {
    try {
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      console.log(cartItems);

      const { data } = await axios.post(
        `/api/cart/checkValidity`,
        cartItems,
        config
      );

      if (data.msg) {
        console.log(data);
        dispatch({
          type: CART_VALIDITY_NEGATIVE,
          payload: {
            cartItems: data.cartItems,
            msg: data.msg,
          },
        });
      } else {
        dispatch({ type: CART_VALIDITY_POSITIVE, cartItems: data.cartItems });
      }
    } catch (err) {
      dispatch({
        type: CART_VALIDITY_FAIL,
        // remember we putted custom error handler
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
};
