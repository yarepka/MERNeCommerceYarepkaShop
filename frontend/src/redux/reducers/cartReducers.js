import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_CLEAR_CART,
  CART_VALIDITY_POSITIVE,
  CART_VALIDITY_NEGATIVE,
  CART_VALIDITY_FAIL,
  CART_VALIDITY_RESET,
} from '../actions/types';

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {}, valid: false },
  action
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      // get item
      const item = action.payload;

      const existItem = state.cartItems.find(
        (el) => el.product === item.product
      );

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((el) =>
            el.product === existItem.product ? item : el
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (el) => el.product !== action.payload
        ),
      };
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    case CART_CLEAR_CART:
      return {
        cartItems: [],
        shippingAddress: state.shippingAddress,
        paymentMethod: state.paymentMethod,
        valid: false,
      };
    case CART_VALIDITY_POSITIVE: {
      return {
        ...state,
        valid: true,
      };
    }
    case CART_VALIDITY_NEGATIVE: {
      return {
        ...state,
        cartItems: action.payload.cartItems,
        msg: action.payload.msg,
        valid: false,
      };
    }
    case CART_VALIDITY_FAIL: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case CART_VALIDITY_RESET: {
      return {
        ...state,
        valid: false,
      };
    }
    default:
      return state;
  }
};
