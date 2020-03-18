//通知公告，暂时是样式1
import React, { Component } from 'react';
import '../../styles/common/card.scss';
import { Card, Button } from 'react-bootstrap';
import newIcon from '../../assets/new.png'
import { maxHeaderSize } from 'http';
// import Notice from '../../test/Notice';
//import Notice from '../../test/fake_response.json';
//虚假的通知公告
// let noticeData = Notice.data[0];
// let headline = noticeData[0];

// console.log("S1:success")
class Style1 extends Component {

    constructor(props) {
        super(props)
        this.state = {
            content: {},
            arr: []
        }
    }

    render() {
        const renderList = [];
        if (this.props.s1data.up) {
            renderList.push(this.props.s1data.up);
            for (let i = 0; i < Math.min(8, this.props.s1data.message.length); i++) {
                renderList.push(this.props.s1data.message[i]);
            }
        }
        const elements = [];
        const dates = [];
        // console.log(this.props.s1data)
        // console.log(this.props.s1data.message[0].created_at)
        let dataLength = 0, foldLine = 0
        if (this.props.s1data && renderList) {
            dataLength = renderList.length;
            foldLine = renderList.length;
            if (renderList.length > 8) {
                dataLength = 8;
            }
            if (renderList.length > 5) {
                foldLine = 5;
            }
        }
        for (let index = 1; index < foldLine; index++) {
            elements.push(
                <Card.Text className="s1-sm-text row">
                    <a href={`/article?articleId=${renderList[index].id}&columnId=${renderList[index].nav_id}`} className="no-dec-link">
                        {renderList[index].title}
                    </a>
                </Card.Text>
            )
        }
        for (let index = 1; index < foldLine; index++) {
            dates.push(

                <div className="s1-sm-date">
                    {renderList[index].created_at ? renderList[index].created_at.substring(0, 10) : null}
                </div>
            )
        }

        if (foldLine > 5) {
            for (let index = foldLine; index < dataLength; index++) {
                elements.push(
                    <Card.Text className="s1-sm-text row s1-extra-text">
                        <a href={`/article?articleId=${this.props.s1data.message[index].id}&columnId=${this.props.s1data.message[index].nav_id}`} className="no-dec-link">
                            {this.props.s1data.message[index].title}
                        </a>
                    </Card.Text>
                )
            }
            for (let index = foldLine; index < dataLength; index++) {
                dates.push(
                    <div className="s1-sm-date">
                        {this.props.s1data.message[index].created_at.substring(0, 10)}
                    </div>
                )
            }
        }
        return (
            <Card id="s1-card">
                {this.props.isLoaded && this.props.s1data ?
                    <div>
                        <Card.Title className="s1-title">{this.props.s1data.title}</Card.Title>
                        <div className="s1-headline">
                            <Card.Text id="s1-lg-text">
                                {
                                    this.props.s1data.message ?
                                        <a href={`/article?articleId=${this.props.s1data.message[0].id}&columnId=${this.props.s1data.message[0].nav_id}`} className="no-dec-link">
                                            {this.props.s1data.message[0].title}
                                        </a>
                                        : null
                                }
                                <img alt="new" className="newIcon" src={newIcon}></img>
                            </Card.Text>
                            <div className="s1-lg-date">
                                {this.props.s1data.message[0].created_at ? this.props.s1data.message[0].created_at.substring(0, 10) : null}
                            </div>
                        </div>
                        <div className="row s1-content-group">
                            <div className="s1-left">
                                {elements}
                            </div>
                            <div className="s1-right">
                                {dates}
                            </div>
                        </div>
                        <Button href={"/column?columnId=" + this.props.s1data.nav_id} className="s1-view-more">查看更多</Button>
                    </div> : <p>获取失败</p>}
            </Card>
        )
    }
}
export default Style1;