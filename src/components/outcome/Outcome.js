//学工成果
import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import '../../styles/common/card.scss';
import { BaseUrl } from '../BaseUrl';
import defaultImg from '../../assets/default.png';

// import outcome from '../../test/Outcome';

// console.log("Outcome:success")
class Outcome extends Component {

    loadImg(url) {
        if (url !== null) {
            return  url
        }
        else {
            return defaultImg
        }
    }
    listItem(item) {
        let elements = [];
        let dataLength = item.length
        if (dataLength > 2) {
            for (let index = 0; index < 2; index++) {
                if (item[index].title !== "") {
                    elements.push(
                        <a href={`/article?articleId=${item[index].mes_id}&columnId=${item[index].nav_id}`} className="no-dec-link">
                            <Card className="outcome-card">
                                <div className="outcome-img-box">
                                    <img className="outcome-img" alt="outcome-img" src={this.loadImg(item[index].picture)}></img>
                                </div>
                                <Card.Title className="outcome-text">{item[index].content1}</Card.Title>
                            </Card>
                        </a>
                    )
                }
            }
            for (let index = 2; index < item.length; index++) {
                if (item[index].title !== "") {
                    elements.push(
                        <a href={`/article?articleId=${item[index].mes_id}&columnId=${item[index].nav_id}`} className="no-dec-link">
                            <Card className="outcome-card wrap-content">
                                <div className="outcome-img-box">
                                    <img className="outcome-img" alt="outcome-img" src={this.loadImg(item[index].picture)}></img>
                                </div>
                                <Card.Title className="outcome-text">{item[index].content1}</Card.Title>
                            </Card>
                        </a>
                    )
                }
            }
        } else {
            for (let index = 0; index < item.length; index++) {
                if (item[index].title !== "") {
                    elements.push(
                        <a href={`/article?articleId=${item[index].mes_id}&columnId=${item[index].nav_id}`} className="no-dec-link">
                            <Card className="outcome-card">
                                <div className="outcome-img-box">
                                    <img alt="outcome-img" src={this.loadImg(item[index].picture)}></img>
                                </div>
                                <Card.Title className="outcome-text">{item[index].content1}</Card.Title>
                            </Card>
                        </a>
                    )
                }
            }
        }
        return (elements)
    }
    render() {
        return (
            <Card>
                <Card.Body id="outcome-body">
                    <Card.Title className="text-center" id="outcome-title">
                        {this.props.outcome && this.props.outcome[0] ? this.props.outcome[0].nav_name : "获取失败"}
                    </Card.Title>
                    <div className="row" id="outcome-list">
                        {this.listItem(this.props.outcome)}
                    </div>
                </Card.Body>
            </Card>
        )
    }
}
export default Outcome;