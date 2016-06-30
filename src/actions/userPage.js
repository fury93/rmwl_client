export const USERS_SELECTED_SET = 'USERS_SELECTED_SET';
export const USERS_SELECTED_CLEAR = 'USERS_SELECTED_CLEAR';

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
