import React from 'react';
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import rootReducer from './reducers/index.tsx';
import rootSaga from './sagas/index.tsx';

// import createSignalrMiddleware from './middleware/signalrMiddleware.jsx';
// import tokenInjectorMiddleware from './middleware/tokenInjectorMiddleware.jsx';
// import cookieMiddleware from './middleware/cookieMiddleware.jsx';
// import retryMiddleware from './middleware/retryMiddleware.jsx';
// import clearOnNavigate from './middleware/clearOnNavigateMiddleware.jsx';
// clearOnNavigate

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    rootReducer, 
    window.devToolsExtension && window.devToolsExtension(),
    applyMiddleware(sagaMiddleware),
);
 
sagaMiddleware.run(rootSaga);
  
export default store;