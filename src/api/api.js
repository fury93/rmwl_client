export const API_URL = 'http://rmwl-api.loc';// local dew server name

export const STATUS_SUCCESS = 'success';
export const STATUS_FAIL = 'error';

//not used
/*
export function checkResponse(response) {
    var a = response.json();

    if(response.status === STATUS_SUCCESS) {
        return response.data;
    } else {
        if(response.status === STATUS_FAIL) {
            var errorData = response.errors;
        }

        const error = new Error(errorData || response.statusText);
        error.response = response;
        throw error;
    }
}*/
