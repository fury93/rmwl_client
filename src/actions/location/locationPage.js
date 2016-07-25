export const LOCATION_SELECTED_SET = 'LOCATION_SELECTED_SET';
export const LOCATION_SELECTED_CLEAR = 'LOCATION_SELECTED_CLEAR';
export const RESIZE_LOCATION_TABLE = 'RESIZE_LOCATION_TABLE';

export function setActiveLocation(location) {
    return {
        type: LOCATION_SELECTED_SET,
        location
    };
}

export function clearActiveLocation() {
    return {
        type: LOCATION_SELECTED_CLEAR
    };
}

export function resizeLocationTable(width, height) {
    return {
        type: RESIZE_LOCATION_TABLE,
        width,
        height
    };
}
