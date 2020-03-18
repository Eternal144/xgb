//天大新闻，暂时是样式2
import React, { Component } from 'react';
import '../../styles/common/card.scss';
import { Card, Row } from 'react-bootstrap';
import { BaseUrl } from '../BaseUrl';
import defaultImg from '../../assets/default.png';
// import news from '../../test/News';

// console.log("S2:success")
const getText = (text) => {
    let reg = /<\/?.+?\/?>/g;
    return text.replace(reg, '')
}

class Style2 extends Component {

    loadImg(url) {
        if (url !== "null") {
            return BaseUrl + url
        }
        else {
            return defaultImg
        }
    }


    render() {
        return (
            <Card id="s2-card">
                {/* 以下代码测试后恢复 */}
                {this.props.isLoaded && this.props.s2data ?
                    this.props.s2data.up ? <div>
                        <Row id="s2-component">
                            <Card.Body id="s2-img-container">
                                <div className="s2-img-with-title">
                                    <img alt="s2-img" src={this.loadImg(this.props.s2data.up.picture)} className="s2-img"></img>
                                    <Card.Text className="s2-text1">{this.props.s2data.up.title}</Card.Text>
                                </div>
                            </Card.Body>
                            <Card.Body id="s2-content">
                                <Card.Title id="s2-title">{this.props.s2data.title}</Card.Title>
                                <Card.Text className="s2-date">{this.props.s2data.up.created_at.substring(0, 10)}</Card.Text>
                                <Card.Text className="s2-text2">{this.props.s2data.up.content ? getText(this.props.s2data.up.content).substring(0, 100) + "…" : null}</Card.Text>
                                <a href={`/article?articleId=${this.props.s2data.up.id}&columnId=${this.props.s2data.up.nav_id}`} className="s2-more">查看详情</a>
                            </Card.Body>
                        </Row>
                    </div> : <div>
                    <Row id="s2-component">
                        <Card.Body id="s2-img-container">
                            <div className="s2-img-with-title">
                                <img alt="s2-img" src={this.loadImg(this.props.s2data.message[0].picture)} className="s2-img"></img>
                                <Card.Text className="s2-text1">{this.props.s2data.message[0].title}</Card.Text>
                            </div>
                        </Card.Body>
                        <Card.Body id="s2-content">
                            <Card.Title id="s2-title">{this.props.s2data.title}</Card.Title>
                            <Card.Text className="s2-date">{this.props.s2data.message[0].created_at.substring(0, 10)}</Card.Text>
                            <Card.Text className="s2-text2">{this.props.s2data.message[0].content ? getText(this.props.s2data.message[0].content).substring(0, 100) + "…" : null}</Card.Text>
                            <a href={`/article?articleId=${this.props.s2data.message[0].id}&columnId=${this.props.s2data.message[0].nav_id}`} className="s2-more">查看详情</a>
                        </Card.Body>
                    </Row>
                </div>
                    :
                    <p>获取失败</p>
                }
            </Card>
        )
    }
}
export default Style2;