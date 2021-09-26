import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import rootReducer from './rootReducer';

// here we can write the array of middlewares which we spread in apply middleware
const middlewares = [logger];

const store = createStore(rootReducer, applyMiddleware(...middlewares));
export default store;
