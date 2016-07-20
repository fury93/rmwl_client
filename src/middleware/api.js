import 'isomorphic-fetch';
import {
    ID_TOKEN,
    checkStatus,
    parseJSON,
    getUserToken,
    parseError
} from '../utils/utils';
import {spinnerStart, spinnerStop} from '../actions/application';

const BASE_URL = 'http://rmwl-api.loc';// local dew server name

const STATUS_SUCCESS = 'success';
const STATUS_FAIL = 'error';

function callApi(callAPI, next) {
    const { endpoint, types, args, authenticated, method, body } = callAPI;
    const [ requestAction, successAction, errorAction ] = types;
    debugger;
    const [ requestArgs, successArgs, errorArgs ] = args || [];
    const token = getUserToken();
    var config = {
        mode: 'cors',
        method: method || 'get'
    };

    if (authenticated && token) {
        config.headers = {
            'Authorization': `Bearer ${token}`,
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        }
    }

    if (body) {
        config.body = JSON.stringify(body);
    }

    next(spinnerStart());
    if (requestAction) {
        //TODO
        if(requestArgs) {
            next(requestAction(body || {}, ...requestArgs));
        } else {
            next(requestAction(body || {}));
        }

    }

    return fetch(BASE_URL + endpoint, config)
        .then(checkStatus)
        .then(parseJSON)
        .then((result) => {
            next(spinnerStop());

            if (result.status === STATUS_SUCCESS) {
                if(successArgs) {
                    next(successAction(result.data, ...successArgs));
                } else {
                    next(successAction(result.data));
                }


                return result.data;
            } else {
                throw result.errors;
            }
        })
        .catch((error) => {
            next(errorAction(error, body));
            return Promise.reject(error);
        });
}

export const CALL_API = Symbol('Call API');

export default store => next => action => {

    const callAPI = action[CALL_API];

    // So the middleware doesn't get applied to every single action
    if (typeof callAPI === 'undefined') {
        return next(action)
    }

    return callApi(callAPI, next);
}