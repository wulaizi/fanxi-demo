import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css'; 
import ShoppingCar from './pages/shoppingCar'

import { Component } from 'react';
import shoppingCarUtil from './utils/shoppingCarUtil'
export default  class App extends Component{
  componentDidMount(){
    shoppingCarUtil.init()
  }
  render(){
    return  <div className="App">
    <ShoppingCar />
  </div>
  }
}


