import React, { Component } from 'react'
import BaseComponent from '../component/base_component/baseComponent'
import ApiMethod from '../api/api';
import './result.css'
import { Button, Space } from 'antd';
export default class Result extends Component {
    constructor(props) {
        super(props)
        let handleStr = props.location.search.replace("?", "");
        let params = handleStr.split('&')
        this.player1 = (params[0].split('='))[1]
        this.player2 = (params[1].split('='))[1]
        this.state = {
            player1Info: null,
            player2Info: null,
        }
    }
    componentDidMount() {
        this.getUserInfo('player1Info', this.player1)
        this.getUserInfo('player2Info', this.player2)
    }
    getUserInfo = (type, value) => {
        ApiMethod.getUserInfo(value).then(res => {
            if (res) {
                this.setState({
                    [type]: res
                })
            }
        }).finally(() => {

        })
    }
    goBack = () => {
        this.props.history.goBack()
    }
    render() {
        const { player1Info, player2Info } = this.state;
        let win = player1Info?.public_repos == player2Info?.public_repos 
        ? "equal" 
        : player1Info?.public_repos > player2Info?.public_repos

        return <>
            <div className="result-container">
                <Card win={win == "equal" ? "equal" : win} imageUrl={player1Info?.avatar_url} count={player1Info?.public_repos} />
                <Card win={win == "equal" ? "equal" : !win} imageUrl={player2Info?.avatar_url} count={player2Info?.public_repos} />
            </div>
            <div className="card-button">
                <Button onClick={this.goBack}>Reset</Button>
            </div>
        </>
    }
}

class Card extends Component {
    render() {
        const { win, imageUrl, count } = this.props;
        return (
            <div className="card-container">
                <h2>{win == 'equal' ? "equal" : win ? "Winner" : "Loser"}</h2>
                <img src={imageUrl ?? ""} alt="" />
                <span className="core">Scores:{count}</span>
                <div className="">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        )
    }
}