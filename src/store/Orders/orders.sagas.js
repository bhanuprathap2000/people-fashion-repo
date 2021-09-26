import actionTypes from '../actionTypes';
import { takeLatest, put, all, call } from 'redux-saga/effects';
import { handleSaveOrder, handleGetUserOrderHistory,
  handleGetOrder } from './orders.helpers';
import { auth } from './../../firebase/utils';
import firebase from './../../firebase/utils';
import { clearCart } from './../Cart/cart.actions';
import { setUserOrderHistory, setOrderDetails } from './orders.actions';

export function* getUserOrderHistory({ payload }) {
  try {
    const history = yield handleGetUserOrderHistory(payload);
    yield put(
      setUserOrderHistory(history)
    );

  } catch (err) {
    console.log(err);
  }
}

export function* onGetUserOrderHistoryStart() {
  yield takeLatest(actionTypes.GET_USER_ORDER_HISTORY_START, getUserOrderHistory);
};

export function* saveOrder({ payload }) {
  try {
    const timestamps = firebase.firestore.FieldValue.serverTimestamp()
    yield handleSaveOrder({
      ...payload,
      orderUserID: auth.currentUser.uid,
      orderCreatedDate: timestamps
    });
    yield put(
      clearCart()
    )

  } catch (err) {
    console.log(err);
  }
};

export function* onSaveOrderHistoryStart() {
  yield takeLatest(actionTypes.SAVE_ORDER_HISTORY_START, saveOrder);
};

export function* getOrderDetails({ payload }) {
  try {
    const order = yield handleGetOrder(payload);
    console.log(order)
    yield put(
      setOrderDetails(order)
    )

  } catch (err) {
    // console.log(err);
  }
}

export function* onGetOrderDetailsStart() {
  yield takeLatest(actionTypes.GET_ORDER_DETAILS_START, getOrderDetails);
};

export default function* ordersSagas() {
  yield all([
    call(onSaveOrderHistoryStart),
    call(onGetUserOrderHistoryStart),
    call(onGetOrderDetailsStart),
  ])
}