import {
    USER_PERMISSIONS_REQUEST,
    USER_PERMISSIONS_SUCCESS,
    USER_PERMISSIONS_FAILURE,
    UPDATE_PERMISSION_BY_USER,
    UPDATE_USER_PERMISSIONS
} from '../../actions/admin/userPermissionPage';

const defaultStore = {
    usersPermission: {},
    usersModules: {},
    errors: null,
    loadingId: false,
    updateStatus: null
};

export default function userPermissionPage(state = defaultStore, action) {
    switch (action.type) {
        case USER_PERMISSIONS_SUCCESS:
            var permission = Object.assign({}, state.usersPermission);
            var modules = Object.assign({}, state.usersModules);
            permission[action.user] = action.permission;
            modules[action.user] = action.modules;

            return Object.assign({}, state, {
                usersPermission: permission,
                usersModules: modules,
                errors: null,
                loadingId: false
            });
        case USER_PERMISSIONS_FAILURE:
            return Object.assign({}, state, {
                usersPermission: {},
                usersModules: {},
                errors: action.error,
                loadingId: false
            });
        case USER_PERMISSIONS_REQUEST:
            return Object.assign({}, state, {
                loadingId: action.id
            });
        case UPDATE_PERMISSION_BY_USER:
            var usersPermission = Object.assign({}, state.usersPermission);
            usersPermission[action.user] = action.permission;

            return Object.assign({}, state, {
                usersPermission: usersPermission
            });
        case UPDATE_USER_PERMISSIONS:
            return Object.assign({}, state, {
                updateStatus: action.status
            });
        default:
            return state;
    }
}

