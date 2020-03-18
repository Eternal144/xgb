import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import App from './pages/App'
import NotFound from './pages/404';
// import items from './locals/items';
// import Lists from './components/list/List'

// const aa = ()=>{
//     console.log(items.itemsList);
// }
// let list = items.itemsList;
const Root = () => {
    return (
        <Switch >
            <Route path='/404' component={NotFound} />
            <Route path='/' component={App} />
        </Switch>
    );
}

export default Root;