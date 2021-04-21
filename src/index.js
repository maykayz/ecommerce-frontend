import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import Routes from './Routes'
import {Provider} from 'react-redux'
import './style/main.scss'


import {createStore,applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
// import thunk from 'redux-thunk'
import allReducers from './store/reducers/index'
import rootSaga from './store/sagas/index'

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  allReducers, /* preloadedState, */
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga)


// export default App

ReactDOM.render(
  <Provider store={store}>
    <Routes></Routes>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
