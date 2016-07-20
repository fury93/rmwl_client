import reduxCrud from 'redux-crud';
import cuid from 'cuid';
import { CALL_API } from '../../middleware/api';

import {
    ID_TOKEN,
    checkStatus,
    parseJSON,
    getUserToken,
    parseError
} from '../../utils/utils';

const crudUser = reduxCrud.actionCreatorsFor('users');

let actionCreators = {

    fetch() {
        return {
            [CALL_API]: {
                endpoint: '/v1/user',
                authenticated: true,
                method: 'get',
                types: [crudUser.fetchStart, crudUser.fetchSuccess, crudUser.fetchError]
            }
        };
    },

    create(user) {
        const cid = cuid();
        user = Object.assign({}, user, {id: cid});

        return {
            [CALL_API]: {
                endpoint: '/v1/user',
                authenticated: true,
                validation: true,
                method: 'post',
                types: [crudUser.createStart, crudUser.createSuccess, crudUser.createError],
                args: [null, [cid]],
                body: user
            }
        };
    },

    update(user) {
        return {
            [CALL_API]: {
                endpoint: `/v1/user/edit/${user.id}`,
                authenticated: true,
                validation: true,
                method: 'post',
                //types: [crudUser.createStart, crudUser.createSuccess, crudUser.createError],
                types: [null, crudUser.updateSuccess, crudUser.updateError],
                body: user
            }
        };
    },

    delete(user) {
        return {
            [CALL_API]: {
                endpoint: `/v1/user/${user.id}`,
                authenticated: true,
                method: 'delete',
                types: [crudUser.deleteStart, crudUser.deleteSuccess, crudUser.deleteError],
                body: user
            }
        };
    }
};

actionCreators = Object.assign({}, actionCreators, crudUser);

export default actionCreators;
