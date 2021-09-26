import actionTypes from '../actionTypes';

export const addProductStart = (productData) => ({
	type: actionTypes.ADD_NEW_PRODUCT_START,
	payload: productData,
});

export const fetchProductsStart = (filters = {}) => ({
	type: actionTypes.FETCH_PRODUCTS_START,
	payload: filters,
});

export const setProducts = (products) => ({
	type: actionTypes.SET_PRODUCTS,
	payload: products,
});

export const deleteProductStart = (productID) => ({
	type: actionTypes.DELETE_PRODUCT_START,
	payload: productID,
});

export const fetchProductStart = productID => ({
	type: actionTypes.FETCH_PRODUCT_START,
	payload: productID
  });
  
  export const setProduct = product => ({
	type: actionTypes.SET_PRODUCT,
	payload: product
  });
