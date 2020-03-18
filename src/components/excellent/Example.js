//
import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
// import examples from '../../test/Examples';
import '../../styles/common/card.scss';
import backImg from '../../assets/Combined Shape@3x.png'
import { BaseUrl } from '../BaseUrl';
import defaultImg from '../../assets/default.png';

// import { fetchData } from '../utils';

// console.log("Example:success")
class Examples extends Component {
    constructor(props) {
        super(props)
        this.state = ({})
    }

    loadImg(url) {
        if (url !== null) {
            return url
        } else {
            return defaultImg
        }
    }

    listItem(item) {
        let elements = [];
        let dataLength = item.length
        if (dataLength > 3) {
            for (let index = 0; index < 3; index++) {
                if (item[index].text1 !== "") {
                    elements.push(
                        <a href={`/article?articleId=${item[index].mes_id}&columnId=${item[index].nav_id}`} className="no-dec-link">
                            <Card className="example-card">
                                <img alt="bg" className="img-background" src={backImg}></img>
                                <img alt="face" className="img-response" src={this.loadImg(item[index].picture)}></img>
                                <Card.Title className="example-text1">{item[index].content1}</Card.Title>
                                <Card.Text className="example-text2">{item[index].content2}</Card.Text>
                            </Card>
                        </a>
                    )
                }
            }
            for (let index = 3; index < item.length; index++) {
                if (item[index].text1 !== "") {
                    elements.push(
                        <a href={`/article?articleId=` + item[index].mes_id} className="no-dec-link">
                            <Card className="example-card wrap-content">
                                <img alt="bg" className="img-background" src={backImg}></img>
                                <img alt="face" className="img-response" src={this.loadImg(item[index].picture)}></img>
                                <Card.Title className="example-text1">{item[index].content1}</Card.Title>
                                <Card.Text className="example-text2">{item[index].content2}</Card.Text>
                            </Card>
                        </a>
                    )
                }
            }
        }
        else {
            for (let index = 0; index < item.length; index++) {
                if (item[index].text1 !== "") {
                    elements.push(
                        <a href={`/article?articleId=` + item[index].mes_id} className="no-dec-link">
                            <Card className="example-card">
                                <img alt="bg" className="img-background" src={backImg}></img>
                                <img alt="face" className="img-response" src={this.loadImg(item[index].picture)}></img>
                                <Card.Title className="example-text1">{item[index].content1}</Card.Title>
                                <Card.Text className="example-text2">{item[index].content2}</Card.Text>
                            </Card>
                        </a>
                    )
                }
            }
        }
        return (elements)
    }
    render() {
        // console.log(this.state.example);
        return (
            <Card id="example-body">
                <Card.Body className="example-card-body">
                    <Card.Title className="text-center" id="example-title">
                        {this.props.example[0] && this.props.example[0].nav_name ? this.props.example[0].nav_name : "获取失败"}
                    </Card.Title>
                    <Card.Subtitle className="text-center" id="example-subtitle">
                        {this.props.example[0] && this.props.example[0].description ? this.props.example[0].description : null}
                    </Card.Subtitle>
                    <div className="row" id="example-list">
                        {this.listItem(this.props.example)}
                    </div>
                </Card.Body>
            </Card>
        )
    }
}
export default Examples;