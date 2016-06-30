import _ from 'lodash';
import reduxCrud from 'redux-crud';
import cuid from 'cuid';
import 'isomorphic-fetch';
import {API_URL, STATUS_SUCCESS, STATUS_FAIL} from '../api/config';

import {
    ID_TOKEN,
    checkStatus,
    parseJSON,
    getUserToken,
    parseError
} from '../utils/utils';

const baseActionCreators = reduxCrud.actionCreatorsFor('users');

let actionCreators = {

    fetch() {
        return dispatch => {
            dispatch(baseActionCreators.fetchStart());

            return fetch(`${API_URL}/v1/user`, {
                method: 'get',
                mode: 'cors',
                headers: {
                    'Authorization': 'Bearer ' + getUserToken(),
                    //"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                }
            }).then(checkStatus)
                .then(parseJSON)
                .then((result) => {
                    debugger;
                    if (result.status === STATUS_SUCCESS) {
                        dispatch(baseActionCreators.fetchSuccess(result.data.users));
                    } else {
                        dispatch(baseActionCreators.fetchError({'message': result.errors}))
                    }
                })
                .catch((error) => {
                    dispatch(baseActionCreators.fetchError(error));
                    console.error(error.toString());
                });
        };
    },

    create(user) {
        return dispatch => {
            const cid = cuid();
            user = Object.assign({}, user, {id: cid});
            dispatch(baseActionCreators.createStart(user));

            return fetch(`${API_URL}/v1/user`, {
                method: 'post',
                mode: 'cors',
                headers: {
                    'Authorization': 'Bearer ' + getUserToken(),
                    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                },
                body: JSON.stringify(user)
            }).then(checkStatus)
                .then(parseJSON)
                .then((result) => {
                    if (result.status === STATUS_SUCCESS) {
                        dispatch(baseActionCreators.createSuccess(result.data, cid));
                    } else {
                        debugger;
                        dispatch(baseActionCreators.createError(result.errors, user))
                    }
                })
                .catch((error) => {
                    dispatch(baseActionCreators.createError(error, user))
                    console.error(error.toString())
                });
        };
    },

    update(user) {
        return dispatch => {
            debugger;
            dispatch(baseActionCreators.updateStart(user));

            return fetch(`${API_URL}/v1/user/edit/${user.id}`, {
                method: 'post',
                mode: 'cors',
                headers: {
                    'Authorization': 'Bearer ' + getUserToken(),
                    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                },
                body: JSON.stringify(user)
            }).then(checkStatus)
                .then(parseJSON)
                .then((result) => {
                    if (result.status === STATUS_SUCCESS) {
                        dispatch(baseActionCreators.updateSuccess(result.data));
                    } else {
                        dispatch(baseActionCreators.updateError(result.errors, user))
                    }
                })
                .catch((error) => {
                    dispatch(baseActionCreators.updateError(error, user));
                    console.error(error.toString())
                });
        };
    },

    delete(user) {
        return dispatch => {
            dispatch(baseActionCreators.deleteStart(user));

            return fetch(`${API_URL}/v1/user/${user.id}`, {
                method: 'delete',
                mode: 'cors',
                headers: {
                    'Authorization': 'Bearer ' + getUserToken(),
                    //"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                },
                //body: JSON.stringify(user)
            }).then(checkStatus)
                .then(parseJSON)
                .then((result) => {
                    if (result.status === STATUS_SUCCESS) {
                        dispatch(baseActionCreators.deleteSuccess(user));
                    } else {
                        debugger;
                        dispatch(baseActionCreators.deleteError(result, user));
                    }
                })
                .catch((error) => {
                    dispatch(baseActionCreators.deleteError(error, user));
                    console.error(error.toString());
                });
        };
    }
};

actionCreators = _.extend(actionCreators, baseActionCreators);

export default actionCreators
