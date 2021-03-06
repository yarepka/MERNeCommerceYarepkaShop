import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from './redux/reducers/index';

// Get Cart Items from localStorage
const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

// Get User Information from localStorage
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

// Get Shipping Address from localStorage
const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {};

export default ({
  children,
  initialState = {
    cart: {
      cartItems: cartItemsFromStorage,
      shippingAddress: shippingAddressFromStorage,
    },
    userLogin: { userInfo: userInfoFromStorage },
  },
}) => {
  const middleware = [thunk];

  const store = createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  );

  return <Provider store={store}>{children}</Provider>;
};
