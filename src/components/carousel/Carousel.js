import React, { Component } from 'react';
import '../../styles/common/carousel.scss'
// import banner from '../../test/Banner';
import { Carousel, Image } from "react-bootstrap";
import { BaseUrl } from '../BaseUrl';

// console.log("Carousel:success")
class CarouselTop extends Component {
    listItem() {
        let elements = [];
        for (let index = 0; index < this.props.banner.length; index++) {
            elements.push(
                <Carousel.Item>
                    <div className="w1000">
                        {/* 以下代码测试后恢复 */}
                        <Image className="index-carousel-img" src={BaseUrl + this.props.banner[index].picture} fluid></Image>
                        {/* <Image className="index-carousel-img" src={this.props.banner[index].picture} fluid></Image> */}
                        <Carousel.Caption className="carousel-title"><a href={`/article?articleId=${this.props.banner[index].mes_id}&columnId=${this.props.banner[index].nav_id}`} className="no-dec">{this.props.banner[index].title}</a></Carousel.Caption>
                    </div>
                </Carousel.Item>
            )
        }
        return (elements)
    }
    render() {
        // console.log(this.props.banner)
        return (
            <div id="index-carousel" className="index-carousel-cover">
                <Carousel pauseOnHover={true}>
                    {this.listItem()}
                </Carousel>
            </div >
        )
    }
}
export default CarouselTop;