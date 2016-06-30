import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import configureStore from './store/configureStore';

import App from './containers/app/App';
import Login from './containers/login/Login';
import RestrictPage from './containers/misc/RestrictPage';
import Home from './containers/home/Home';
import UsersPage from './containers/user/UsersPage';
import Users from './components/user/Users';
import ReposPage from './containers/repo/ReposPage';
import NotFound from './containers/misc/NotFound';

import './styles/index.css';

const store = configureStore();
//const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <Route path="/login" component={Login}/>
                <Route component={RestrictPage}>
                    <IndexRoute component={Home}/>
                    <Route path="/users" component={UsersPage}/>
                    <Route path="/users-list" component={Users}/>
                    <Route path="/repos" component={ReposPage}/>
                </Route>

                <Route path="*" component={NotFound}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);
