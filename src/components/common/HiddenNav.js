import React, { Component } from 'react';
import { Nav, NavDropdown, Navbar, } from 'react-bootstrap';

class Hiddennav extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    getNavigation(data) {
        // console.log("Header:success")
        let navArray = [];
        data.forEach((x, i) => {
            let children = x.children;
            if (children.length > 0) {
                navArray.push(
                    <NavDropdown title={x.title} className="nav-dropdown  hidden-nav-dropdown">
                        {children.map((x, i) => {
                            return <NavDropdown.Item className="top-text" key="dropdownItem" eventKey={x.id} href={x.link} ><i className="fa fa-"></i>{x.title}</NavDropdown.Item>
                        })}
                    </NavDropdown>
                )
            } else {
                navArray.push(
                    <Nav.Item>
                        <Nav.Link className="hidden-nav-link" eventKey={x.id} href={x.link}>
                            {x.title}
                        </Nav.Link>
                    </Nav.Item>
                )
            }
        })
        // console.log(data);
        return navArray;
    }

    render() {
        return (
            <div>
                {this.props.isOpen ?
                    <div className="full-nav">
                        <div className="hidden-nav-box"><Nav.Item>
                            <Nav.Link className="hidden-nav-link" href={`/`}>首页</Nav.Link>
                        </Nav.Item>
                            {this.props.isReady && this.props.navData ? this.getNavigation(this.props.navData) : null}
                        </div>
                    </div>
                    :
                    <div className="full-nav-hide">
                        <div className="hidden-nav-box">
                            <Nav.Item>
                                <Nav.Link className="hidden-nav-link" href={`/`}>首页</Nav.Link>
                            </Nav.Item>
                            {this.props.isReady && this.props.navData ? this.getNavigation(this.props.navData) : null}
                        </div>
                    </div>}
            </div>

        )
    }
}

export default Hiddennav