//新闻页面
import React, { Component } from 'react';
import Navi from '../../test/Navi';
import Detail from '../../components/detail/detail';
import { Collapse } from 'react-bootstrap';
import { SrcUrl } from '../../components/BaseUrl';

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


class XgbNew extends Component {
    constructor() {
        super()
        this.state = {
            naviData: Navi.data,
            navid: 1,
            navTitle: "",
            listTitle: "",
            passageContent: Detail
        }
    }

    getNavTitleById(targetId, data) {
        //根据导航栏数据，用id匹配相应的标题
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
                                        if (data[i].title) {
                                            return data[i].title;
                                        } else {
                                            return "未命名导航";
                                        }
                                    }
                                }
                            } else {
                                console.log("Error:A column is supposed to have a link");
                            }
                        }
                    } else {
                        console.log("Error:Exist father nav without son");
                    }
                } else {
                    console.log("Error:A column is supposed to have a link")
                }
            }
        return (false);
    }

    getTitleById(targetId, data) {
        //根据导航栏数据，用id匹配相应的标题
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
                                        if (data[i].children[j].title) {
                                            return data[i].children[j].title;
                                        } else {
                                            return "未命名栏目";
                                        }
                                    }
                                }
                            } else {
                                console.log("Error:A column is supposed to have a link");
                            }
                        }
                    } else {
                        console.log("Error:Exist father nav without son");
                    }
                } else if (data[i].link && data[i].type === "1") {
                    let query = data[i].link;
                    let vars = query.split("?")[1].split("&");
                    for (let i = 0; i < vars.length; i++) {
                        let pair = vars[i].split("=");
                        if (pair[0] === "columnId" && pair[1] === targetId) {
                            if (data[i].title) {
                                return data[i].title;
                            } else {
                                return "未命名栏目";
                            }
                        }
                    }
                } else {
                    console.log("Error:A column is supposed to have a link")
                }
            }
        return (false);
    }

    getNav() {
        let nav_id = getQueryVariable("columnId");
        return nav_id;
    }

    getPasId() {
        let id = getQueryVariable("articleId");
        return id;
    }

    componentDidMount() {
        console.log(this.getNav())
        console.log(this.getPasId())
        fetch(SrcUrl + `api/index/message/` + this.getNav() + "/" + this.getPasId(), setting)
            .then(function (response) {
                return response.json();
            })
            .then(data => {
                // console.log("文章内容获取：" + data.tips)
                // console.log(data.data)
                this.setState({
                    passageContent: data.data
                })
            })
            .catch(e => console.log('错误码:', e))

        fetch(SrcUrl + `api/admin/menu`, setting)
            .then(function (response) {
                return response.json();
            })
            .then(data => {
                // console.log("数据:" + data.data)
                let column = getQueryVariable("columnId");
                this.setState({
                    columnId: column,//一级导航id
                    listTitle: this.getTitleById(column, data.data),//二级导航名称
                    navTitle: this.getNavTitleById(column, data.data),//一级导航名称
                })
                this.setState({
                    naviData: data.data//导航数据
                })
            })
            .catch(e => console.log('错误:', e))
    }

    render() {
        return (
            <div className="overall">
                <Detail
                    nav={this.state.naviData}
                    navId={getQueryVariable("columnId")}
                    navTitle={this.state.navTitle}
                    listTitle={this.state.listTitle}
                    passagecontent={this.state.passageContent}
                />
            </div>
        )
    }
}
export default XgbNew;