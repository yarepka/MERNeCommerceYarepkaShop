import axios from 'axios';
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../actions/types';

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

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
  };
};
