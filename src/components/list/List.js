import React, { Component } from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import '../../styles/common/list.scss'
import Sidebar from '../common/Sidebar';
import { throwStatement } from '@babel/types';
import defaultimg from '../../assets/default.png';
import { BaseUrl, SrcUrl } from '../BaseUrl';

const setting = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    mode: 'cors',
    cache: 'default'
}

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
    return (false);
}

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentpage: 1,
            navTitle: null,
            listData: null,
            isRefreshed: true,
            isLoaded: false,
            isNavLoaded: false,
        }
    }

    slicePassage(x) {
        if (x.length < 90) {
            return x
        } else {
            return (
                x.substring(0, 90)
            )
        }
    }

    getSimpleText(html) {
        // var re1 = new RegExp(/<[^>]*>|/g,"");//匹配html标签的正则表达式，"g"是搜索匹配多个符合的内容
        var msg = html.replace(/<[^>]*>|/g, '');//执行替换成空字符
        var re = new RegExp("<(?!img|br|p|/p).*?>", "g"); // 创建正则表达式对象。
        msg = msg.replace(re, ""); //去掉所有的html标记
        return msg;
    }

    handlePageChange(x) {
        let temp = this.state.currentpage
        if (x === 0 && temp + 1 <= parseInt(this.state.listData.count / 15) + 1) {//下一页
            temp += 1
        }
        if (x === -1 && temp > 1) {//上一页
            temp -= 1
        }
        if (x > 0) {
            temp = x
        }
        if (temp !== this.state.currentpage) {
            this.setState({
                currentpage: temp,
                isRefreshed: false,
            })
        }
    }

    //切分页面，用作翻页
    divPage() {
        let buttons = [];
        let pages = parseInt(this.state.listData.count / 15) + 1;
        if (pages > 1 && pages < 8) {
            for (let index = 0; index < pages; index++) {
                if (index === this.state.currentpage - 1) {
                    buttons.push(
                        <Button className="active-page page-button">{index + 1}</Button>
                    )
                }
                else {
                    buttons.push(
                        <Button onClick={this.handlePageChange.bind(this, index + 1)} className="page-button">{index + 1}</Button>
                    )
                }
            }
        } else if (pages > 7) {
            for (let index = this.state.currentpage - 1; index < this.state.currentpage + 6; index++) {
                if (index === this.state.currentpage - 1) {
                    buttons.push(
                        <Button className="active-page page-button">{index + 1}</Button>
                    )
                }
                else {
                    buttons.push(
                        <Button onClick={this.handlePageChange.bind(this, index + 1)} className="page-button">{index + 1}</Button>
                    )
                }
            }
            buttons.push(
                <Button className="page-button">…</Button>
            )
            if (pages - 1 === this.state.currentpage) {
                buttons.push(
                    <Button className="active-page page-button">{pages}</Button>
                )
            }
            else {
                buttons.push(
                    <Button className="page-button">{pages}</Button>
                )
            }
        }

        return (
            <ButtonGroup className="page-change mr-2" aria-label="First group">
                {pages > 1 ? <Button onClick={this.handlePageChange.bind(this, -1)} className="page-button"><i className="fa fa-angle-left"></i></Button>
                    : null}
                {/* <Button onClick={this.handlePageChange.bind(this, -1)} className="page-button"><i className="fa fa-angle-left"></i></Button> */}
                {buttons}
                {pages > 1 ? <Button onClick={this.handlePageChange.bind(this, 0)} className="page-button"><i className="fa fa-angle-right"></i></Button>
                    : null}
                {/* <Button onClick={this.handlePageChange.bind(this, 0)} className="page-button"><i className="fa fa-angle-right"></i></Button> */}
            </ButtonGroup>
        )
    }

    listItem() {
        let len = this.state.listData.message.length;
        let elements = [];
        if (this.state.listData.listType === "1") {
            for (let index = 0; index < len; index++) {
                elements.push(
                    <div className="l1-content row">
                        <div className="l1-title">
                            <a className="no-dec-link" href={`/article?articleId=${this.state.listData.message[index].id}&columnId=${this.state.listData.message[index].nav_id}`}>
                                {this.state.listData.message[index].title}
                            </a>
                        </div>
                        <div className="l1-date">
                            {this.state.listData.message[index].created_at.substring(0, 10)}
                        </div>
                    </div>
                )
            }
        }
        else if (this.state.listData.listType === "2") {
            for (let index = 0; index < len; index++) {
                elements.push(
                    <div className="l3-content row">
                        <div className="l3-img-box">
                            {
                                this.state.listData.message[index].icon !== null ?
                                    <img alt="img" className="l3-img" src={BaseUrl + this.state.listData.message[index].icon}></img>
                                    :
                                    <img alt="img" className="l3-img" src={defaultimg}></img>
                            }

                        </div>
                        <div className="l3-right">
                            <div className="l3-title">
                                <a className="no-dec-link" href={`/article?articleId=${this.state.listData.message[index].id}&columnId=${this.state.listData.message[index].nav_id}`}>
                                    {this.state.listData.message[index].title}
                                </a>
                            </div>
                            <div className="l3-date">
                                {this.state.listData.message[index].created_at.substring(0, 10)}
                            </div>
                            <div className="l3-message">
                                {this.slicePassage(this.getSimpleText(this.state.listData.message[index].content)) + '…'}
                            </div>
                        </div>
                    </div>

                )
            }
        }
        return elements
    }

    getColumnLevel(targetId, data) {
        //根据导航栏数据，用id匹配
        if (data)
            for (let i = 0; i < data.length; i++) {
                if (data[i].type === "2") {
                    if (data[i].children) {
                        for (let j = 0; j < data[i].children.length; j++) {
                            if (data[i].children[j].link && data[i].children[j].type === "1") {
                                let query = data[i].children[j].link;
                                let vars = query.split("?")[1].split("&");
                                for (let i = 0; i < vars.length; i++) {
                                    let pair = vars[i].split("=");
                                    if (pair[0] === "columnId" && pair[1] === targetId) {
                                        let targetTitle = data[i].title
                                        return targetTitle;
                                    }
                                }
                            } else {
                                console.log("Error:A column is supposed to have a link");
                            }
                        }
                    } else {
                        console.log("Error:Exist father nav without son");
                    }
                }
            }
        return (false);
    }

    renderBreadCrumb() {
        let breadCrumbList = [];
        breadCrumbList.push(<li ><a href="/" className="breadcrumb-item">首页</a></li>);
        if (this.getColumnLevel(this.props.navId, this.props.nav)) {
            breadCrumbList.push(<li ><a className="breadcrumb-item">{this.getColumnLevel(this.props.navId, this.props.nav)}</a></li>)
        }
        breadCrumbList.push(<li ><a href={"/column?columnId=" + getQueryVariable("columnId")} className="breadcrumb-itemm active">{this.props.listTitle}</a></li>)
        return (breadCrumbList);
    }

    componentDidUpdate() {
        if (!this.state.isRefreshed) {
            let nav_id = getQueryVariable("columnId");
            fetch(SrcUrl + `api/index/messageList/` + nav_id + "/" + this.state.currentpage, setting)
                .then(function (response) {
                    return response.json();
                })
                .then(data => {
                    // console.log("更新原因：触发页面切换")
                    // console.log(data.data)
                    this.setState({
                        listData: data.data,
                        isRefreshed: true,
                    })
                })
                .catch(e => console.log('错误码:', e))
        }
    }

    componentWillReceiveProps() {
        fetch(SrcUrl + `api/index/messageList/` + getQueryVariable('columnId') + "/1", setting)
            .then(function (response) {
                return response.json();
            })
            .then(data => {
                // console.log(data)
                this.setState({
                    listData: data.data,
                    isLoaded: true,
                })
            })
            .catch(e => console.log('错误码:', e))
    }


    componentDidMount() {
        if (!this.state.isLoaded) {
            fetch(SrcUrl + `api/index/messageList/` + getQueryVariable('columnId') + "/1", setting)
                .then(function (response) {
                    return response.json();
                })
                .then(data => {
                    // console.log(data)
                    this.setState({
                        listData: data.data,
                        isLoaded: true,
                    })
                })
                .catch(e => console.log('错误码:', e))
        }
    }

    render() {
        // console.log(this.props.listTitle)
        return (
            <div className="overall">
                <div className="breadcrumb">
                    <div className="breadcrumb-title">{this.props.listTitle}</div>
                    <ul class="breadcrumb breadcrumb-content">
                        {this.renderBreadCrumb()}
                    </ul>
                </div>

                <div className="list-body row">
                    <div className="list-content">
                        <div className="list-content-divline"></div>
                        {this.state.isLoaded && this.state.listData ? this.listItem() : null}
                        {this.state.isLoaded && this.state.listData ? this.divPage() : null}
                    </div>
                    <Sidebar navId={getQueryVariable('columnId')} navData={this.props.nav} navTitle={this.getColumnLevel(this.props.navId, this.props.nav)} />
                </div>
            </div>
        )
    }
}


export default List;