import 'isomorphic-fetch';
import {
    checkStatus,
    parseJSON,
    parseError,
    getUserToken
} from '../../utils/utils';
import {API_URL, STATUS_SUCCESS, STATUS_FAIL} from '../../api/config';
import { CALL_API } from '../../middleware/api';

export const USER_PERMISSIONS_REQUEST = 'USER_PERMISSIONS_REQUEST';
export const USER_PERMISSIONS_SUCCESS = 'USER_PERMISSIONS_SUCCESS';
export const USER_PERMISSIONS_FAILURE = 'USER_PERMISSIONS_FAILURE';

export const UPDATE_USER_PERMISSIONS_INIT = 'UPDATE_USER_PERMISSIONS_INIT';
export const UPDATE_USER_PERMISSIONS_SUCCESS = 'UPDATE_USER_PERMISSIONS_SUCCESS';
export const UPDATE_USER_PERMISSIONS_FAILURE = 'UPDATE_USER_PERMISSIONS_FAILURE';
export const UPDATE_USER_PERMISSIONS = 'UPDATE_USER_PERMISSIONS';
export const UPDATE_PERMISSION_BY_USER = 'UPDATE_PERMISSION_BY_USER';

//Change user permission in storage
export function updatePermissionByUser(permission, user) {
    return {
        type: UPDATE_PERMISSION_BY_USER,
        permission: permission,
        user: user
    };
}

function updateUserPermissionStatus(status) {
    return {
        type: UPDATE_USER_PERMISSIONS,
        status
    };
}

//UPDATE USERS PERMISSIONS
//todo not used
function userPermissionRequest(id) {
    return {
        type: USER_PERMISSIONS_REQUEST,
        id: id
    };
}

function userPermissionSuccess(data) {
    return {
        type: USER_PERMISSIONS_SUCCESS,
        permission: data.permission,
        modules: data.modules,
        user: data.user
    };
}

function userPermissionFailure(error) {
    return {
        type: USER_PERMISSIONS_FAILURE,
        error
    };
}

//Users permissions page
export function loadUserPermission(id) {
    return {
        [CALL_API]: {
            endpoint: `/v1/permission/user-permission/${id}`,
            authenticated: true,
            method: 'get',
            types: [null, userPermissionSuccess, userPermissionFailure]
        }
    };
}

export function updateUserPermission(id, permissions) {
    return dispatch => {
        dispatch(updateUserPermissionStatus(UPDATE_USER_PERMISSIONS_INIT));

        return fetch(`${API_URL}/v1/permission/user-permission/${id}`, {
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                'Authorization': 'Bearer ' + getUserToken()
            },
            body: JSON.stringify({permissions})
        }).then(checkStatus)
            .then(parseJSON)
            .then((result) => {
                if (result.status === STATUS_SUCCESS) {
                    dispatch(updateUserPermissionStatus(UPDATE_USER_PERMISSIONS_SUCCESS));
                } else {
                    throw result.errors;
                }
            }).catch((error) => {
                dispatch(updateUserPermissionStatus(UPDATE_USER_PERMISSIONS_FAILURE));
            });
    };
}