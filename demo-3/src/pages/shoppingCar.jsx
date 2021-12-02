import React, { Component } from 'react'
import './shoppingCar.css'
import { connect } from 'react-redux'
import { getProductsInfo } from '../action/productsAction'
import DrawerModal from '../component/drawer/drawerModal'
import shoppingCar from '../static/icon/bag-icon.png'
import { Badge, Avatar, Row ,Col} from 'antd';
import ShoppingCarSection from './shoppingCarSection/shoppingCarSection'
import ShoppingCarAside from './shopingCarAside/shoppingCarAside'
class ShoppingCarComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            active: [],
            visible: false
        }
    }
    componentDidMount() {
        this.props.dispatch(getProductsInfo())
    }
    changeStatus = () => {
        this.setState({
            visible: !this.state.visible
        })
    }

    render() {
        const { shopppingCarProducts } = this.props;
        return (
            <div className="main">
                <DrawerModal onClose={() => this.changeStatus()} visible={this.state.visible} />
                <div className="shopping-car-button" onClick={() => this.changeStatus()}>
                    <Badge offset={['0', '30px']} count={shopppingCarProducts?.length ?? 0} color={"#EABF00"} showZero={true} >
                        <Avatar shape="square" src={shoppingCar}></Avatar>
                    </Badge>
                </div>
                <Row style={{margin:"0 32px"}}>
                    <Col   xs={24} sm={4} md={4} lg={4} >
                        <ShoppingCarAside />
                    </Col>
                    <Col  xs={24} sm={20} md={20} lg={20}  >
                        <ShoppingCarSection />
                    </Col>
                </Row>
            </div>
        )
    }
}

const ShoppingCar = connect((state) => {
    return ({
        products: state.shoppingCar.products,
        shopppingCarProducts: state.shoppingCar.shopppingCarProducts
    })
}, dispatch => ({ dispatch }))(ShoppingCarComponent);
export default ShoppingCar;