import { CALL_API } from '../middleware/api';

export const SPINNER_STATUS = 'SPINNER_STATUS';

export const USERS_LIST_REQUEST = 'USERS_LIST_REQUEST';
export const USERS_LIST_SUCCESS = 'USERS_LIST_SUCCESS';
export const USERS_LIST_FAILURE = 'USERS_LIST_FAILURE';

//SPINNER
export function spinnerStart(action) {
    return {
        type: SPINNER_STATUS,
        status: true,
        action: action
    };
}

export function spinnerStop(action) {
    return {
        type: SPINNER_STATUS,
        status: false,
        action: action
    };
}

//USERS
function usersListRequest() {
    return {
        type: USERS_LIST_REQUEST
    };
}

function usersListSuccess(data) {
    return {
        type: USERS_LIST_SUCCESS,
        users: data
    };
}

function usersListFailure(error) {
    return {
        type: USERS_LIST_FAILURE,
        error
    };
}

export function loadUsersList() {
    return {
        [CALL_API]: {
            endpoint: '/v1/user/users-list',
            authenticated: true,
            method: 'get',
            types: [usersListRequest, usersListSuccess, usersListFailure]
        }
    };
}