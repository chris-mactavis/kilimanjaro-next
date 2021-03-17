export const PRODUCT_UPDATED = 'PRODUCT_UPDATED';
export const COUPON_UPDATED = 'COUPON_UPDATED';

export const productUpdated = data => ({type: PRODUCT_UPDATED, data});
export const couponUpdated = data => ({type: COUPON_UPDATED, data});