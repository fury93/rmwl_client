import 'isomorphic-fetch';
import {
    checkStatus,
    parseJSON,
    parseError,
    getUserToken
} from '../../utils/utils';
import {API_URL, STATUS_SUCCESS, STATUS_FAIL} from '../../api/config';

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

function changeUpdatePermissionStatus(status) {
    return {
        type: UPDATE_PERMISSIONS,
        status
    };
}

//UPDATE ROLES
function rolesPermissionRequest() {
    return {
        type: ROLES_PERMISSIONS_REQUEST,
        loading: true
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
    return dispatch => {

        dispatch(rolesPermissionRequest());

        return fetch(`${API_URL}/v1/permission/roles-permission`, {
            method: 'get',
            headers: {
                'Authorization': 'Bearer ' + getUserToken()
            }
        }).then(checkStatus)
            .then(parseJSON)
            .then((result) => {
                if (result.status === STATUS_SUCCESS) {
                    dispatch(rolesPermissionSuccess(result.data));
                } else {
                    throw result.errors;
                }
            }).catch((error) => {
                dispatch(rolesPermissionFailure(error));
            });
    };
}

export function updatePermission(permissions) {
    return dispatch => {

        dispatch(changeUpdatePermissionStatus(UPDATE_PERMISSIONS_INIT));

        return fetch(`${API_URL}/v1/permission/roles-permission`, {
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                'Authorization': 'Bearer ' + getUserToken(),
            },
            body: JSON.stringify({permissions})
        }).then(checkStatus)
            .then(parseJSON)
            .then((result) => {
                if (result.status === STATUS_SUCCESS) {
                    dispatch(changeUpdatePermissionStatus(UPDATE_PERMISSIONS_SUCCESS));
                } else {
                    throw result.errors;
                }
            }).catch((error) => {
                dispatch(changeUpdatePermissionStatus(UPDATE_PERMISSIONS_FAILURE));
            });
    };
}
