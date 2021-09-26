import actionTypes from '../actionTypes';

export const addProduct = (nextCartItem) => ({
  type: actionTypes.ADD_TO_CART,
  payload: nextCartItem
}); 