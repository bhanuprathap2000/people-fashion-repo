import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './User/user.reducer';
import productsReducer from './Products/products.reducer';
import cartReducer from './Cart/cart.reducer';

//here we combine all the reducers
//whatever is the object present inside the combineReducers that is the redux store
export const rootReducer = combineReducers({
	user: userReducer,
	productsData: productsReducer,
	cartData: cartReducer,

});

const configStorage = {
	key: 'root',
	storage,
	whitelist: ['cartData']
  };
  
  export default persistReducer(configStorage, rootReducer);