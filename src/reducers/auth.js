'use strict';

import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
    AUTH_STATUS,
    AUTH_INIT,
    AUTH_SUCCESS,
    AUTH_FAILED
} from '../actions/auth';

const initialState = {
    user: {
        user: null
    },
    roles: null,
    loggingIn: false,
    loggingOut: false,
    loginError: null,
    authStatus: null
};

export default function auth(state = initialState, action = {}) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return Object.assign({}, state, {loggingIn: true, authStatus: AUTH_INIT});
        case LOGIN_SUCCESS:
            return Object.assign({}, state, {
                loggingIn: false,
                user: action.user,
                roles: action.roles,
                authStatus: AUTH_SUCCESS
            });
        case LOGIN_FAILURE:
            return {
                ...state,
                loggingIn: false,
                user: null,
                roles: null,
                loginError: action.error,
                authStatus: AUTH_FAILED
            };
        case LOGOUT_REQUEST:
            return {
                ...state,
                loggingOut: true
            };
        case LOGOUT_SUCCESS:
            return Object.assign({}, initialState);
        case LOGOUT_FAILURE:
            return {
                ...state,
                loggingOut: false,
                logoutError: action.error
            };
        case AUTH_STATUS:
            return Object.assign({}, state, {authStatus: action.status});
        default:
            return state;
    }
}
