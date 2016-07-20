import React from 'react'
import { Route, IndexRoute } from 'react-router';

import App from './containers/app/App';
import Login from './containers/login/Login';
import RecoveryPassword from './containers/login/RecoveryPassword';
import ChangePassword from './containers/login/ChangePassword';
import RestrictPage from './containers/misc/RestrictPage';
import Home from './containers/home/Home';
import RolesPage from './containers/admin/role/RolesPage';
import UsersPermissionPage from './containers/admin/role/UsersPermissionPage';
import Users from './components/user/Users';
import Products from './components/product/Products';
import NotFound from './containers/misc/NotFound';
import Forbidden from './containers/misc/Forbidden';
import Unauthorized from './containers/misc/Unauthorized';

export const routes = (
    <div>
        <Route path="/" component={App}>
            <Route path="/login" component={Login}/>
            <Route path="/recovery-password" component={RecoveryPassword}/>
            <Route path="/change-password" component={ChangePassword}/>
            <Route path="/403" component={Forbidden}/>
            <Route path="/401" component={Unauthorized}/>

            <Route component={RestrictPage}>
                <IndexRoute component={Home}/>

                <Route path="/inventory/products" component={Products}/>

                <Route path="/admin/users" component={Users}/>
                <Route path="/admin/roles" component={RolesPage}/>
                <Route path="/admin/users-permission" component={UsersPermissionPage}/>
            </Route>

            <Route path="*" component={NotFound}/>
        </Route>
    </div>
);