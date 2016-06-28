import _ from 'lodash';
import reduxCrud from 'redux-crud';
import cuid from 'cuid';
import {API_URL, STATUS_SUCCESS, STATUS_FAIL} from '../api/config';
import 'isomorphic-fetch';
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
                    debugger;
                    const errorObj = parseError(error);
                    dispatch(baseActionCreators.fetchError(errorObj))
                });
        };
    },

    create(user) {
        return dispatch => {
            dispatch(baseActionCreators.fetchStart());

            const cid = cuid();
            user = user.merge({id: cid});
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
                        dispatch(baseActionCreators.createError({'message': result.errors}))
                    }
                })
                .catch((error) => {
                    debugger;
                    console.error(error.toString())
                    /*const errorObj = parseError(error);
                    dispatch(baseActionCreators.createError(errorObj))*/
                });
        };
    },

/*    update(todo) {
        return function(dispatch) {
            const optimisticAction = baseActionCreators.updateStart(todo)
            dispatch(optimisticAction)

            const url = `/todos/${todo.id}`
            const promise = axios({
                url: url,
                method: 'PATCH',
                data: todo,
            })

            promise.then(function(response) {
                // dispatch the success action
                const returned = response.data
                const successAction = baseActionCreators.updateSuccess(returned)
                dispatch(successAction)
            }, function(response) {
                // rejection
                // dispatch the error action
                const errorAction = baseActionCreators.updateError(response, todo)
                dispatch(errorAction)
            }).catch(function(err) {
                console.error(err.toString())
            })

            return promise

        }
    },

    delete(todo) {
        return function(dispatch) {
            const optimisticAction = baseActionCreators.deleteStart(todo)
            dispatch(optimisticAction)

            const url = `/todos/${todo.id}`
            const promise = axios({
                url: url,
                method: 'DELETE',
            })

            promise.then(function(response) {
                // dispatch the success action
                const successAction = baseActionCreators.deleteSuccess(todo)
                dispatch(successAction)
            }, function(response) {
                // rejection
                // dispatch the error action
                const errorAction = baseActionCreators.deleteError(response, todo)
                dispatch(errorAction)
            }).catch(function(err) {
                console.error(err.toString())
            })

            return promise
        }
    },*/

};

actionCreators = _.extend(actionCreators, baseActionCreators);

export default actionCreators
