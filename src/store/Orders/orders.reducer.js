import actionTypes from '../actionTypes';

const INITIAL_STATE = {
  orderHistory: [],
  orderDetails: {},
};

const ordersReducer = (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case actionTypes.SET_USER_ORDER_HISOTRY:
      return {
        ...state,
        orderHistory: action.payload
      };
    case actionTypes.SET_ORDER_DETAILS:
      return {
        ...state,
        orderDetails: action.payload
      };
    default:
      return state;
  }
};

export default ordersReducer;