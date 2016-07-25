import 'isomorphic-fetch';
import {
    checkStatus,
    parseJSON,
    parseError,
    getUserToken
} from '../../utils/utils';
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

function updateUserPermissionStatus(payload, status) {
    return {
        type: UPDATE_USER_PERMISSIONS,
        status
    };
}

//UPDATE USERS PERMISSIONS
function userPermissionRequest() {
    return {
        type: USER_PERMISSIONS_REQUEST
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
            types: [userPermissionRequest, userPermissionSuccess, userPermissionFailure]
        }
    };
}

export function updateUserPermission(id, permissions) {
    return {
        [CALL_API]: {
            endpoint: `/v1/permission/user-permission/${id}`,
            method: 'post',
            types: [updateUserPermissionStatus, updateUserPermissionStatus, updateUserPermissionStatus],
            args: [[UPDATE_USER_PERMISSIONS_INIT], [UPDATE_USER_PERMISSIONS_SUCCESS], [UPDATE_USER_PERMISSIONS_FAILURE]],
            authenticated: true,
            body: {permissions}
        }
    };
}