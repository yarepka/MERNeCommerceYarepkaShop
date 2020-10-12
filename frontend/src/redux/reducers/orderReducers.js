import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_RESET,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_RESET,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_RESET,
  ORDER_LIST_MYORDERS_REQUEST,
  ORDER_LIST_MYORDERS_SUCCESS,
  ORDER_LIST_MYORDERS_FAIL,
  ORDER_LIST_MYORDERS_RESET,
  ORDER_LIST_LOAD_PAGE_SUCCESS,
  ORDER_LIST_LOAD_PAGE_FAIL,
  ORDER_LIST_LOAD_PAGE_RESET,
  ORDER_LOAD_MYORDERS_PAGE_SUCCESS,
  ORDER_LOAD_MYORDERS_PAGE_FAIL,
  ORDER_LOAD_MYORDERS_PAGE_RESET,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_RESET,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_RESET,
} from '../actions/types';

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return {
        loading: true,
      };
    case ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      };
    case ORDER_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_CREATE_RESET: {
      return {};
    }
    default:
      return state;
  }
};

export const orderDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        loading: true,
      };
    case ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };
    case ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_DETAILS_RESET: {
      return {
        loading: true,
      };
    }
    default:
      return state;
  }
};

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return {
        loading: true,
      };
    case ORDER_PAY_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ORDER_PAY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};

export const orderDeliverReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELIVER_REQUEST:
      return {
        loading: true,
      };
    case ORDER_DELIVER_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ORDER_DELIVER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_DELIVER_RESET:
      return {};
    default:
      return state;
  }
};

export const orderListMyOrdersReducer = (
  state = { orders: [], loading: true },
  action
) => {
  switch (action.type) {
    case ORDER_LIST_MYORDERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ORDER_LIST_MYORDERS_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };
    case ORDER_LIST_MYORDERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ORDER_LIST_MYORDERS_RESET:
      return {
        orders: [],
        loading: true,
      };
    default:
      return state;
  }
};

export const orderLoadMyOrdersPageReducer = (
  state = { hasMore: true, loading: true, orders: [], page: 0, date: null },
  action
) => {
  switch (action.type) {
    case ORDER_LOAD_MYORDERS_PAGE_SUCCESS:
      return {
        ...state,
        orders: state.orders.concat(action.payload.orders),
        hasMore: action.payload.orders.length > 0 ? true : false,
        loading: false,
        date: action.payload.date,
        page: action.payload.page,
      };
    case ORDER_LOAD_MYORDERS_PAGE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ORDER_LOAD_MYORDERS_PAGE_RESET:
      return {
        hasMore: true,
        loading: true,
        orders: [],
        page: 0,
        date: null,
      };
    default:
      return state;
  }
};

export const orderListReducer = (
  state = { orders: [], loading: true },
  action
) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ORDER_LIST_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };
    case ORDER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_LIST_RESET:
      return {
        orders: [],
        loading: true,
      };
    default:
      return state;
  }
};

export const orderListLoadPageReducer = (
  state = { hasMore: true, loading: true, orders: [], page: 0, date: null },
  action
) => {
  switch (action.type) {
    case ORDER_LIST_LOAD_PAGE_SUCCESS:
      return {
        ...state,
        orders: state.orders.concat(action.payload.orders),
        hasMore: action.payload.orders.length > 0 ? true : false,
        loading: false,
        date: action.payload.date,
        page: action.payload.page,
      };
    case ORDER_LIST_LOAD_PAGE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ORDER_LIST_LOAD_PAGE_RESET:
      return {
        hasMore: true,
        loading: true,
        orders: [],
        page: 0,
        date: null,
      };
    default:
      return state;
  }
};
