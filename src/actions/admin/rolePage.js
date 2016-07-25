import 'isomorphic-fetch';
import {
    checkStatus,
    parseJSON,
    parseError,
    getUserToken
} from '../../utils/utils';
import { CALL_API } from '../../middleware/api';
import {spinnerStart, spinnerStop} from '../application';

export const ROLES_PERMISSIONS_REQUEST = 'ROLES_PERMISSIONS_REQUEST';
export const ROLES_PERMISSIONS_SUCCESS = 'ROLES_PERMISSIONS_SUCCESS';
export const ROLES_PERMISSIONS_FAILURE = 'ROLES_PERMISSIONS_FAILURE';

export const UPDATE_PERMISSIONS_INIT = 'UPDATE_PERMISSIONS_REQUEST';
export const UPDATE_PERMISSIONS_SUCCESS = 'UPDATE_PERMISSIONS_SUCCESS';
export const UPDATE_PERMISSIONS_FAILURE = 'UPDATE_PERMISSIONS_FAILURE';
export const UPDATE_PERMISSIONS = 'UPDATE_PERMISSIONS';

export const UPDATE_PERMISSION_BY_ROLE = 'UPDATE_PERMISSION_BY_ROLE';

//Change permission in storage
export function updatePermissionByRole(permission, role) {
    return {
        type: UPDATE_PERMISSION_BY_ROLE,
        permission: permission,
        role: role
    };
}

function changeUpdatePermissionStatus(payload, status) {
    return {
        type: UPDATE_PERMISSIONS,
        status
    };
}

function rolesPermissionRequest() {
    return {
        type: ROLES_PERMISSIONS_REQUEST
    };
}

function rolesPermissionSuccess(data) {
    return {
        type: ROLES_PERMISSIONS_SUCCESS,
        roles: data.roles,
        modules: data.modules
    };
}

function rolesPermissionFailure(error) {
    return {
        type: ROLES_PERMISSIONS_FAILURE,
        error
    };
}

export function loadRolesPermission() {
    return {
        [CALL_API]: {
            endpoint: '/v1/permission/roles-permission',
            authenticated: true,
            method: 'get',
            types: [rolesPermissionRequest, rolesPermissionSuccess, rolesPermissionFailure]
        }
    };
}

export function updatePermission(permissions) {
    return {
        [CALL_API]: {
            endpoint: '/v1/permission/roles-permission',
            method: 'post',
            types: [changeUpdatePermissionStatus, changeUpdatePermissionStatus, changeUpdatePermissionStatus],
            args: [[UPDATE_PERMISSIONS_INIT], [UPDATE_PERMISSIONS_SUCCESS], [UPDATE_PERMISSIONS_FAILURE]],
            authenticated: true,
            body: {permissions}
        }
    };
}
