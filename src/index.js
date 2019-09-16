import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import auth from './reducers/auth';

// const saveToLocalStorage = state => {
//   try {
//     const serializedState = JSON.stringify(state);
//     localStorage.setItem('state', serializedState);
//   } catch (err) {
//     console.log(err);
//   }
// };

// const loadFromLocalStorage = () => {
//   try {
//     const serializedState = localStorage.getItem('state');
//     if (serializedState === null) return undefined;
//     return JSON.parse(serializedState);
//   } catch (err) {
//     console.log(err);
//     return undefined;
//   }
// };

const middleware = [thunk];

const rootReducer = combineReducers({
  auth
});

// const persistedState = loadFromLocalStorage();

const store = createStore(
  rootReducer,
  // persistedState,
  composeWithDevTools(applyMiddleware(...middleware))
);

// store.subscribe(() => saveToLocalStorage(store.getState()));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
