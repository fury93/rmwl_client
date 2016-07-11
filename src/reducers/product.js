import SI from 'seamless-immutable'
import reduxCrud from 'redux-crud'
import {
    PRODUCT_SELECTED_CLEAR,
    PRODUCT_SELECTED_SET
} from '../actions/product/productPage';

const baseReducers = reduxCrud.reducersFor('products', {store: reduxCrud.STORE_MUTABLE});
const defaultProductPageStore = {
    selectedProduct: {
        name: '',
        expiration_date: '',
        id: false
    }
};

export function productReducer(state = [], action) {
    switch (action.type) {
        default:
            return baseReducers(state, action)
    }
}

export function productsPage(state = defaultProductPageStore, action) {
    switch (action.type) {
        case PRODUCT_SELECTED_SET:
            return Object.assign({}, state, {
                selectedProduct: action.product
            });
        case PRODUCT_SELECTED_CLEAR:
            return Object.assign({}, state, {
                selectedProduct: {}
            });
        default:
            return state;
    }
}

