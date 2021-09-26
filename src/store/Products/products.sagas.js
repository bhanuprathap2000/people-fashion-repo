import { auth } from './../../firebase/utils';
import firebase
from './../../firebase/utils';

import { takeLatest, put, all, call } from 'redux-saga/effects';
import { setProducts, fetchProductsStart } from './products.actions';
import {
	handleAddProduct,
	handleFetchProducts,
	handleDeleteProduct,
} from './products.helpers';
import actionTypes from '../actionTypes';

export function* addProduct({
	payload: { productCategory, productName, productThumbnail, productPrice },
}) {
	try {
		console.log('in saga trying')
		yield handleAddProduct({
			productCategory,
			productName,
			productThumbnail,
			productPrice,
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

export function* fetchProducts() {
	try {
		const products = yield handleFetchProducts();
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
		yield put(fetchProductsStart());
	} catch (err) {
		// console.log(err);
	}
}

export function* onDeleteProductStart() {
	yield takeLatest(actionTypes.DELETE_PRODUCT_START, deleteProduct);
}

export default function* productsSagas() {
	yield all([
		call(onAddProductStart),
		call(onFetchProductsStart),
		call(onDeleteProductStart),
	]);
}
