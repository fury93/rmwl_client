import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import configureStore from './store/configureStore';

import App from './containers/app/App';
import Login from './containers/login/Login';
import RecoveryPassword from './containers/login/RecoveryPassword';
import ChangePassword from './containers/login/ChangePassword';
import RestrictPage from './containers/misc/RestrictPage';
import Home from './containers/home/Home';
import Users from './components/user/Users';
import Products from './components/product/Products';
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
                <Route path="/recovery-password" component={RecoveryPassword}/>
                <Route path="/change-password" component={ChangePassword}/>
                <IndexRoute component={Home}/>
                <Route component={RestrictPage}>
                    <Route path="/users" component={Users}/>
                    <Route path="/products" component={Products}/>
                    <Route path="/repos" component={ReposPage}/>
                </Route>

                <Route path="*" component={NotFound}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);
