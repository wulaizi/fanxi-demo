import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css';
import App from './App';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import 'font-awesome/css/font-awesome.css'
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
  ,
  document.getElementById('root')
);


reportWebVitals();
