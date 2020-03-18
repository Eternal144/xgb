import React from 'react';
import { Route, Switch, Redirect, Router, Link, useParams } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import News from '../pages/xgb-news/News'
import List from '../pages/xgb-lists/Lists';
import Home from './xgb-index/Home';
// 以下为废弃代码，这里原本用于测试接口的连通性
// import Navi from '../test/Navi';
import "../styles/common/header.scss";
import Load from '../components/common/Load';
import naviDataTemp from '../test/Navi'
import { SrcUrl, BaseUrl } from '../components/BaseUrl';
//根据导航到的数据
/* 
列表/栏目 http://xxx.com/1/1/column?columnId=1
含义：http://xxx.com/{一级导航}/{二级导航}/列表?列表ID=1

文章详情 http://xxx.com/1/1/passage?columnId=1&passageId=1
含义：http://xxx.com/{一级导航}/{二级导航}/文章?列表ID=1&文章ID=1
*/

const setting = {
    method: "GET",
    headers: {
        // 'Content-Type': 'application/json;charset=UTF-8'
    },
    mode: 'cors',
    cache: 'default'
}

//这是栏目列表
// function CateList() {
//     let { id } = useParams();
//     return (
//         <List />
//     )
// }

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedID: "1",
            naviData: null,
            errorMessage: '',
            childValue: false,
            isInitial: false,
        }
    }

    getChildInfo = (value) => {
        this.setState({ childValue: value });
    }

    // getRoute() {
    //     let routeArray = [];
    //     if (this.state.isInitial) {
    //         this.state.naviData.forEach((x, i) => {
    //             let navType = x.type;
    //             if (navType === "0") {
    //                 routeArray.push(<Link key="redirect" exact to={x.link} />)
    //             } else if (navType == "1") {
    //                 routeArray.push(<Link key="redirect" exact to={x.link} />)
    //             } else if (navType == "2") {
    //                 let children = x.children;
    //                 if (children.length > 0) {
    //                     // routeArray.push(<Redirect key="redirect" exact from={`/:posA/${x.id}`} to={`/:posA/:posB/column?columnId=${children[0].id}`} />)
    //                     routeArray.push(<Link key="redirect" exact to={x.link} />)
    //                 }
    //             }
    //         })
    //         // routeArray.push(<Route key="route" path={`/:posA/column`} component={List} />);
    //         // routeArray.push(<Route key="route" path={`/:posA/:posB/column`} component={List} />);
    //     }
    //     return routeArray;
    // }

    // getNavi = () => {
    //     const { naviData } = this.state;
    //     let navLists = [];
    //     naviData.forEach((x) => {
    //         let type = parseInt(x.type)
    //         if (type === 0) { //外链
    //             navLists.push(
    //                 <li>
    //                     <a href={`http://${x.link}`} target="_blank" rel="noopener noreferrer">{x.title}</a>
    //                 </li>
    //             )
    //         } else if (type === 1) {
    //             navLists.push(
    //                 <li>
    //                     <Link to={x.link}>{x.title}</Link>
    //                 </li>
    //             )
    //         } else if (type === 2) {
    //             x.children.forEach((v) => {
    //                 navLists.push(
    //                     <li>
    //                         <Link to={v.link}>{v.title}</Link>
    //                     </li>
    //                 )
    //             }
    //             )
    //         }
    //     })
    //     return navLists;
    // }

    getRoute = () => {
        const { naviData } = this.state;
        let routeLists = [];
        naviData.forEach((x) => {
            let type = parseInt(x.type)
            if (type === 1) {
                routeLists.push(
                    <Route path={`/column`}>
                        <List />
                    </Route>
                )
                // console.log((x.link || " ").split(':')[0]);
                // if (((x.link || " ").split('?')[0]).split('/')[2] === "column") {
                //     routeLists.push(
                //         <Route path={x.link}>
                //             <List />
                //         </Route>
                //         // <Route path={`${(x.link || " ").split(':')[0]}=:id`}>
                //         //     <List />
                //         // </Route>
                //     )
                // }
            } else if (type === 2) {
                x.children.forEach((v) => {
                    routeLists.push(
                        <Route path={`/column`}>
                            <List />
                        </Route>
                    )
                    // console.log("type2:" + v.link);
                    // console.log((v.link || " ").split('=')[0]);
                    // if (((v.link || " ").split('?')[0]).split('/')[3] === "column") {
                    //     routeLists.push(
                    //         <Route path={v.link}>
                    //             <List />
                    //         </Route>
                    //         // <Route path={`${(v.link || " ").split(':')[0]}=:id`}>
                    //         //     <List />
                    //         // </Route>
                    //     )
                    // }
                })
            }
        })
        // console.log(routeLists)
        return routeLists;
    }

    componentDidMount() {
        // -------------------先用假数据----------------------
        if (!this.state.isInitial) {
            // this.setState({
            //     naviData: naviDataTemp.data,
            //     isInitial: true,
            // });
            fetch(BaseUrl + `api/admin/menu`, setting)
                .then(res => res.json())
                .then(data => {
                    // console.log(data.data)
                    this.setState({
                        naviData: data.data
                    });
                })
                .catch(e => console.log('错误码:', e));
            this.setState({
                isInitial: true,
            })
        }
    }

    render() {
        return (
            <div className="slide-away">
                {this.state.naviData ? <div>
                    <Header data={this.state.naviData} toParent={this.getChildInfo.bind(this)} isReady={this.state.isInitial} />
                    <div id="main">
                        <Switch>
                            <Route exact path="/">
                                <Home />
                            </Route>
                            <Route exact path="/article">
                                <News />
                            </Route>
                            {this.state.isInitial && this.state.naviData ? this.getRoute() : null}
                        </Switch>
                    </div>
                    <Footer />
                </div> : <Load />
                }
            </div>
        )
    }
}


export default App;
