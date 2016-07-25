import reduxCrud from 'redux-crud';
import cuid from 'cuid';
import 'isomorphic-fetch';
import { CALL_API } from '../../middleware/api';

import {
    ID_TOKEN,
    checkStatus,
    parseJSON,
    getUserToken,
    parseError
} from '../../utils/utils';

const crudVendor = reduxCrud.actionCreatorsFor('vendors');

let actionVendors = {

    fetch() {
        return {
            [CALL_API]: {
                endpoint: '/v1/vendor',
                authenticated: true,
                method: 'get',
                types: [crudVendor.fetchStart, crudVendor.fetchSuccess, crudVendor.fetchError]
            }
        };
    },

    create(vendor) {
        const cid = cuid();
        vendor = Object.assign({}, vendor, {id: cid});

        return {
            [CALL_API]: {
                endpoint: '/v1/vendor',
                authenticated: true,
                validation: true,
                method: 'post',
                types: [crudVendor.createStart, crudVendor.createSuccess, crudVendor.createError],
                args: [null, [cid]],
                body: vendor
            }
        };
    },

    update(vendor) {
        return {
            [CALL_API]: {
                endpoint: `/v1/vendor/edit/${vendor.id}`,
                authenticated: true,
                validation: true,
                method: 'post',
                //types: [crudVendor.createStart, crudVendor.createSuccess, crudVendor.createError],
                types: [null, crudVendor.updateSuccess, crudVendor.updateError],
                body: vendor
            }
        };
    },

    delete(vendor) {
        return {
            [CALL_API]: {
                endpoint: `/v1/vendor/${vendor.id}`,
                authenticated: true,
                method: 'delete',
                types: [crudVendor.deleteStart, crudVendor.deleteSuccess, crudVendor.deleteError],
                body: vendor
            }
        };
    }
};

actionVendors = Object.assign({}, actionVendors, crudVendor);

export default actionVendors;
