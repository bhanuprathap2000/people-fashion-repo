import actionTypes from '../actionTypes';

export const saveOrderHistory = order => ({
  type: actionTypes.SAVE_ORDER_HISTORY_START,
  payload: order
});

export const getUserOrderHistory = uid => ({
  type: actionTypes.GET_USER_ORDER_HISTORY_START,
  payload: uid
});

export const setUserOrderHistory = history => ({
  type: actionTypes.SET_USER_ORDER_HISOTRY,
  payload: history
});

export const getOrderDetailsStart = orderID => ({
  type: actionTypes.GET_ORDER_DETAILS_START,
  payload: orderID
});

export const setOrderDetails = order => ({
  type: actionTypes.SET_ORDER_DETAILS,
  payload: order
}); 