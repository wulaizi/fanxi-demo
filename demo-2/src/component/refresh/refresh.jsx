import React, { Component } from 'react'
import { Spin } from 'antd'
import BaseComponent from '../base_component/baseComponent'
import '../../pages/popular.css'
export default class Refresh extends BaseComponent {
    static defaultProps = {
        method: null,   // 子组件传过来的刷新的方法
        pageSize: 10,   // 一页展示的数量
        dataSource: false,
        count: false,
    }

    constructor(props) {
        super(props);
        this.refresh = this.refresh.bind(this);
        this.loadMore = this.loadMore.bind(this);
        this.onScrollMethod = this.onScrollMethod.bind(this);
        this.state = {
            dataList: [],   // 数据
            pageNum: 1,     // 页码
            total_pages: 0,       // 数据总数，用于分页
            refreshing: false, // 指示是否正处于刷新中
            loadMoreing: false, // 指示是否处于加载数据中
            notMoreData: false
        }
    }

    componentDidMount() {
        this.refresh();
        window.addEventListener('scroll', this.onScrollMethod)
    }
    shouldComponentUpdate(nextProps, nextState) {
        if ((nextState?.dataList instanceof Array && nextState?.dataList.length) || nextState.notMoreData) {
            if (!this.initData) {
                this.update(this.LOAD_SUCCESS)
                this.initData = true;
            }
        }
        return true
    }

    getScrollTop() {
        var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
        if (document.body) {
            bodyScrollTop = document.body.scrollTop;
        }
        if (document.documentElement) {
            documentScrollTop = document.documentElement.scrollTop;
        }
        scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
        return scrollTop;
    }


    getScrollHeight() {
        var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
        if (document.body) {
            bodyScrollHeight = document.body.scrollHeight;
        }
        if (document.documentElement) {
            documentScrollHeight = document.documentElement.scrollHeight;
        }
        scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
        return scrollHeight;
    }


    getWindowHeight() {
        var windowHeight = 0;
        if (document.compatMode == "CSS1Compat") {
            windowHeight = document.documentElement.clientHeight;
        } else {
            windowHeight = document.body.clientHeight;
        }
        return windowHeight;
    }


    onScrollMethod(e) {
        const { pageSize } = this.props;
        const { pageNum, total_pages, loadMoreing } = this.state;
        if (!loadMoreing) {
            // 判断是否还有数据
            if (pageNum < total_pages) {
                if (this.getScrollTop() + this.getWindowHeight() >= this.getScrollHeight()) {
                    this.loadMore();
                }
            }
        }
    }
    refresh() {
        // 执行刷新事件
        const { method, pageSize } = this.props;
        this.update(this.LOAD_ING)
        method && this.setState({
            refreshing: true,
        }, () => {
            method(1, pageSize, (data, total_pages) => {
                data.forEach((item, i) => {
                    item.key = i + "";
                });
                let notMoreData = false
                if (this.state.pageNum >= total_pages) {
                    notMoreData = true
                }
                this.setState({
                    dataList: data,
                    total_pages,
                    pageNum: 1,
                    refreshing: false,
                    notMoreData
                }, () => {
                    this.update(this.LOAD_SUCCESS)
                })
            })
        })
    }
    // 加载方法
    loadMore() {
        this.setState({
            loadMoreing: true
        }, () => {
            const { method, pageSize, keys } = this.props;
            let { dataList, pageNum } = this.state;
            method && method((pageNum + 1), pageSize, (data, total_pages) => {
                // 合并当前的data和新加载的data
                dataList = [...dataList, ...data];
                dataList.forEach((item, i) => {
                    item.key = (keys ? keys(item) : i + "");
                });
                // 将pageNum更新为第一页
                this.setState({
                    dataList,
                    total_pages,
                    pageNum: pageNum + 1,
                    loadMoreing: false
                })
            })
        })
    }


    renderComponent() {
        const { dataList, refreshing, pageNum, loadMoreing, total_pages } = this.state;
        const { render, dataSource, keys, } = this.props;
        dataSource && dataSource.forEach((item, i) => item.key = (keys ? keys(item) : i.toString()));
        const nullNum = (dataSource || dataList).length === 0;
        const _data = ((nullNum && !refreshing && !loadMoreing) ? [] : (dataSource || dataList));
        const _renderData = this.props?.handleData ? this.props?.handleData(_data) : _data
        return <div className="refresh-wrap">
            <div className="content-wrap">
                {(_renderData || []).map((item, index) => render(item, index, _renderData))}
            </div>
            <div className="loadingMore">
                {!refreshing
                    ? (pageNum < total_pages)
                        ? <div><Spin style={{marginRight:'30px'}}/>加载更多...</div>
                        : <div style={{width:'100%',textAlign:'center'}}>没有数据了</div>
                    : null}
            </div>
        </div>
    }
}