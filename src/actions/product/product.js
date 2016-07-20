import _ from 'lodash';
import reduxCrud from 'redux-crud';
import cuid from 'cuid';
import 'isomorphic-fetch';
import {API_URL, STATUS_SUCCESS, STATUS_FAIL} from '../../api/config';
import { CALL_API } from '../../middleware/api';

import {
    ID_TOKEN,
    checkStatus,
    parseJSON,
    getUserToken,
    parseError
} from '../../utils/utils';

const crudProduct = reduxCrud.actionCreatorsFor('products');

let actionProducts = {

    fetch() {
        return {
            [CALL_API]: {
                endpoint: '/v1/product',
                authenticated: true,
                method: 'get',
                types: [crudProduct.fetchStart, crudProduct.fetchSuccess, crudProduct.fetchError]
            }
        };
    },

    create(product) {
        const cid = cuid();
        product = Object.assign({}, product, {id: cid});

        return {
            [CALL_API]: {
                endpoint: '/v1/product',
                authenticated: true,
                method: 'post',
                types: [crudProduct.createStart, crudProduct.createSuccess, crudProduct.createError],
                args: [null, [cid]],
                body: product
            }
        };
    },

    update(product) {
        return {
            [CALL_API]: {
                endpoint: `/v1/product/edit/${product.id}`,
                authenticated: true,
                method: 'post',
                //types: [crudProduct.createStart, crudProduct.createSuccess, crudProduct.createError],
                types: [null, crudProduct.updateSuccess, crudProduct.updateError],
                body: product
            }
        };
    },

    delete(product) {
        return {
            [CALL_API]: {
                endpoint: `/v1/product/${product.id}`,
                authenticated: true,
                method: 'delete',
                types: [crudProduct.deleteStart, crudProduct.deleteSuccess, crudProduct.deleteError],
                body: product
            }
        };
    }
};

actionProducts = Object.assign({}, actionProducts, crudProduct);

export default actionProducts;
