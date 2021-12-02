
import React, { Component } from 'react'
import { Input, Button ,message} from 'antd';
import './battle.css'
import ApiMethod from '../api/api';
import {
    TrophyOutlined,
    CloseOutlined
} from '@ant-design/icons';
export default class Battle extends Component {
    constructor(props) {
        super(props)
        console.log(this.props);
        this.state = {
            leftInputValue: "",
            rightInputValue: "",
            leftUserInfo: null,
            rightUserInfo: null,
            loading: false,
            flag: "leftUserInfo"
        }
    }
    handleInputValue = (type, e) => {
        this.setState({
            [type]: e.target.value
        })
    }

    getUserInfo = (type, value) => {
        this.setState({
            loading: true,
            flag: type
        }, () => {
            ApiMethod.getUserInfo(value).then(res => {
                if (res) {
                    this.setState({
                        [type]: res
                    })
                }
            }).catch(err=>{
                message.destroy();
                message.error({content:'内容不存在',style:{
                    marginTop: '30vh',
                }});
            }).finally(() => {
                this.setState({
                    loading: !this.state.loading
                })
            })
        })
    }

    removeUserInfo = (type) => {
        this.setState({
            [type]: null
        })
    }

    jumpPage = () => {
        const { leftInputValue, rightInputValue } = this.state;
        this.props.history.push(`/result?player1=${leftInputValue}&player2=${rightInputValue}`)
    }
    render() {
        const { leftInputValue, rightInputValue, leftUserInfo, rightUserInfo, loading } = this.state;
        return <div style={{ width: '100%', }}>
            <div className="content">
                <h2>Instructions</h2>
                <div className="icon-content">
                    <InstructionsItem title="Enter two Github:" icon={<i className="fa fa-users _2jxN-VXSysaUNXEOXoVAUp" style={{ fontSize: '80px', color: 'rgb(255, 191, 116)' }}></i>} />
                    <div className="center-item">
                        <InstructionsItem title="Battle" icon={<i className="fa fa-fighter-jet _2jxN-VXSysaUNXEOXoVAUp" style={{ fontSize: '80px', color: 'gray' }}></i>} />
                    </div>
                    <InstructionsItem title="See the winner" icon={<TrophyOutlined style={{ fontSize: '80px', color: 'rgb(243,232,87)' }} />} />
                </div>
                <h3>Players</h3>
            </div>
            <div className="battle-footer">
                {
                    leftUserInfo
                        ? <InstructionsCard imageUrl={leftUserInfo?.avatar_url} name={leftUserInfo?.login} onClick={() => this.removeUserInfo('leftUserInfo')} />
                        : <InstructionsInput title="Player One" buttonLable="Submit"
                            placeholder="github username"
                            disabled={!leftInputValue}
                            callback={(e) => this.handleInputValue('leftInputValue', e)}
                            onClick={() => this.getUserInfo('leftUserInfo', leftInputValue)}
                            loading={this.state.flag == "leftUserInfo" && loading}
                        />
                }
                <div className="space" />
                {
                    rightUserInfo
                        ? <InstructionsCard imageUrl={rightUserInfo?.avatar_url} name={rightUserInfo?.login} onClick={() => this.removeUserInfo('rightUserInfo')} />
                        : <InstructionsInput title="Player Two" buttonLable="Submit"
                            placeholder="github username"
                            disabled={!rightInputValue}
                            callback={(e) => this.handleInputValue('rightInputValue', e)}
                            onClick={() => this.getUserInfo('rightUserInfo', rightInputValue)}
                            loading={this.state.flag == "rightUserInfo" && loading}
                        />
                }

            </div>
            {
                leftUserInfo
                && rightUserInfo
                &&
                <div className="footer-button"><Button onClick={this.jumpPage}>
                    Battle
                </Button></div>
            }
        </div>
    }
}

const InstructionsItem = (props) => {
    return <div>
        <div className="instructions-title">{props?.title ?? ""}</div>
        <div className="instructions-item">
            {props?.icon}
        </div>
    </div>
}


const InstructionsInput = (props) => {
    return <div className="input-main">
        <h3>{props?.title ?? ""}</h3>
        <div className="input-wrap">
            <Input onKeyUp={(e)=>{
                if(e.keyCode===13){
                    props?.onClick && props?.onClick()
                }
            }} placeholder={props?.placeholder} onChange={(e) => props?.callback && props?.callback(e)} />
            <div className="space" />
            <Button loading={props?.loading}  onClick={props?.onClick && props?.onClick} disabled={props?.disabled ?? false}>{props?.buttonLable}</Button>
        </div>
    </div>
}



const InstructionsCard = (props) => {
    return <div className="input-wrap card">
        <div className="card-leading">
            <div className="img-wrap">
                <img src={props?.imageUrl ?? ""} alt="" />
            </div>
            <span >{props?.name ?? ""}</span>
        </div>
        <div className="card-trailing" onClick={props?.onClick && props?.onClick}>
            <CloseOutlined style={{ color: '#ffffff', fontWeight: 'bolder' }} />
        </div>
    </div>
}