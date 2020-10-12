import { combineReducers } from 'redux';

import {
  productListReducer,
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
  userListReducer,
  userListLoadPageReducer,
  userDeleteReducer,
  userUpdateReducer,
} from './userReducers';
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderListMyOrdersReducer,
  orderListReducer,
  orderDeliverReducer,
  orderListLoadPageReducer,
  orderLoadMyOrdersPageReducer,
} from './orderReducers';

export default combineReducers({
  productLoadPage: productLoadPageReducer,
  productListLoadPage: productListLoadPageReducer,
  productList: productListReducer,
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
  userList: userListReducer,
  userListLoadPage: userListLoadPageReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderListMyOrders: orderListMyOrdersReducer,
  orderList: orderListReducer,
  orderListLoadPage: orderListLoadPageReducer,
  orderLoadMyOrdersPage: orderLoadMyOrdersPageReducer,
});
