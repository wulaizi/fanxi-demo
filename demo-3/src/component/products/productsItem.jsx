import React, { Component } from 'react'
import './productsItem.css'
import iconUtil from '../../utils/iconUtil';
export default class ProductsItem extends Component {
    render() {
        const { sku, price,installments ,currencyFormat,onPress} = this.props;
        return <div className="productsItem" >
            <img src={iconUtil[`img${sku}_1`]} alt="" />
            <p className="title">{this.props?.title ?? ""}</p>
            <p className="sizes">Sizes:{this.props?.availableSizes?? ""}</p>
            <div className="price">
                <span>$</span>
                <b>{parseInt(price)}</b>
                <span>.{Math.round((price.toFixed(2) - parseInt(price)) * 100) ? Math.round((price.toFixed(2) - parseInt(price)) * 100) : '00'}</span>
            </div>
            <div className="">
                <span>or</span>
                <span>{installments??0}</span>
                <span>x</span>
                <span>{`${currencyFormat}${(price / installments).toFixed(2)}`}</span>
            </div>
            <div className="add-to-cart-button" onClick={()=>onPress&&onPress()}>Add to cart</div>
            <div className="flag">Free shipping</div>
        </div>
    }
}