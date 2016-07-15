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

import {API_URL, STATUS_SUCCESS, STATUS_FAIL} from '../api/config';

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
export function changeAuthStatus(status) {
    return {
        type: AUTH_STATUS,
        status
    };
}

//Recovery password
export function changeRecoveryPassStatus(status, msg = null) {
    return {
        type: RECOVERY_PASS_STATUS,
        status,
        msg
    };
}

//Change password
export function changePasswordStatus(status, msg = null) {
    return {
        type: CHANGE_PASS_STATUS,
        status,
        msg
    };
}

//Login
function loginRequest(user) {
    return {
        type: LOGIN_REQUEST,
        user
    };
}

function loginSuccess(data) {
    let profile = data.user;
    let roles = data.roles;

    setIdToken(JSON.stringify(profile.token));

    return {
        type: LOGIN_SUCCESS,
        user: profile,
        roles: roles
    };
}

function loginFailure(user, error) {
    removeIdToken();

    return {
        type: LOGIN_FAILURE,
        user,
        error
    };
}

//Logout
function logoutRequest(user) {
    return {
        type: LOGOUT_REQUEST,
        user
    };
}

function logoutSuccess(user) {
    removeIdToken();

    return {
        type: LOGOUT_SUCCESS,
        user
    };
}

function logoutFailure(user, error) {
    return {
        type: LOGOUT_FAILURE,
        user,
        error
    };
}

//Action methods
export function login(username, password, rememberMe) {
    return dispatch => {
        dispatch(loginRequest(username));

        return fetch(`${API_URL}/v1/user/login`, {
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: JSON.stringify({username, password, rememberMe})
        }).then(checkStatus)
            .then(parseJSON)
            .then((result) => {
                if (result.status === STATUS_SUCCESS) {
                    dispatch(loginSuccess(result.data));
                } else {
                    dispatch(loginFailure(username, {'message': result.errors}));
                }
            }).catch((error) => {
                dispatch(loginFailure(username, parseError(error)));
            });
    };
}

export function logout(user) {
    return dispatch => {
        dispatch(logoutRequest(user));
        return fetch(`${API_URL}/v1/user/logout`, {
            method: 'post',
            mode: 'cors',
            headers: {
                'Authorization': 'Bearer ' + getUserToken(),
            },
        }).then(checkStatus)
            .then(parseJSON)
            .then(json => dispatch(logoutSuccess(user)))
            .catch((error) => {
                dispatch(logoutFailure(user, parseError(error)));
            });
    };
}

export function checkAuth() {
    return dispatch => {
        dispatch(changeAuthStatus(AUTH_INIT));

        const token = getUserToken();
        if(!token) {
            return  dispatch(changeAuthStatus(AUTH_FAILED));
        }

        return fetch(`${API_URL}/v1/user/check-authentication`, {
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: JSON.stringify({token})
        }).then(checkStatus)
            .then(parseJSON)
            .then((result) => {
                if (result.status === STATUS_SUCCESS) {
                    dispatch(loginSuccess(result.data));
                    dispatch(changeAuthStatus(AUTH_SUCCESS));
                } else {
                    throw result.errors;
                }
            }).catch((error) => {
                dispatch(changeAuthStatus(AUTH_FAILED));
            });
    };
}

export function recoveryPassword(email) {
    return dispatch => {
        dispatch(changeRecoveryPassStatus(RECOVERY_PASS_INIT));

        return fetch(`${API_URL}/v1/user/reset-password`, {
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: JSON.stringify({email})
        }).then(checkStatus)
            .then(parseJSON)
            .then((result) => {
                if (result.status === STATUS_SUCCESS) {
                    dispatch(changeRecoveryPassStatus(RECOVERY_PASS_SUCCESS, result.data));
                } else {
                    throw result.errors;
                }
            }).catch((error) => {
                dispatch(changeRecoveryPassStatus(RECOVERY_PASS_FAILURE, error));
            });
    };
}

export function changeUserPassword(password, resetToken) {
    return dispatch => {
        dispatch(changePasswordStatus(CHANGE_PASS_INIT));

        return fetch(`${API_URL}/v1/user/change-password`, {
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: JSON.stringify({password, resetToken})
        }).then(checkStatus)
            .then(parseJSON)
            .then((result) => {
                if (result.status === STATUS_SUCCESS) {
                    dispatch(changePasswordStatus(CHANGE_PASS_SUCCESS, result.data));
                } else {
                    throw result.errors;
                }
            }).catch((error) => {
                dispatch(changePasswordStatus(CHANGE_PASS_FAILURE, error));
            });
    };
}