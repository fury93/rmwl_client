import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { routerReducer } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import api from '../middleware/api';
import createLogger from 'redux-logger';
import auth from '../reducers/auth';
import app from '../reducers/application';
import reduxCrud from 'redux-crud';
import {reducer as formReducer} from 'redux-form';

import {userReducer, usersPage} from '../reducers/user';
import {productReducer, productsPage} from '../reducers/product';
import rolesPageReducer from '../reducers/admin/rolePage';
import userPermissionReducer from '../reducers/admin/userPermissionPage';

const logger = createLogger();
const rootReducer = combineReducers(
    {
        auth,
        app,

        rolesPage: rolesPageReducer,
        usersPermissionPage: userPermissionReducer,

        users: userReducer,
        usersPage,

        products: productReducer,
        productsPage,

        form: formReducer,
        routing: routerReducer
    }
);

const initialState = {};

export default function configureStore() {
    let store;
    if (module.hot) {
        store = createStore(rootReducer, initialState, compose(
            applyMiddleware(thunkMiddleware, api, logger),
            window.devToolsExtension ? window.devToolsExtension() : f => f
        ));
    } else {
        store = createStore(rootReducer, initialState, compose(
            applyMiddleware(thunkMiddleware, api), f=>f
        ));
    }

    return store;
}