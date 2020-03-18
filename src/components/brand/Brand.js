//品牌栏目
import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import '../../styles/common/card.scss';
import brandImg1 from '../../assets/brandImg1.png'
import brandImg2 from '../../assets/brandImg2.png'
import brandImg3 from '../../assets/brandImg3.png'
import brandImg4 from '../../assets/brandImg4.png'
import defaultImg from '../../assets/default.png';
import { BaseUrl } from '../BaseUrl';

class Brand extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    loadImg(url) {
        if (url !== null) {
            return url
        } else {
            return defaultImg
        }
    }
    listBrand = () => {
        if (this.props.brand.length > 0) {
            let list = [], len = this.props.brand.length, data = this.props.brand;
            for (let i = 0; i < len; i++) {
                list.push(
                    <div className="brand-item">
                        <a href={`/article?articleId=${data[i].mes_id}&columnId=${data[i].nav_id}`}>
                            <img alt="brand-icon" className="response brand-img" src={this.loadImg(data[i].picture)}></img>
                        </a>
                    </div>
                )
            }
            return list;
        }
    }

    render() {
        return (
            <Card id="brand-box" >
                <Card.Title id="brand-title">
                    {this.props.brand && this.props.brand[0] ? this.props.brand[0].nav_name : "获取失败"}
                </Card.Title>
                <div id="brand-box-img">
                    {this.listBrand()}
                </div>
            </Card>
        )
    }
}
export default Brand;