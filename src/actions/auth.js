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

function loginRequest(user) {
    return {
        type: LOGIN_REQUEST,
        user
    };
}

function loginSuccess(profile) {
    setIdToken(JSON.stringify(profile));
    //const profile = decodeUserProfile(idToken);
    return {
        type: LOGIN_SUCCESS,
        user: profile.user,
        role: profile.role
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

export function login(username, password) {
    return dispatch => {
        dispatch(loginRequest(username));

        return fetch(`${API_URL}/v1/user/login`, {
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: JSON.stringify({username, password})
        }).then(checkStatus)
            .then(parseJSON)
            .then((result) => {
                if (result.status === STATUS_SUCCESS) {
                    dispatch(loginSuccess(result.data.user));
                } else {
                    //throw new Error(result.errors);
                    dispatch(loginFailure(username, {'message': result.errors}));
                }
            }).catch((error) => {
                debugger;
                loginFailure(username, parseError(error));
            });
    };
}

function logoutRequest(user) {
    //removeIdToken();
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

export function logout(user) {
    return dispatch => {
        dispatch(logoutRequest(user));
        return fetch(`${API_URL}/v1/user/logout`, {
            method: 'post',
            mode: 'cors',
            headers: {
                'Authorization': 'Bearer ' + getUserToken(),
                //"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
        }).then(checkStatus)
            .then(parseJSON)
            .then(json => dispatch(logoutSuccess(user)))
            .catch((error) => {
                dispatch(logoutFailure(user, parseError(error)));
            });
    };
}
