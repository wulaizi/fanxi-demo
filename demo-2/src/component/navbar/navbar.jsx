import React, { PureComponent } from 'react'
import './navbar.css';
export default class NavBar extends PureComponent {
    
    render() {
        const { onChange, active, data } = this.props;
        return <div className="nav-bar">
            <ul>
                {
                    data && data.map((item) => <li key={item + ""} className={active == item ? "nav-active" : "nav-default"}
                        onClick={() => {
                            onChange && onChange(item)
                        }}>{item}</li>)
                }
            </ul>
        </div>
    }
}