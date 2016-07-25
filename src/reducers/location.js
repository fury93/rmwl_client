import reduxCrud from 'redux-crud'
import {
    LOCATION_SELECTED_CLEAR,
    LOCATION_SELECTED_SET,
    RESIZE_LOCATION_TABLE
} from '../actions/location/locationPage';

const baseReducers = reduxCrud.reducersFor('locations', {store: reduxCrud.STORE_MUTABLE});
const defaultLocationPageStore = {
    selectedLocation: {},
    tableSize: {
        width: 800,
        height: 700
    }
};

export function locationReducer(state = [], action) {
    switch (action.type) {
        default:
            return baseReducers(state, action)
    }
}

export function locationsPage(state = defaultLocationPageStore, action) {
    switch (action.type) {
        case LOCATION_SELECTED_SET:
            return Object.assign({}, state, {
                selectedLocation: action.location
            });
        case LOCATION_SELECTED_CLEAR:
            return Object.assign({}, state, {
                selectedLocation: {}
            });
        case RESIZE_LOCATION_TABLE:
            return Object.assign({}, state, {
                tableSize: {width: action.width, height: action.height}
            });
        default:
            return state;
    }
}

