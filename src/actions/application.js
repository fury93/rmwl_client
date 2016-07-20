export const SPINNER_STATUS = 'SPINNER_STATUS';

export function spinnerStart(action) {
    return {
        type: SPINNER_STATUS,
        status: true,
        action: action
    };
}

export function spinnerStop(action) {
    return {
        type: SPINNER_STATUS,
        status: false,
        action: action
    };
}