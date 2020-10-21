import {
  PRODUCT_LOAD_PAGE_REQUEST,
  PRODUCT_LOAD_PAGE_SUCCESS,
  PRODUCT_LOAD_PAGE_FAIL,
  PRODUCT_LOAD_PAGE_RESET,
  PRODUCT_LIST_LOAD_PAGE_REQUEST,
  PRODUCT_LIST_LOAD_PAGE_SUCCESS,
  PRODUCT_LIST_LOAD_PAGE_FAIL,
  PRODUCT_LIST_LOAD_PAGE_RESET,
  // PRODUCT_LIST_REQUEST,
  // PRODUCT_LIST_SUCCESS,
  // PRODUCT_LIST_FAIL,
  // PRODUCT_LIST_RESET,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_RESET,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_RESET,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_RESET,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_RESET,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_RESET,
} from '../actions/types';

export const productLoadPageReducer = (
  state = {
    hasMore: true,
    loading: true,
    loadingPage: false,
    products: [],
    page: 0,
    date: null,
  },
  action
) => {
  switch (action.type) {
    case PRODUCT_LOAD_PAGE_REQUEST:
      return {
        ...state,
        loadingPage: true,
      };
    case PRODUCT_LOAD_PAGE_SUCCESS:
      return {
        ...state,
        products: state.products.concat(action.payload.products),
        hasMore: action.payload.products.length > 0 ? true : false,
        loading: false,
        loadingPage: false,
        date: action.payload.date,
        page: action.payload.page,
      };
    case PRODUCT_LOAD_PAGE_FAIL:
      return {
        ...state,
        loading: false,
        loadingPage: false,
        error: action.payload,
      };
    case PRODUCT_LOAD_PAGE_RESET:
      return {
        hasMore: true,
        loading: true,
        loadingPage: false,
        products: [],
        page: 0,
        date: null,
      };
    default:
      return state;
  }
};

export const productListLoadPageReducer = (
  state = {
    hasMore: true,
    loading: true,
    loadingPage: false,
    products: [],
    page: 0,
    date: null,
  },
  action
) => {
  switch (action.type) {
    case PRODUCT_LIST_LOAD_PAGE_REQUEST:
      return {
        ...state,
        loadingPage: true,
      };
    case PRODUCT_LIST_LOAD_PAGE_SUCCESS:
      return {
        ...state,
        products: state.products.concat(action.payload.products),
        hasMore: action.payload.products.length > 0 ? true : false,
        loading: false,
        loadingPage: false,
        date: action.payload.date,
        page: action.payload.page,
      };
    case PRODUCT_LIST_LOAD_PAGE_FAIL:
      return {
        ...state,
        loading: false,
        loadingPage: false,
        error: action.payload,
      };
    case PRODUCT_LIST_LOAD_PAGE_RESET:
      return {
        hasMore: true,
        loading: true,
        loadingPage: false,
        products: [],
        page: 0,
        date: null,
      };
    default:
      return state;
  }
};

// export const productListReducer = (state = { products: [] }, action) => {
//   switch (action.type) {
//     case PRODUCT_LIST_REQUEST:
//       return { loading: true, products: [] };
//     case PRODUCT_LIST_SUCCESS:
//       return { loading: false, products: action.payload };
//     case PRODUCT_LIST_FAIL:
//       return { loading: false, error: action.payload };
//     case PRODUCT_LIST_RESET:
//       return { ...state, loading: true };
//     default:
//       return state;
//   }
// };

export const productDetailsReducer = (
  state = { product: { reviews: [] }, loading: true },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_DETAILS_RESET:
      return { ...state, loading: true, product: { reviews: [] } };
    default:
      return state;
  }
};

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_DELETE_RESET:
      return { success: false };
    default:
      return state;
  }
};

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { loading: true };
    case PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const productUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { loading: true };
    case PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const productCreateReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return { loading: true };
    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};
