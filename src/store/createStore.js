import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import createSagaMiddle from 'redux-saga';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddle();
export const middlewares = [sagaMiddleware, logger];

export const store = createStore(rootReducer, applyMiddleware(...middlewares));
sagaMiddleware.run(rootSaga);

export default store;
