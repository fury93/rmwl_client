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

const crudLocation = reduxCrud.actionCreatorsFor('locations');

let actionLocations = {

    fetch() {
        return {
            [CALL_API]: {
                endpoint: '/v1/location',
                authenticated: true,
                method: 'get',
                types: [crudLocation.fetchStart, crudLocation.fetchSuccess, crudLocation.fetchError]
            }
        };
    },

    create(location) {
        const cid = cuid();
        location = Object.assign({}, location, {id: cid});

        return {
            [CALL_API]: {
                endpoint: '/v1/location',
                authenticated: true,
                validation: true,
                method: 'post',
                types: [crudLocation.createStart, crudLocation.createSuccess, crudLocation.createError],
                args: [null, [cid]],
                body: location
            }
        };
    },

    update(location) {
        return {
            [CALL_API]: {
                endpoint: `/v1/location/edit/${location.id}`,
                authenticated: true,
                validation: true,
                method: 'post',
                //types: [crudLocation.createStart, crudLocation.createSuccess, crudLocation.createError],
                types: [null, crudLocation.updateSuccess, crudLocation.updateError],
                body: location
            }
        };
    },

    delete(location) {
        return {
            [CALL_API]: {
                endpoint: `/v1/location/${location.id}`,
                authenticated: true,
                method: 'delete',
                types: [crudLocation.deleteStart, crudLocation.deleteSuccess, crudLocation.deleteError],
                body: location
            }
        };
    }
};

actionLocations = Object.assign({}, actionLocations, crudLocation);

export default actionLocations;
