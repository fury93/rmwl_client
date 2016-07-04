export const PRODUCT_SELECTED_SET = 'PRODUCT_SELECTED_SET';
export const PRODUCT_SELECTED_CLEAR = 'PRODUCT_SELECTED_CLEAR';

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
