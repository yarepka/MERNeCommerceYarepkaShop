import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from './redux/reducers/index';

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

export default ({
  children,
  initialState = { cart: { cartItems: cartItemsFromStorage } },
}) => {
  const middleware = [thunk];

  const store = createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  );

  return <Provider store={store}>{children}</Provider>;
};
