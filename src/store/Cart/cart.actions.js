import actionTypes from '../actionTypes';

export const addProduct = (nextCartItem) => ({
  type: actionTypes.ADD_TO_CART,
  payload: nextCartItem
});

export const removeCartItem = (cartItem) => ({
  type: actionTypes.REMOVE_CART_ITEM,
  payload: cartItem
});

export const reduceCartItem = (cartItem) => ({
  type: actionTypes.REDUCE_CART_ITEM,
  payload: cartItem
}); 