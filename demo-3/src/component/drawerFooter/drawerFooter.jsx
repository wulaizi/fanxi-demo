import React, { Component } from 'react'
import './drawerFooter.css'
import shoppingCarUtil from '../../utils/shoppingCarUtil'
import ModalComponent from '../modal/modal';
export default class DrawerFooter extends Component {
    constructor(props){
        super(props)
        this.state={
            visible:false
        }
    }
    openModal=()=>{
      this.setState({
        visible:!this.state.visible
      })
    }
    handleOk=()=>{
        this.openModal()
        shoppingCarUtil.clear()
    }
    render() {
        return <>
            <div className="aside-footer">
                <div className="sub">SUBTOTAL</div>
                <div className="sub-price">
                    <div className="sub-price-val"><span>$ {shoppingCarUtil.calculatePrice().toFixed(2)}</span></div>
                    <span>{`OR UP TO ${shoppingCarUtil.installments().installments.toFixed(2)} X $${shoppingCarUtil.installments().installmentsPrice.toFixed(2)}`}</span>
                </div>
                <div className="buy-btn" onClick={this.openModal}>
                    CheckOut
                </div>
            </div>
            <ModalComponent 
                visible={this.state.visible} 
                title="确认付款" 
                modalText={`您需要支付${shoppingCarUtil.calculatePrice().toFixed(2)}元`}
                handleCancel={this.openModal}
                handleOk={this.handleOk}
             />
        </>
    }
}