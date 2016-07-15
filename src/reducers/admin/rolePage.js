import {
    ROLES_PERMISSIONS_REQUEST,
    ROLES_PERMISSIONS_SUCCESS,
    ROLES_PERMISSIONS_FAILURE,
    UPDATE_PERMISSION_BY_ROLE,
    UPDATE_PERMISSIONS
} from '../../actions/admin/rolePage';

const defaultStore = {
    roles: {},
    modules: {},
    errors: null,
    loading: false,
    updateStatus: null
};

export default function rolePage(state = defaultStore, action) {
    switch (action.type) {
        case ROLES_PERMISSIONS_SUCCESS:
            return Object.assign({}, state, {
                roles: action.roles,
                modules: action.modules,
                errors: null,
                loading: false
            });
        case ROLES_PERMISSIONS_FAILURE:
            return Object.assign({}, state, {
                roles: {},
                modules: {},
                errors: action.error,
                loading: false
            });
        case UPDATE_PERMISSION_BY_ROLE:
            var newRoles =  Object.assign({}, state.roles);
            newRoles[action.role] = action.permission;

            return Object.assign({}, state, {
                roles: newRoles
            });
        case ROLES_PERMISSIONS_REQUEST:
            return Object.assign({}, state, {
                loading: true
            });
        case UPDATE_PERMISSIONS:
            return Object.assign({}, state, {
                updateStatus: action.status
            });
        default:
            return state;
    }
}

