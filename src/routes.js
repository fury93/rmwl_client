import React from 'react'
import { Route, IndexRoute } from 'react-router';

import App from './containers/app/App';
import Login from './containers/login/Login';
import RecoveryPassword from './containers/login/RecoveryPassword';
import ChangePassword from './containers/login/ChangePassword';
import RestrictPage from './containers/misc/RestrictPage';
import Home from './containers/home/Home';
import RolesPage from './containers/role/RolesPage';
import Users from './components/user/Users';
import Products from './components/product/Products';
import NotFound from './containers/misc/NotFound';

export const routes = (
    <div>
        <Route path="/" component={App}>
            <Route path="/login" component={Login}/>
            <Route path="/recovery-password" component={RecoveryPassword}/>
            <Route path="/change-password" component={ChangePassword}/>
            <Route component={RestrictPage}>
                <IndexRoute component={Home}/>
                <Route path="/users" component={Users}/>
                <Route path="/products" component={Products}/>

                <Route path="/admin/roles" component={RolesPage}/>
            </Route>

            <Route path="*" component={NotFound}/>
        </Route>
    </div>
);