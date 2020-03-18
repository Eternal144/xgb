import React, { Component } from 'react';
import '../../styles/common/list.scss'
import navi from '../../test/Navi';
import Sidebar from '../common/Sidebar';
import passage from '../../test/Passage';
import '../../styles/common/newsdetail.scss';
import { BaseUrl, SrcUrl } from '../BaseUrl';
import defaultImg from '../../assets/default.png';


//详情页没有columnId,该怎么解决？

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

class Detail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nav: navi
        }
    }

    loadImg(url) {
        if (url !== "undefined") {
            return BaseUrl + url
        }
        else {
            return defaultImg
        }
    }

    //渲染html
    showHtml(htmlString) {
        var html = { __html: htmlString };
        return (<div dangerouslySetInnerHTML={html}></div>)
    }

    listDetail() {
        // console.log("detail:" + this.props.passagecontent)
        let elements = [];
        let files = [];
        let content = this.props.passagecontent.contentType;
        console.log(content)
        let type = content.type;
        if (type === "1") {
            for (let index = 0; index < this.props.passagecontent.activity.files.length; index++) {
                files.push(
                    <div className="fine-line">
                        附件{index + 1}：
                            <a download={this.props.passagecontent.activity.files[index].file_name} className="no-dec-link" href={SrcUrl + "uploads/appendix/" + this.props.passagecontent.activity.files[index].url}>
                            <i className="fa fa-file"></i>
                            {this.props.passagecontent.activity.files[index].file_name}
                        </a>
                    </div>
                )
            }

            elements.push(
                <div>
                    {this.props.passagecontent.activity.picture && this.props.passagecontent.message.picture !== "null" ?
                        <img alt="img" className="detail-cover" src={this.loadImg(this.props.passagecontent.activity.picture)}></img> : null}
                    <div className="detail-title">{this.props.passagecontent.activity.title}</div>
                    <div className="detail-publish">发布日期：{this.props.passagecontent.activity.created_at.substring(0, 10)}</div>
                    <div className="list-content-divline"></div>
                    <div className="row info-bar">
                        <div className="detail-large">活动日期：<span className="detail-small">{this.props.passagecontent.activity.start_time.substring(0, 10)}</span></div>
                        <div className="detail-large">主讲人：<span className="detail-small">{this.props.passagecontent.activity.speaker}</span></div>
                    </div>
                    <div className="row info-bar">
                        <div className="detail-large">活动时间：<span className="detail-small">{this.props.passagecontent.activity.start_time.substring(11, 16)}</span></div>
                        <div className="detail-large">地点：<span className="detail-small">{this.props.passagecontent.activity.location}</span></div>
                    </div>
                    <div className="display-content">
                        {this.showHtml(this.props.passagecontent.activity.details)}
                    </div>
                    <div className="files-link">
                        {files}
                    </div>
                    <div className="list-content-divline"></div>
                    <p>{}</p>
                </div>
            )
        } else if (type === "2") {
            if (this.props.passagecontent.message.files.length > 0 && this.props.passagecontent.message.files[0].file_name) {
                for (let index = 0; index < this.props.passagecontent.message.files.length; index++) {
                    files.push(
                        <div className="fine-line">
                            附件{index + 1}：
                            <a download={this.props.passagecontent.message.files[index].file_name} className="no-dec-link" href={BaseUrl + this.props.passagecontent.message.files[index].url}>
                                <i className="fa fa-file"></i>
                                {this.props.passagecontent.message.files[index].file_name}
                            </a>
                        </div>
                    )
                }
            }
            elements.push(
                <div>
                    {this.props.passagecontent.message.picture && this.props.passagecontent.message.picture !== "null" ?
                        <img alt="img" className="detail-cover" src={this.loadImg(this.props.passagecontent.message.picture)}></img> : null}
                    <div className="detail-title">{this.props.passagecontent.message.title}</div>
                    <div className="detail-publish">发布日期：{this.props.passagecontent.message.created_at.substring(0, 10)}</div>
                    <div className="list-content-divline"></div>
                    {/* <div className="row info-bar">
                        <div className="detail-large">活动日期：<span className="detail-small">{this.props.passagecontent.message.start_time.substring(0, 10)}</span></div>
                        <div className="detail-large">主讲人：<span className="detail-small">{this.props.passagecontent.message.speaker}</span></div>
                    </div>
                    <div className="row info-bar">
                        <div className="detail-large">活动时间：<span className="detail-small">{this.props.passagecontent.message.start_time.substring(11, 16)}</span></div>
                        <div className="detail-large">地点：<span className="detail-small">{this.props.passagecontent.message.location}</span></div>
                    </div> */}
                    <div className="display-content">
                        {this.showHtml(this.props.passagecontent.message.content)}
                    </div>
                    <div className="files-link">
                        {files}
                    </div>
                    <div className="list-content-divline"></div>
                    <p>{this.props.passagecontent.message.remark ? "编辑：" + this.props.passagecontent.message.remark : null}</p>
                </div>
            )
        }
        return elements;
    }

    getColumnLevel(targetId, data) {
        //根据导航栏数据，用id匹配
        console.log(data);
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
        if (this.getColumnLevel(getQueryVariable("columnId"), this.props.nav)) {
            breadCrumbList.push(<li ><a className="breadcrumb-item">{this.getColumnLevel(getQueryVariable("columnId"), this.props.nav)}</a></li>)
        }
        breadCrumbList.push(<li ><a href={"/column?columnId=" + getQueryVariable("columnId")} className="breadcrumb-itemm active">{this.props.listTitle}</a></li>)
        return (breadCrumbList);
    }

    render() {
        let column = getQueryVariable("columnId");
        return (
            <div>
                <div className="breadcrumb">
                    <div className="breadcrumb-title">{this.props.listTitle}</div>
                    <ul class="breadcrumb breadcrumb-content">
                        {this.renderBreadCrumb()}
                    </ul>
                </div>
                <div className="list-body row">
                    <div className="list-content">
                        {this.listDetail()}
                    </div>
                    <Sidebar navId={column} navData={this.props.nav} navTitle={this.getColumnLevel(column, this.props.nav)} />
                </div>
            </div>
        )
    }
}


export default Detail;