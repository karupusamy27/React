import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import View from './components/View.jsx';
import Submit from './components/Submit.jsx';
import Login from './components/app.jsx';
import reducer from './Reducer/Reducer.jsx';
import viewList from './Action/Action.jsx';

//store
const store = createStore(reducer, []);

//subscribe
store.subscribe(() =>
    console.log("Claim List Details:", store.getState())
);

//dispatch Action
store.dispatch(viewList());

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter >
            <div>
                <Switch>
                    <Route path='/' component={Login} exact={true}></Route>
                    <Route path='/view' component={View} exact={true}></Route>
                    <Route path="/submit" component={Submit} exact={true}></Route>
                    <Route path="/submit/:id" component={Submit} exact={true}></Route>
                </Switch>
            </div>

        </BrowserRouter>
    </Provider>
    , document.getElementById('app'));