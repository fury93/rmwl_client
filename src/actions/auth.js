import 'isomorphic-fetch';
import {
    ID_TOKEN,
    checkStatus,
    parseJSON,
    setIdToken,
    removeIdToken,
    getUserToken,
    parseError
} from '../utils/utils';
import { CALL_API } from '../middleware/api';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export const AUTH_STATUS = 'AUTH_STATUS';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILED = 'AUTH_FAILED';
export const AUTH_INIT = 'AUTH_INIT';

export const RECOVERY_PASS_STATUS = 'RECOVERY_PASS_STATUS';
export const RECOVERY_PASS_INIT = 'RECOVERY_PASS_INIT';
export const RECOVERY_PASS_SUCCESS = 'RECOVERY_PASS_SUCCESS';
export const RECOVERY_PASS_FAILURE = 'RECOVERY_PASS_FAILURE';

export const CHANGE_PASS_STATUS = 'CHANGE_PASS_STATUS';
export const CHANGE_PASS_INIT = 'CHANGE_PASS_INIT';
export const CHANGE_PASS_SUCCESS = 'CHANGE_PASS_SUCCESS';
export const CHANGE_PASS_FAILURE = 'CHANGE_PASS_FAILURE';

//Auth
export function changeAuthStatus(payload, status) {
    return {
        type: AUTH_STATUS,
        status
    };
}

//Recovery password
export function changeRecoveryPassStatus(msg, status) {
    return {
        type: RECOVERY_PASS_STATUS,
        status,
        msg: msg.message || msg
    };
}

//Change password
export function changePasswordStatus(msg, status) {
    return {
        type: CHANGE_PASS_STATUS,
        status,
        msg: msg.message || msg
    };
}

//Login
function loginRequest() {
    return {
        type: LOGIN_REQUEST
    };
}

function loginSuccess(data) {
    const {user, roles, vendorStatus }= data;

    setIdToken(JSON.stringify(user.token));

    return {
        type: LOGIN_SUCCESS,
        payload: data
    };
}

function loginFailure(error) {
    removeIdToken();

    return {
        type: LOGIN_FAILURE,
        error
    };
}

//Logout
function logoutRequest() {
    return {
        type: LOGOUT_REQUEST
    };
}

function logoutSuccess() {
    removeIdToken();

    return {
        type: LOGOUT_SUCCESS
    };
}

function logoutFailure(error) {
    return {
        type: LOGOUT_FAILURE,
        error
    };
}

//Action methods
export function login(username, password, rememberMe) {
    return {
        [CALL_API]: {
            endpoint: '/v1/user/login',
            method: 'post',
            types: [loginRequest, loginSuccess, loginFailure],
            body: {username, password, rememberMe}
        }
    };
}

export function logout(user) {
    return {
        [CALL_API]: {
            endpoint: '/v1/user/logout',
            method: 'post',
            types: [logoutRequest, logoutSuccess, logoutFailure],
            authenticated: true
        }
    };
}

export function checkAuth() {
    const token = getUserToken();

    return {
        [CALL_API]: {
            endpoint: '/v1/user/check-authentication',
            method: 'post',
            types: [changeAuthStatus, [loginSuccess, changeAuthStatus], changeAuthStatus],
            args: [[AUTH_INIT], [AUTH_SUCCESS], [AUTH_FAILED]],
            authenticated: true,
            body: {token}
        }
    };
}

export function recoveryPassword(email) {
    return {
        [CALL_API]: {
            endpoint: '/v1/user/reset-password',
            method: 'post',
            types: [changeRecoveryPassStatus, changeRecoveryPassStatus, changeRecoveryPassStatus],
            args: [[RECOVERY_PASS_INIT], [RECOVERY_PASS_SUCCESS], [RECOVERY_PASS_FAILURE]],
            authenticated: true,
            body: {email}
        }
    };
}

export function changeUserPassword(password, resetToken) {
    return {
        [CALL_API]: {
            endpoint: '/v1/user/change-password',
            method: 'post',
            types: [changePasswordStatus, changePasswordStatus, changePasswordStatus],
            args: [[CHANGE_PASS_INIT], [CHANGE_PASS_SUCCESS], [CHANGE_PASS_FAILURE]],
            body: {password, resetToken}
        }
    };
}