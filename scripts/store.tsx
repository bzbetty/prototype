import React from 'react';
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import rootReducer from './reducers/index.tsx';
import rootSaga from './sagas/game.tsx';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    rootReducer, 
    window.devToolsExtension && window.devToolsExtension(),
    applyMiddleware(sagaMiddleware),
);
 
sagaMiddleware.run(rootSaga);
  
export default store;