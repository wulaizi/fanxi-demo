import React, { Component } from 'react'
import { connect } from 'react-redux'
import MenuComponent from '../../component/menu/menu'
import ProductsItem from '../../component/products/productsItem'
import shoppingCarUtil from '../../utils/shoppingCarUtil'
import BaseComponent from '../../component/baseComponent/baseComponent'
import { Col, Row } from 'antd'
class ShoppingCarSectionConponent extends BaseComponent {

    shouldComponentUpdate(nextProps, nextState) {
        if ((nextProps?.products instanceof Array && nextProps?.products.length)) {
            if (!this.initData) {
                this.update(this.LOAD_SUCCESS)
                this.initData = true;
            }
        }
        return true
    }

    renderComponent() {
        const { products } = this.props;
        return <div className="section" >
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end',marginTop:'22px',marginBottom:'22px',marginRight:'10px' }}>
                <MenuComponent />
            </div>
            <div className="section-container">
                <Row>
                    {
                        (products && products?.length) ? products?.map((item, index) => <Col className="col"  xs={24} sm={12} md={8} lg={6} key={index + ""}>
                            <ProductsItem
                                sku={item?.sku}
                                price={item?.price}
                                title={item?.title}
                                availableSizes={(item?.availableSizes || []).join(' ',)}
                                installments={item?.installments}
                                currencyFormat={item?.currencyFormat}
                                onPress={() => shoppingCarUtil.addToShoppingCar(item)}
                            />
                        </Col>) : this._renderLoadEmpty()
                    }
                </Row>
            </div>
        </div>
    }
}

const ShoppingCarSection = connect((state) => {
    return ({
        products: state.shoppingCar.products,
        shopppingCarProducts: state.shoppingCar.shopppingCarProducts
    })
}, dispatch => ({ dispatch }))(ShoppingCarSectionConponent);
export default ShoppingCarSection;