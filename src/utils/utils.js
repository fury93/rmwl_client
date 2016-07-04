import jwt_decode from 'jwt-decode';

export const STATUS_401 = 401;

export function checkStatus(response) {
    if (!response.ok) {   // (response.status < 200 || response.status > 300)
        if(response.status === STATUS_401) {
            //todo logout
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

export const ID_TOKEN = 'token';

export function setIdToken(idToken) {
    localStorage.setItem(ID_TOKEN, idToken);
}

export function removeIdToken() {
    localStorage.removeItem(ID_TOKEN);
}

/*export function decodeUserProfile(idToken) {
 try {
 return jwt_decode(idToken);
 } catch (err) {
 return null;
 }
 }*/

export function loadUserProfile() {
    try {
        const localUserData = localStorage.getItem(ID_TOKEN);
        const userProfile = JSON.parse(localUserData);
        //todo add logic
        /*const now = new Date().getTime() / 1000;   // Date().getTime() returns milliseconds.
         // So divide by 1000 to get seconds
         if (now > userProfile.exp) {
         // user profile has expired.
         return {};
         }*/
        return userProfile;
    } catch (err) {
        return null;
    }
}

export function getUserToken() {
    var store = localStorage.getItem(ID_TOKEN);
    if (store) {
        var userData = JSON.parse(store);
        if (userData['token']) {
            return userData['token'];
        }
    }

    return null;
}
