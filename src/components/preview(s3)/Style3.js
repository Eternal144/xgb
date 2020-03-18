//活动预告
import React, { Component } from 'react';
import '../../styles/common/card.scss';
import { Card, Button } from 'react-bootstrap';

// console.log("S3:success")
class Style3 extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    sliceYear(date) {
        return (
            date.substr(0, 4)
        )
    }
    sliceDate(date) {
        return (
            date.substr(5, 9)
        )
    }

    readMore() {
        let moreLink = "";
        if (this.props.s3data) {
            moreLink = this.props.s3data.nav_id;
            return (<Button href={`/column?columnId=` + moreLink} className="s3-view-more">查看更多</Button>)
        }
    }

    render() {
        let renderList = [];
        let elements = [], elementss = [];
        if (this.props.s3data.up) {
            renderList.push(this.props.s3data.up);
            for (let i = 0; i < Math.min(5, this.props.s3data.message.length); i++) {
                renderList.push(this.props.s3data.message[i]);
            }
        }
        if (this.state.isLoaded) {
            for (let index = 0; index < 6; index++) {
                if (renderList[index].title) {
                    elements.push(
                        <Card className="s3-content-card row">
                            <div className="s3-left">
                                <div className="s3-year">
                                    {
                                        renderList[index].start_date.substr(0, 4)
                                    }
                                </div>
                                <div className="s3-date">
                                    {
                                        renderList[index].start_date.substr(5, 5)
                                    }
                                </div>
                            </div>
                            <div className="s3-right">
                                <Card.Title className="s3-text">
                                    <a href={`/article?articleId=${renderList[index].id}&columnId=${renderList[index].nav_id}`} className="no-dec-link">
                                        {
                                            renderList[index].title
                                        }
                                    </a>
                                </Card.Title>
                                <Card.Text className="s3-info">
                                    <div className="s3-speaker"><div className="s3-hide">主讲人:</div>{renderList[index].speaker}</div>
                                    <div className="s3-line2">
                                        <div className="s3-time"><div className="s3-hide">时间:</div>{renderList[index].start_time ? renderList[index].start_time.substr(0, 5) : "时间待定"}</div>
                                        <div className="s3-location"><div className="s3-hide">地点:</div> {renderList[index].location}</div>
                                    </div>
                                </Card.Text>
                            </div>
                        </Card>
                    )
                }
            }
        } else if (this.props.s3data && renderList) {
            for (let index = 0; index < renderList.length; index++) {
                if (renderList[index].title) {
                    elements.push(
                        <Card className="s3-content-card row">
                            <div className="s3-left">
                                <div className="s3-year">
                                    {renderList[index].start_date ?
                                        renderList[index].start_date.substr(0, 4) : "未定义"
                                    }
                                </div>
                                <div className="s3-date">
                                    {renderList[index].start_date ?
                                        renderList[index].start_date.substr(5, 5) : "未定义"
                                    }
                                </div>
                            </div>
                            <div className="s3-right">
                                <Card.Title className="s3-text">
                                    <a href={`/article?articleId=${renderList[index].id}&columnId=${renderList[index].nav_id}`} className="no-dec-link">
                                        {
                                            renderList[index].title
                                        }
                                    </a>
                                </Card.Title>
                                <Card.Text className="s3-info">
                                    <div className="s3-speaker"><div className="s3-hide">主讲人:</div>{renderList[index].speaker}</div>
                                    <div className="s3-line2">
                                        <div className="s3-time"><div className="s3-hide">时间:</div>{renderList[index].start_time ? renderList[index].start_time.substr(0, 5) : "时间待定"}</div>
                                        <div className="s3-location"><div className="s3-hide">地点:</div> {renderList[index].location}</div>
                                    </div>
                                </Card.Text>
                            </div>
                        </Card>
                    )
                }
            }

        }
        return (
            <Card id="s3-card">
                {this.props.isLoaded ? <div>
                    <Card.Title className="s1-title">{this.props.s3data ? this.props.s3data.title : "获取失败"}</Card.Title>
                    <Card.Body id="s3-content">
                        {elements}
                        <div className="wrap-content">
                            {elementss}
                        </div>
                        {this.readMore()}
                    </Card.Body>
                </div> : null}
            </Card>
        )
    }
}

export default Style3;