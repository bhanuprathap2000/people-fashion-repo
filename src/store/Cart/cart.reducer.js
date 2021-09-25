import actionTypes from '../actionTypes';
import { handleAddToCart, handleRemoveCartItem,
  handleReduceCartItem } from './cart.utils';

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
      case actionTypes.REDUCE_CART_ITEM:
        return {
          ...state,
          cartItems: handleReduceCartItem({
            prevCartItems: state.cartItems,
            cartItemToReduce: action.payload
          })
        };
      case actionTypes.REMOVE_CART_ITEM:
        return {
          ...state,
          cartItems: handleRemoveCartItem({
            prevCartItems: state.cartItems,
            cartItemToRemove: action.payload
          })
      };
      case actionTypes.CLEAR_CART:
        return {
          ...state,
          ...INITIAL_STATE
        }
    default:
      return state;
  }
};

export default cartReducer; 