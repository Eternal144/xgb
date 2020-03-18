import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
// import navData from '../../test/Navi';
import listimg from '../../assets/listimg.png';
// import noticedata from '../../test/Notice';
// // import { fetchData } from '../utils';
import defaultImg from '../../assets/default.png';

import { SrcUrl } from '../BaseUrl';

//需要传入两个参数
// this.state.naviData 导航数据
// this.props.navId 一级栏目Id


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
        if (pair[0] === variable) { return pair[1]; }
    }
    return (false);
}

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
            noticeData: null,
            lowwerData: null,
            naviData: null,
        }
    }
    loadImg(url) {
        if (url !== null) {
            return url
        }
        else {
            return defaultImg
        }
    }

    getIndex(data, column) {
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
                                    if (pair[0] === "columnId" && pair[1] === column) {
                                        return i;
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
    }

    listNav() {
        // console.log(this.state.naviData)
        let navArray = [];
        let data = this.state.naviData;
        let column = getQueryVariable('columnId');
        let index = this.getIndex(data, column);
        // console.log(index);
        // console.log(data)
        if (data[index]) {
            for (let i = 0; i < data[index].children.length; i++) {
                navArray.push(
                    <Card.Text className="sidebar-card1-text">
                        <img alt="nav-icon" className="listimg" src={listimg}></img>
                        <a className="no-dec-link" href={`${this.state.naviData[index].children[i].link}`}>
                            {this.state.naviData[index].children[i].title}
                        </a>
                    </Card.Text>
                )
            }
        }
        return navArray;
        // for (let j = 0; j < this.state.naviData.length; j++) {
        //     // console.log()
        //     navArray.push(
        //         <Card.Text className="sidebar-card1-text">
        //             <img alt="nav-icon" className="listimg" src={listimg}></img>
        //             <a className="no-dec-link" href={`/column?columnId=${this.state.naviData[column].children[j].id}`}>
        //                 {this.state.naviData[column].children[j].title}
        //             </a>
        //         </Card.Text>
        //     )
        // }
        // return navArray
    }

    componentDidMount() {
        fetch(SrcUrl + `api/index/upper`, setting)
            .then(function (response) {
                return response.json();
            })
            .then(data => {
                // console.log(data.data[0])
                this.setState({
                    noticeData: data.data,
                })
            })
        fetch(SrcUrl + `api/index/lowwer/4`, setting)
            .then(function (response) {
                return response.json();
            })
            .then(data => {
                // console.log(data.data[0])
                this.setState({
                    lowwerData: data.data,
                })
            })
        fetch(SrcUrl + `api/admin/menu`, setting)
            .then(function (response) {
                return response.json();
            })
            .then(data => {
                this.setState({
                    naviData: data.data//导航数据
                })
            })
            .catch(e => console.log('错误:', e))
    }

    render() {
        // const {isFetching,navData,noticeData,tips}=this.state;
        // console.log(tips)
        // console.log(this.state.noticeData)
        // console.log(this.getPath())
        const elements = [], lowwer = [];
        if (this.state.noticeData && this.state.noticeData[2]) {
            for (let index = 0; index < this.state.noticeData[2].message.length; index++) {
                elements.push(
                    <div>
                        <Card.Text className="sidebar-notice-text">
                            <a href={`/article?articleId=${this.state.noticeData[2].message[index].id}&columnId=${this.state.noticeData[2].message[0].nav_id}`} className="no-dec-link">
                                {this.state.noticeData[2].message[index].title}
                            </a>
                        </Card.Text>
                        <div className="sidebar-notice-date">{this.state.noticeData[2].message[index].create_at}</div>
                    </div>
                    // this.noticeDate(noticeData.data, index)
                )
            }
        }

        if (this.state.lowwerData) {
            let data = this.state.lowwerData;
            for (let index = 0; index < data.length; index++) {
                lowwer.push(
                    <div className="sidebar-brand-limit">
                        <a href={`/article?articleId=${data[index].id}&columnId=${data[index].nav_id}`}>
                            <img alt="img" className="sidebar-brand-img" src={this.loadImg(data[index].picture)}>
                            </img>
                        </a>
                    </div>
                )
            }
        }

        return (
            <div className="sidebar">
                {this.state.naviData ? <Card className="sidebar-card">
                    <Card.Header className="sidebar-card-header">
                        {this.props.navTitle ? this.props.navTitle : "加载中"}
                    </Card.Header>
                    <div className="sidebar-nav">
                        {this.listNav()}
                    </div>
                </Card> : null}
                {this.state.noticeData && this.state.noticeData[2] ?
                    <Card className="sidebar-card updistance">
                        <Card.Header className="sidebar-card-header">
                            {this.state.noticeData[2] ? this.state.noticeData[2].title : "加载中"}
                        </Card.Header>
                        <div className="sidebar-list">
                            {elements}
                            <a href={`/column?columnId=${this.state.noticeData[2].nav_id}`} className="sidebar-more">查看更多</a>
                        </div>
                    </Card>
                    : null
                }
                {
                    this.state.lowwerData && this.state.lowwerData[0] ?
                        <Card className="sidebar-card updistance">
                            <Card.Header className="sidebar-card-header">
                                {this.state.lowwerData[0] ? this.state.lowwerData[0].nav_name : "加载中"}
                            </Card.Header>
                            <div className="sidebar-brand">
                                <div className="sidebar-brand-box">
                                    {lowwer}
                                </div>
                            </div>
                        </Card>
                        : null
                }

            </div>
        )
    }
}


export default Sidebar;
