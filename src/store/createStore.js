import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';

// here we can write the array of middlewares which we spread in apply middleware
const middlewares = [thunk, logger];

const store = createStore(rootReducer, applyMiddleware(...middlewares));
export default store;
