import actionTypes from '../actionTypes';

export const addProductStart = productData => ({
  type: actionTypes.ADD_NEW_PRODUCT_START,
  payload: productData
});

export const fetchProductsStart = () => ({
  type: actionTypes.FETCH_PRODUCTS_START
});

export const setProducts = products => ({
  type: actionTypes.SET_PRODUCTS,
  payload: products
});

export const deleteProductStart = productID => ({
  type: actionTypes.DELETE_PRODUCT_START,
  payload: productID
}); 