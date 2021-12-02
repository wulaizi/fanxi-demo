import React, { Component } from 'react'
import {Spin, Empty} from 'antd'
import './baseComponent.css'
export default class BaseComponent extends Component {
    LOAD_ING = 0;
    LOAD_SUCCESS = 1;
    LOAD_FAILD = 2;
    LOAD_EMPTY = 3;
    constructor(props) {
        super(props)
        this.state = {
            LOAD_STATE: this.LOAD_ING
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
        return <div className="empty-load" >
            <Spin tip="Loading...">
            </Spin>
        </div>
    }

    _renderLoadFailed() {
        return <div className="empty-load">
            加载失败...
        </div>
    }

    _renderLoadEmpty() {
        return <div className="empty-load">
            < Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>
        </div>
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
                return this._renderLoadEmpty();
            default:
                return this._renderLoading();
        }
    }
    render() {
        return this._renderLoadComponents()
    }

}