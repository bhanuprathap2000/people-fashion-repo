import { combineReducers } from 'redux';
import userReducer from './User/user.reducer';

//here we combine all the reducers
//whatever is the object present inside the combineReducers that is the redux store
export default combineReducers({
	user: userReducer,
});
