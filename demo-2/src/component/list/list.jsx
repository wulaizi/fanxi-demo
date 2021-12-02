import React, { Component } from 'react'
import {Image} from 'antd'
import './list.css'

const Item = (props) => {
    return <div className="list-item">
        <div className="list-item-top">
            <h2>#{props?.title ?? ""}</h2>
                <Image width="50%" placeholder={<div style={{width:'50%',textAlign:'center',verticalAlign:'middle',color:'#ffffff'}}>泛兮</div>} src={props?.image ?? "#"} alt="" />
            <h4><a href={props?.htmlUrl ?? "#"} target="_blank">{props?.fullName ?? ""}</a></h4>
        </div>
        <div className="list-item-bottom">
            <p><i className="fa fa-user" style={{ color: 'rgb(255, 191, 116)' }}></i><a target="_blank" href={props?.ownerHtmlUrl}>{props?.name}</a></p>
            <p><i className="fa fa-star" style={{ color: 'rgb(255, 215, 0)' }}></i>stars:{props?.stargazersCount ?? ""} </p>
            <p><i className="fa fa-code-fork" style={{ color: 'rgb(129, 195, 245)' }}></i>forks:{props?.forksCount ?? ""} </p>
            <p><i className="fa fa-warning" style={{ color: 'rgb(241, 138, 147)' }}></i>Open issues:{props?.issuesCount ?? ""} </p>
        </div>
    </div>
}
export default class List extends Component {
    static Item = Item;
}
