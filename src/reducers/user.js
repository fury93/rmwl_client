import SI from 'seamless-immutable'
import reduxCrud from 'redux-crud'
import {
    USERS_SELECTED_SET,
    USERS_SELECTED_CLEAR,
    RESIZE_USER_TABLE
} from '../actions/userPage';

const baseReducers = reduxCrud.reducersFor('users', { store: reduxCrud.STORE_MUTABLE });
const defaultUserPageStore = {
    selectedUser:{
        username: 'Test',
        email: 'email@gmail.com',
        roles: 'admin',
        active: true,
        id: false
    },
    isNew: true,
    tableSize: {
        width: 900,
        height: 700
    }
};

export function userReducer(state=[], action) {
    switch (action.type) {
        default:
            return baseReducers(state, action)
    }
}

export function usersPage(state = defaultUserPageStore, action) {
    switch (action.type) {
        case USERS_SELECTED_SET:
            return Object.assign({}, state, {
                selectedUser: action.user
            });
        case USERS_SELECTED_CLEAR:
            return Object.assign({}, state, {
                selectedUser: {}
            });
        case RESIZE_USER_TABLE:
            return Object.assign({}, state, {
                tableSize: {width: action.width, height: action.height}
            });
        default:
            return state;
    }
}

