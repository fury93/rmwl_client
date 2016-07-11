export const USERS_SELECTED_SET = 'USERS_SELECTED_SET';
export const USERS_SELECTED_CLEAR = 'USERS_SELECTED_CLEAR';
export const RESIZE_USER_TABLE = 'RESIZE_USER_TABLE';

/*******************************************/
export function setActiveUser(user) {
    return {
        type: USERS_SELECTED_SET,
        user
    };
}

export function clearActiveUser() {
    return {
        type: USERS_SELECTED_CLEAR
    };
}

export function resizeUserTable(width, height) {
    return {
        type: RESIZE_USER_TABLE,
        width,
        height
    };
}
