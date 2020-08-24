import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './components/Home.jsx';
import View from './components/View.jsx';
import Submit from './components/Submit.jsx';
import Login from './components/app.jsx';

ReactDOM.render(
<BrowserRouter >
    <div>
        <Switch>
            <Route path='/' component={Login} exact={true}></Route>
            <Route path='/home' component={Home} exact={true}></Route>
            <Route path='/view' component={View} exact={true}></Route>
            <Route path="/submit" component={Submit} exact={true}></Route>
            <Route path="/submit/:id" component={Submit} exact={true}></Route>
        </Switch>
    </div>

</BrowserRouter>
, document.getElementById('app'));