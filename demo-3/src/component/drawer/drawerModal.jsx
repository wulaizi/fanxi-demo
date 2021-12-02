import React, { Component } from 'react'
import shoppingCar from '../../static/icon/bag-icon.png'
import { connect } from 'react-redux'
import { Menu, Dropdown, Button, Spin, Drawer, Badge, Avatar, Radio } from 'antd';
import shoppingCarUtil from '../../utils/shoppingCarUtil'
import DrawerFooter from '../drawerFooter/drawerFooter'
import List from '../list/list'
import './drawerModal.css'
class DrawerModalComponent extends Component {

    render() {
        const { onClose, visible, shopppingCarProducts } = this.props;
        return <Drawer
                placement="right"
                contentWrapperStyle={{ width: "370px", padding: '0' }}
                visible={visible}
                closable={false}
                className="drawer"
                bodyStyle={{ backgroundColor: "#1B1A20", padding: "0" }}
                onClose={() => onClose && onClose()}
                footer={<DrawerFooter />}
            >
                {
                    visible ? <div className="close" onClick={()=>onClose && onClose()}>
                        x
                    </div> : null
                }
                <div className='header-cart'>
                    <Badge offset={['0', '40px']} count={shopppingCarProducts?.length ?? 0} color={"#EABF00"} showZero={true} size={'small'}>
                        <Avatar shape="square" size="large" src={shoppingCar}></Avatar>
                    </Badge>
                    <span style={{ marginLeft: "20px" }}>Cart</span>
                </div>
                <div style={{overflow:'auto',height:'100%'}}>
                    {
                        shopppingCarProducts
                        && shopppingCarProducts?.length
                        && shopppingCarProducts.map((item, index) => <List.Item
                            count={item.count}
                            onRemove={() => shoppingCarUtil.delShoppingCarProducts(item)}
                            onchange={(value) => shoppingCarUtil.addCount(item, value)}
                            key={index + ""} {...item} />)
                    }
                </div>
            </Drawer>
       
        
    }
}

const DrawerModal = connect((state) => {
    return ({
        products: state.shoppingCar.products,
        shopppingCarProducts: state.shoppingCar.shopppingCarProducts
    })
}, dispatch => ({ dispatch }))(DrawerModalComponent);
export default DrawerModal;


