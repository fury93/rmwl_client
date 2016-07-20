import 'isomorphic-fetch';
import {
    ID_TOKEN,
    checkStatus,
    parseJSON,
    getUserToken,
    parseError
} from '../utils/utils';
import {spinnerStart, spinnerStop} from '../actions/application';
import {changeAuthStatus, AUTH_FAILED} from '../actions/auth';

const BASE_URL = 'http://rmwl-api.loc';// local dew server name

const STATUS_SUCCESS = 'success';
const STATUS_FAIL = 'error';

const METHOD_GET = 'get';
const METHOD_POST = 'post';
const METHOD_DELETE = 'delete';

function callActions(actions, payload, args, next) {
    if (Array.isArray(actions)) {
        actions.forEach((item) => {
            callAction(item);
        })
    } else if (actions) {
        callAction(actions);
    }

    function callAction(action) {
        if (args) {
            next(action(payload || {}, ...args));
        } else {
            next(action(payload || {}));
        }
    }
}

function callApi(callAPI, next) {
    const { endpoint, types, args, authenticated, method, body, validation } = callAPI;
    const [ requestAction, successAction, errorAction ] = types;
    const [ requestArgs, successArgs, errorArgs ] = args || [];
    const token = getUserToken();
    var config = getConfig();

    next(spinnerStart());
    callActions(requestAction, body, requestArgs, next);

    return fetch(BASE_URL + endpoint, config)
        .then(checkStatus)
        .then(parseJSON)
        .then((result) => {
            next(spinnerStop());
            if (result.status === STATUS_SUCCESS) {
                callActions(successAction, result.data, successArgs, next);


                return result.data;
            } else {
                throw result.errors;
            }
        })
        .catch((error) => {
            error = parseError(error);

            if (validation) {
                next(errorAction(error, body));

                return Promise.reject(error);
            } else {
                callActions(errorAction, error, errorArgs, next);
            }
        });

    function getConfig() {
        var config = {
            mode: 'cors',
            method: method || 'get',
            headers: {}
        };

        if (authenticated) {
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            } else {
                next(changeAuthStatus(null, STATUS_FAIL));
                //return;
            }
        }

        if (body && config.method.toLowerCase() !== METHOD_GET) {
            config.headers['Content-type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        }

        if (body) {
            config.body = JSON.stringify(body);
        }

        return config;
    }
}

export const CALL_API = Symbol('Call API');

export default store => next => action => {

    const callAPI = action[CALL_API];

    if (typeof callAPI === 'undefined') {
        return next(action)
    }

    return callApi(callAPI, next);
}