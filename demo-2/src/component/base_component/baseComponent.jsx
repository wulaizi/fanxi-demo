import React, { Component } from 'react'
import {Spin} from 'antd'
export default class BaseComponent extends Component {
    LOAD_ING = 0;
    LOAD_SUCCESS = 1;
    LOAD_FAILD = 2;
    LOAD_EMPTY = 3;
    constructor(props) {
        super(props)
        this.state = {
            LOAD_STATE: this.LOAD_FAILD
        }
    }
    update(state, callback = () => { }) {
        if (this.state.LOAD_STATE !== state) {
            this.setState({
                LOAD_STATE: state
            }, callback)
        }
    }
    refresh() {

    }
    _renderLoading() {
        return <div  style={{ display: 'flex', justifyContent: "center", alignItems: "center",width:'100%',height:'300px' }}>
            <Spin tip="Loading...">
            </Spin>
        </div>
    }

    _renderLoadFailed() {
        return <div style={{ display: 'flex', justifyContent: "center", alignItems: "center" }}>
            加载失败...
        </div>
    }

    _renderLoadEmpty() {
        return null
    }
    renderComponent() {
        return null
    }

    _renderLoadComponents() {
        switch (this.state.LOAD_STATE) {
            case this.LOAD_SUCCESS:
                try {
                    return this.renderComponent();
                } catch (error) {
                    return this._renderLoadFailed();
                }
            case this.LOAD_FAILD:
                return this._renderLoadFailed();
            case this.LOAD_EMPTY:
                return this.renderComponent();
            // return this._renderLoadEmpty();
            default:
                return this._renderLoading();
        }
    }
    render() {
        return this._renderLoadComponents()
    }

}