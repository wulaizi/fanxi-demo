import React, { Component,useState } from 'react'
import iconUtil from '../../utils/iconUtil';
import './list.css'
import Counter from '../counter/counter'
const ListItem = (props) => {
    return <div className="list-container">
        <img src={iconUtil[`img${props?.sku}_1`]} alt="" width="60" height="80" />
        <div className="list-lable-conatiner">
            <div className="remove-container" onClick={()=>props?.onRemove&&props?.onRemove()}>
                <div className="remove">X</div>
            </div>
            <div className="list-lable-top">
                <div>
                    <div className="title"> {props?.title ?? ""}</div>
                    <div><span className="describe">S | {props?.style}</span></div>
                </div>
                <div className="list-lable-price">${props?.price ?? 0}</div>
            </div>
            <div className="list-counter">
            <span className="describe">Quantity:{props?.count??1}</span>
                <Counter count={props.count} updateValueChanged={(value)=>props?.onchange&&props?.onchange(value)}/>
            </div>
        </div>
    </div>
}
export default class List {
    static Item = ListItem;
}