import React from 'react';
import { Image, Button, Card } from 'react-bootstrap';
import bg from '../../assets/officehall.jpg';
import icon from '../../assets/officehall.png';

const Officehall = () => {
    return (
        <Card id="officehall" className="text-center">
            <Image id="officehall-img" src={bg} fluid></Image>
            <Card.ImgOverlay id="officehall-body">
                <div id="officehall-body-cover">
                    <Card.Title id="officehall-title">网上办事大厅</Card.Title>
                    <Card.Text id="officehall-sub-title"><img alt="officeHall" src={icon} id="officehall-sub-title-padding">
                    </img>天津大学综合服务指南</Card.Text>
                    <Button href="http://service.tju.edu.cn/" id="officehall-link-button">
                        前往办理
                    </Button>
                </div>
            </Card.ImgOverlay>
        </Card>

    )
}
export default Officehall;