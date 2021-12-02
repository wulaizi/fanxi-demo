import React, { Component } from 'react'
import './shoppingCarAside.css'
import shoppingCarUtil from '../../utils/shoppingCarUtil'
const SIZE = ['XS', 'S', 'M', 'ML', 'L', 'XL', 'XXL']
export default class ShoppingCarAside extends Component {
    constructor(props) {
        super(props)
        this.state = {
            active: [],
        }
    }
    handleSelect = (item) => {
        let active = this.state.active;
        if (!active.includes(item)) {
            active.push(item)
            this.updateProducts(active)
        } else {
            const index = active.indexOf(item);
            if (index > -1) {
                active.splice(index, 1);
            }
            this.updateProducts(active)
        }
    }

    updateProducts = (active) => {
        this.setState({
            active
        }, () => {
            shoppingCarUtil.filterProducts(this.state.active)
        })
    }

    render() {
        const { active } = this.state;
        return <div className="aside">
            <div>Sizes:</div>
            <div className="size-wrap">
                {SIZE.map((item, index) => <div onClick={() => this.handleSelect(item, index)}
                    className={active.includes(item) ? 'size-item-active' : "size-item"}
                    key={item}>
                    {item}
                </div>)}
            </div>
            <p>
                Leave a star on Github if this repository was useful:)
            </p>
        </div>
    }
}