export const VENDOR_SELECTED_SET = 'VENDOR_SELECTED_SET';
export const VENDOR_SELECTED_CLEAR = 'VENDOR_SELECTED_CLEAR';
export const RESIZE_VENDOR_TABLE = 'RESIZE_VENDOR_TABLE';

export function setActiveVendor(vendor) {
    return {
        type: VENDOR_SELECTED_SET,
        vendor
    };
}

export function clearActiveVendor() {
    return {
        type: VENDOR_SELECTED_CLEAR
    };
}

export function resizeVendorTable(width, height) {
    return {
        type: RESIZE_VENDOR_TABLE,
        width,
        height
    };
}
