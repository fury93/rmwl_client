export const PRODUCT_SELECTED_SET = 'PRODUCT_SELECTED_SET';
export const PRODUCT_SELECTED_CLEAR = 'PRODUCT_SELECTED_CLEAR';
export const RESIZE_PRODUCT_TABLE = 'RESIZE_PRODUCT_TABLE';

export function setActiveProduct(product) {
    return {
        type: PRODUCT_SELECTED_SET,
        product
    };
}

export function clearActiveProduct() {
    return {
        type: PRODUCT_SELECTED_CLEAR
    };
}

export function resizeProductTable(width, height) {
    return {
        type: RESIZE_PRODUCT_TABLE,
        width,
        height
    };
}
