import actionTypes from '../actionTypes';

const INITIAL_STATE = {
  products: [],
  product: {},
};

const productsReducer = (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case actionTypes.SET_PRODUCTS:
      return {
        ...state,
        products: action.payload
      }
      case actionTypes.SET_PRODUCT:
        return {
          ...state,
          product: action.payload
        }
    default:
      return state;
  }
};

export default productsReducer; 