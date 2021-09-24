import actionTypes from '../actionTypes';
import { handleAddToCart } from './cart.utils';

const INITIAL_STATE = {
  cartItems: []
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      return {
        ...state,
        cartItems: handleAddToCart({
          prevCartItems: state.cartItems,
          nextCartItem: action.payload
        })
      };
    default:
      return state;
  }
};

export default cartReducer; 