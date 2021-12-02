import React, { Component } from 'react'
import {Modal} from 'antd'
export default class ModalComponent extends Component {


    render() {
        const {handleOk,handleCancel,confirmLoading=false,title,modalText,visible}=this.props
        return <Modal
            title={title}
            visible={visible}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
        >
            <p>{modalText}</p>
        </Modal>
    }
}