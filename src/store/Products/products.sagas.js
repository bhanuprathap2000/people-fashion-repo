import { auth } from './../../firebase/utils';
import firebase from './../../firebase/utils';

import { takeLatest, put, all, call } from 'redux-saga/effects';
import {
	setProducts,
	setProduct,
	fetchProductsStart,
} from './products.actions';
import {
	handleAddProduct,
	handleFetchProducts,
	handleFetchProduct,
	handleDeleteProduct,
} from './products.helpers';
import actionTypes from '../actionTypes';

export function* addProduct({ payload }) {
	try {
		console.log('in saga trying');
		yield handleAddProduct({
			...payload,
			productAdminUserUID: auth.currentUser.uid,
			createdDate: new Date(),
		});
		yield put(fetchProductsStart());
	} catch (err) {
		// console.log(err);
	}
}

export function* onAddProductStart() {
	yield takeLatest(actionTypes.ADD_NEW_PRODUCT_START, addProduct);
}

export function* fetchProducts({ payload }) {
	try {
		const products = yield handleFetchProducts(payload);

		yield put(setProducts(products));
	} catch (err) {
		// console.log(err);
	}
}

export function* onFetchProductsStart() {
	yield takeLatest(actionTypes.FETCH_PRODUCTS_START, fetchProducts);
}

export function* deleteProduct({ payload }) {
	try {
		yield handleDeleteProduct(payload);
		yield put(fetchProductsStart({ filterType: '' }));
	} catch (err) {
		// console.log(err);
	}
}

export function* onDeleteProductStart() {
	yield takeLatest(actionTypes.DELETE_PRODUCT_START, deleteProduct);
}

export function* fetchProduct({ payload }) {
	try {
		const product = yield handleFetchProduct(payload);
		yield put(setProduct(product));
	} catch (err) {
		console.log(err);
	}
}

export function* onFetchProductStart() {
	yield takeLatest(actionTypes.FETCH_PRODUCT_START, fetchProduct);
}

export default function* productsSagas() {
	yield all([
		call(onAddProductStart),
		call(onFetchProductsStart),
		call(onDeleteProductStart),
		call(onFetchProductStart),
	]);
}
