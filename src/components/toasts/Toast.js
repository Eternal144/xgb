import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import '../../styles/common/card.scss';
import itemList from '../../locals/items.js';

// console.log(itemList)
// console.log("Toast:" + itemList.message)
class Toast extends Component {
    render() {
        const elements1 = [];
        const elements2 = [];
        for (let index = 0; index < 4; index++) {
            elements1.push(
                <div className="toast-location">
                    <div className="toast-item">
                        <a href={itemList.data[index].link}><img alt="toast-icon" src={itemList.data[index].icon} className="toast-icon"></img></a>
                        <p className="toast-link">{itemList.data[index].title}</p>
                    </div>
                </div>
            )
        }
        for (let index = 4; index < 8; index++) {
            elements2.push(
                <div className="toast-location">
                    <div className="toast-item">
                        <a href={itemList.data[index].link}><img alt="toast-icon" src={itemList.data[index].icon} className="toast-icon"></img></a>
                        <p className="toast-link">{itemList.data[index].title}</p>
                    </div>
                </div>
            )
        }
        return (
            <Card className="toast-card">
                <div className="toast-group1">{elements1}</div>
                <div className="toast-group2">{elements2}</div>
            </Card>
        )
    }
}

export default Toast;

