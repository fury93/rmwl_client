import Unauthorized from '../containers/misc/Unauthorized';
import Forbidden from '../containers/misc/Forbidden';
import NotFound from '../containers/misc/NotFound';
import { browserHistory } from 'react-router';

export const STATUS_401 = 401;
export const STATUS_403 = 403;
export const ID_TOKEN = 'token';

//Check response status, if status 401, then clear storage and redirect to login page
export function checkStatus(response) {
    if (!response.ok) {   // (response.status < 200 || response.status > 300)

        if(response.status === STATUS_403) {
            browserHistory.push('/403');
        }

        if(response.status === STATUS_401) {
            browserHistory.push('/401');
        }

        const error = new Error(response.statusText);
        error.response = response;
        throw error;
    }

    return response;
}

export function parseJSON(response) {
    return response.json();
}

//Parse error message from server
export function parseError(error) {
    const response = error.response;
    if (response) {
        parseJSON(response)
            .then((json) => {
                error.status = response.status;
                error.statusText = response.statusText;
                error.message = json.message;
            });
    }

    return error;
}

//Methods to work with local storage and token
export function setIdToken(idToken) {
    localStorage.setItem(ID_TOKEN, idToken);
}

export function removeIdToken() {
    localStorage.removeItem(ID_TOKEN);
}

export function getUserToken() {
    var store = localStorage.getItem(ID_TOKEN);

    if (store) {
        var token = JSON.parse(store);
    }

    return token || null;
}

export function zeroTime(date) {
    date.setHours(0, 0, 0, 0);

    return date;
}
