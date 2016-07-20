'use strict';
//import * as auth from '../actions/auth';
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
    AUTH_FAILED,
    RECOVERY_PASS_STATUS,
    RECOVERY_PASS_INIT,
    RECOVERY_PASS_SUCCESS,
    RECOVERY_PASS_FAILURE,
    CHANGE_PASS_STATUS,
    CHANGE_PASS_INIT,
    CHANGE_PASS_SUCCESS,
    CHANGE_PASS_FAILURE
} from '../actions/auth';

const initialState = {
    user: null,
    roles: null,
    loggingIn: false,
    loggingOut: false,
    loginError: null,
    authStatus: null,
    recoveryPassword: {
        status: null,
        msg: null
    },
    changePassword: {
        status: null,
        msg: null
    }
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
            return Object.assign({}, state, {
                loggingIn: false,
                user: null,
                roles: null,
                loginError: action.error,
                authStatus: AUTH_FAILED
            });
        case LOGOUT_REQUEST:
            return Object.assign({}, state, {
                loggingOut: true
            });
        case LOGOUT_SUCCESS:
            return Object.assign({}, initialState);
        case LOGOUT_FAILURE:
            return Object.assign({}, state, {
                loggingOut: false,
                logoutError: action.error
            });
        case AUTH_STATUS:
            return Object.assign({}, state, {authStatus: action.status});
        case RECOVERY_PASS_STATUS:
            return Object.assign({}, state, {
                recoveryPassword: {
                    status: action.status,
                    msg: action.msg
                }
            });
        case CHANGE_PASS_STATUS:
            return Object.assign({}, state, {
                changePassword: {
                    status: action.status,
                    msg: action.msg
                }
            });
        default:
            return state;
    }
}
