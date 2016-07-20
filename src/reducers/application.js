import {SPINNER_STATUS} from '../actions/application';

const initialState = {
    spinner: false,
    action: null
};

export default function app(state = initialState, action = {}) {
    switch (action.type) {
        case SPINNER_STATUS:
            return Object.assign({}, state, {
                spinner: action.status,
                action: action.action
            });
        default:
            return state;
    }
}
