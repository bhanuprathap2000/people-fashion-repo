import actionTypes from '../actionTypes';

const INITIAL_STATE = {
  products: []
};

const productsReducer = (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case actionTypes.SET_PRODUCTS:
      return {
        ...state,
        products: action.payload
      }
    default:
      return state;
  }
};

export default productsReducer; 