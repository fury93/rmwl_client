import reduxCrud from 'redux-crud'
import {
    VENDOR_SELECTED_CLEAR,
    VENDOR_SELECTED_SET,
    RESIZE_VENDOR_TABLE
} from '../actions/vendor/vendorPage';

const baseReducers = reduxCrud.reducersFor('vendors', {store: reduxCrud.STORE_MUTABLE});
const defaultVendorPageStore = {
    selectedVendor: {},
    tableSize: {
        width: 900,
        height: 700
    }
};

export function vendorReducer(state = [], action) {
    switch (action.type) {
        default:
            return baseReducers(state, action)
    }
}

export function vendorsPage(state = defaultVendorPageStore, action) {
    switch (action.type) {
        case VENDOR_SELECTED_SET:
            return Object.assign({}, state, {
                selectedVendor: action.vendor
            });
        case VENDOR_SELECTED_CLEAR:
            return Object.assign({}, state, {
                selectedVendor: {}
            });
        case RESIZE_VENDOR_TABLE:
            return Object.assign({}, state, {
                tableSize: {width: action.width, height: action.height}
            });
        default:
            return state;
    }
}

