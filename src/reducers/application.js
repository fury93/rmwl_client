import {
    SPINNER_STATUS,
    USERS_LIST_REQUEST,
    USERS_LIST_SUCCESS,
    USERS_LIST_FAILURE
} from '../actions/application';

const userListState = {
    users: [],
    loading: false,
    error: null
};

const initialState = {
    spinner: false,
    action: null,
    usersList: userListState
};

function userListReducer(state = userListState, action) {
    switch (action.type) {
        case USERS_LIST_REQUEST:
            return Object.assign({}, state, {
                loading: true
            });
        case USERS_LIST_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                users: action.users
            });
        case USERS_LIST_FAILURE:
            return Object.assign({}, state, {
                loading: false,
                users: [],
                error: action.error
            });
        default:
            return state
    }
}

export default function app(state = initialState, action = {}) {
    switch (action.type) {
        case SPINNER_STATUS:
            return Object.assign({}, state, {
                spinner: action.status,
                action: action.action
            });
        case USERS_LIST_REQUEST:
        case USERS_LIST_SUCCESS:
        case USERS_LIST_FAILURE:
            return Object.assign({}, state, {
                usersList: userListReducer(state.usersList, action)
            });
        default:
            return state;
    }
}
