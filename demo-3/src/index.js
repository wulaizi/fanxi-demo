import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, Store } from 'redux';
import reducers from './reducer/reducers'
import reportWebVitals from './reportWebVitals';
export const reduxStore = createStore(reducers(), applyMiddleware(thunk));
ReactDOM.render(
  <Provider store={reduxStore}>
    <App />
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
