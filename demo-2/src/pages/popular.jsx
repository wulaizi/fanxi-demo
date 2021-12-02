import React, { Component, PureComponent } from 'react';
import List from '../component/list/list';
import NavBar from '../component/navbar/navbar';
import Api from '../api/api';
import './popular.css'
import Refresh from '../component/refresh/refresh';
import { Row, Col } from 'antd'
const NAV_LABEL = ["All", "JavaScript", "Ruby", "Java", "CSS"]
export default class Popular extends Component {

    constructor(props) {
        super(props)
        this.initData = false
        this.state = {
            currentTab: "All",
            renderData: {}
        }
    }
    /**
     * Tab切换
     * @param {*} item 
     */
    changeTab = (item) => {
        this.setState({
            currentTab: item
        }, () => {
            this.popularRef && this.popularRef.refresh()
        })
    }
    /**
     * 请求数据
     * @param {*} pageNo 页码
     * @param {*} pageSize 请求数量
     * @param {*} result 回调
     */
    requireData = (pageNo, pageSize, result) => {
        let currentTap = this.state.currentTab.toLowerCase();
        let qParams = currentTap == "all" ? 'stars:>1' : `stars:>1 language:${currentTap}`
        Api.searchRepositories({
            q: qParams,
            sort: "stars",
            order: "desc",
            type: "Repositories",
            page: pageNo
        }).then(res => {
            if (res?.items && res?.items.length) {
                result(res?.items, Math.ceil(res?.total_count / 30))
            } else {
                result && result([], 0)
            }
        }).catch((err) => {
            result && result([], 0)
        })
    }
    render() {
        const { currentTab, renderData } = this.state;
        return <div>
            <NavBar data={NAV_LABEL} active={currentTab} onChange={this.changeTab} />
            <Row>

                <Refresh
                    method={this.requireData}
                    ref={ref => this.popularRef = ref}
                    render={(item, index) => {
                        return <Col key={item.key + ""} xs={24} sm={12} md={8} lg={6}>
                            <List.Item
                                title={index + 1}
                                image={item?.owner?.avatar_url}
                                name={item?.name}
                                fullName={item?.full_name}
                                htmlUrl={item?.html_url}
                                ownerHtmlUrl={item?.owner?.html_url}
                                stargazersCount={item?.stargazers_count}
                                forksCount={item?.forks_count}
                                issuesCount={item?.open_issues_count}
                            />
                        </Col>
                    }}
                />
            </Row>
        </div>
    }
}



