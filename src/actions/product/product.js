import _ from 'lodash';
import reduxCrud from 'redux-crud';
import cuid from 'cuid';
import 'isomorphic-fetch';
import {API_URL, STATUS_SUCCESS, STATUS_FAIL} from '../../api/config';

import {
    ID_TOKEN,
    checkStatus,
    parseJSON,
    getUserToken,
    parseError
} from '../../utils/utils';

const baseActionCreators = reduxCrud.actionCreatorsFor('products');

//Duplicate code, need to fix it (similar code for all crud actions)
let actionProducts = {

    fetch() {
        return dispatch => {
            dispatch(baseActionCreators.fetchStart());

            return fetch(`${API_URL}/v1/product`, {
                method: 'get',
                mode: 'cors',
                headers: {
                    'Authorization': 'Bearer ' + getUserToken()
                }
            }).then(checkStatus)
                .then(parseJSON)
                .then((result) => {
                    if (result.status === STATUS_SUCCESS) {
                        dispatch(baseActionCreators.fetchSuccess(result.data.products));
                    } else {
                        dispatch(baseActionCreators.fetchError({'message': result.errors}))
                    }
                })
                .catch((error) => {
                    dispatch(baseActionCreators.fetchError(error));
                    console.log(error.message);
                });
        };
    },

    create(product) {
        return dispatch => {
            const cid = cuid();
            product = Object.assign({}, product, {id: cid});
            dispatch(baseActionCreators.createStart(product));

            return fetch(`${API_URL}/v1/product`, {
                method: 'post',
                mode: 'cors',
                headers: {
                    'Authorization': 'Bearer ' + getUserToken(),
                    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                },
                body: JSON.stringify(product)
            }).then(checkStatus)
                .then(parseJSON)
                .then((result) => {
                    if (result.status === STATUS_SUCCESS) {
                        dispatch(baseActionCreators.createSuccess(result.data, cid));
                    } else {
                        throw result.errors;
                    }
                })
                .catch((error) => {
                    dispatch(baseActionCreators.createError(error, product));
                    return Promise.reject(error);
                });
        };
    },

    update(product) {
        return dispatch => {
            //dispatch(baseActionCreators.updateStart(product));

            return fetch(`${API_URL}/v1/product/edit/${product.id}`, {
                method: 'post',
                mode: 'cors',
                headers: {
                    'Authorization': 'Bearer ' + getUserToken(),
                    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                },
                body: JSON.stringify(product)
            }).then(checkStatus)
                .then(parseJSON)
                .then((result) => {
                    if (result.status === STATUS_SUCCESS) {
                        dispatch(baseActionCreators.updateSuccess(result.data));
                    } else {
                        throw result.errors;
                    }
                })
                .catch((error) => {
                    dispatch(baseActionCreators.updateError(error, product));
                    return Promise.reject(error);
                });
        };
    },

    delete(product) {
        return dispatch => {
            dispatch(baseActionCreators.deleteStart(product));

            return fetch(`${API_URL}/v1/product/${product.id}`, {
                method: 'delete',
                mode: 'cors',
                headers: {
                    'Authorization': 'Bearer ' + getUserToken()
                }
            }).then(checkStatus)
                .then(parseJSON)
                .then((result) => {
                    if (result.status === STATUS_SUCCESS) {
                        dispatch(baseActionCreators.deleteSuccess(product));
                    } else {
                        dispatch(baseActionCreators.deleteError(result, product));
                    }
                })
                .catch((error) => {
                    dispatch(baseActionCreators.deleteError(error, product));
                    console.log(error.message);
                });
        };
    }
};

actionProducts = _.extend(actionProducts, baseActionCreators);

export default actionProducts
