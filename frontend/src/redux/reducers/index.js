import { combineReducers } from 'redux';

import {
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productCreateReviewReducer,
  productLoadPageReducer,
  productListLoadPageReducer,
} from './productReducers';
import { cartReducer } from './cartReducers';
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListLoadPageReducer,
  userDeleteReducer,
  userUpdateReducer,
} from './userReducers';
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderDeliverReducer,
  orderListLoadPageReducer,
  orderLoadMyOrdersPageReducer,
} from './orderReducers';

export default combineReducers({
  productLoadPage: productLoadPageReducer,
  productListLoadPage: productListLoadPageReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productCreateReview: productCreateReviewReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  userListLoadPage: userListLoadPageReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderListLoadPage: orderListLoadPageReducer,
  orderLoadMyOrdersPage: orderLoadMyOrdersPageReducer,
});
