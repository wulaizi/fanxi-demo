import React, { Component } from 'react'
import { routers } from '../../router/routers'
import { Link } from 'react-router-dom'
import './header.css'
export default class Header extends Component {
    render() {
        const { currentSelect } = this.props;
        return <div className="header">
            {
                routers.map((item) => {
                    return <div key={item.path+""} onClick={() => this.props.onChange && this.props.onChange(item)}>
                        <Link  to={item.path} className={currentSelect == item.label ? "active-nav-label nav-label-public" : "nav-label nav-label-public"}>{item.label}</Link>
                    </div>
                })
            }
        </div>
    }
}