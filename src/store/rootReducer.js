import { combineReducers } from 'redux';
import userReducer from './User/user.reducer';
import productsReducer from './Products/products.reducer';
import cartReducer from './Cart/cart.reducer';

//here we combine all the reducers
//whatever is the object present inside the combineReducers that is the redux store
export default combineReducers({
	user: userReducer,
	productsData: productsReducer,
	cartData: cartReducer,

});
