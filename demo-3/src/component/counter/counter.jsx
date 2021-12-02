import React, { Component } from 'react'
import './counter.css'
export default class Counter extends Component {
    oustomIconButton = (icon, isAdd) => {
        return <div className={isAdd ? "add" : "reduce"} onClick={() => {
            var num =this.props.count??1;
            if (!isAdd && num <=1) return;
            if (isAdd) {
                num+=1
                if (this.props?.addValueChange != null) this.props?.addValueChange(num)
            } else {
                num-=1
                if (this.props?.removeValueChanged != null) this.props?.removeValueChanged(num);
            }
            this.props?.updateValueChanged && this.props?.updateValueChanged(num);
        }} >
            {icon}
        </div>
    }
    render() {
        return <div className="counter-container">
            {this.oustomIconButton("-", false)}
            {this.oustomIconButton("+", true)}
        </div>
    }
}