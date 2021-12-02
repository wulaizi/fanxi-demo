import React, { Component, useState } from 'react'
import { DownOutlined } from '@ant-design/icons'
import { Menu, Dropdown, Button, Spin, Drawer, Badge, Avatar, Radio } from 'antd';
import { connect } from 'react-redux'
import shoppingCarUtil from '../../utils/shoppingCarUtil'
const menuItem = ['Select', 'Lowest to highest', 'Highest to lowest'];

class MenuComponent_ extends Component {
    render() {
        return <Dropdown overlay={<Menu onClick={({ key }) => {
            this.props.dispatch({
                type:"SORT_PRODUCTS",
                data:menuItem[key]
            })
            shoppingCarUtil.sortProducts(this.props.products,menuItem[key])
        }}>
            <Menu.Item key={0}>
                Select
            </Menu.Item>
            <Menu.Item key={1}>
                Lowest to highest
            </Menu.Item>
            <Menu.Item key={2}>
                Highest to lowest
            </Menu.Item>
        </Menu>}>
            <Button>{this.props.sortProducts}<DownOutlined /></Button>
        </Dropdown>
    }
}

const MenuComponent = connect((state) => {
    return ({
        products: state.shoppingCar.products,
        sortProducts: state.shoppingCar.sortProducts,
    })
}, dispatch => ({ dispatch }))(MenuComponent_);
export default MenuComponent;