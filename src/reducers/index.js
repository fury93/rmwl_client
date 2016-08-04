import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import auth from '../reducers/auth';
import app from '../reducers/application';
import {reducer as formReducer} from 'redux-form';
import {userReducer, usersPage} from '../reducers/user';
import {productReducer, productsPage} from '../reducers/product';
import {locationReducer, locationsPage} from '../reducers/location';
import {vendorReducer, vendorsPage} from '../reducers/vendor';
import rolesPageReducer from '../reducers/admin/rolePage';
import userPermissionReducer from '../reducers/admin/userPermissionPage';


const rootReducer = combineReducers(
    {
        auth,
        app,

        rolesPage: rolesPageReducer,
        usersPermissionPage: userPermissionReducer,

        users: userReducer,
        usersPage,

        locations: locationReducer,
        locationsPage,

        vendors: vendorReducer,
        vendorsPage,

        products: productReducer,
        productsPage,

        form: formReducer,
        routing: routerReducer
    }
);

export default rootReducer;
