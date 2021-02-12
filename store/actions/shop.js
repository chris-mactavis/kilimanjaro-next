
export const SAVE_RESTAURANTS = 'SAVE_RESTAURANTS';
export const SELECTED_RESTAURANT = 'SELECTED_RESTAURANTS';
export const ADD_TO_CART = 'ADD_TO_CART';
export const SET_TOTAL_PRICE = 'SET_TOTAL_PRICE';
export const UPDATED_TOTAL_PRICE  = 'UPDATED_TOTAL_PRICE';
export const UPDATED_VARIABLE_PRICE = 'UPDATED_VARIABLE_PRICE';
export const SET_COUPON_AMOUNT = 'SET_COUPON_AMOUNT';
export const SET_TOTALPRICE_WITH_COUPON = 'SET_TOTALPRICE_WITH_COUPON';
export const SET_COUPON_CODE = 'SET_COUPON_CODE'
export const SET_DELIVERY_PRICE = 'SET_DELIVERY_PRICE';
export const SET_UNUSED_BALANCE = 'SET_UNUSED_BALANCE';
export const SET_NEW_BALANCE = 'SET_NEW_BALANCE';

export const saveRestaurants = (restaurants) => ({
    type: SAVE_RESTAURANTS,
    restaurants
});

export const selectedRestaurant = (selectRestaurant) => ({
    type: SELECTED_RESTAURANT,
    selectRestaurant
});

export const addToCart = (allCart) => ({
    type: ADD_TO_CART,
    allCart
});

export const setTotalPrice = () => ({
    type: SET_TOTAL_PRICE,
});

export const updateTotalPrice = (updatePrice) => ({
    type: UPDATED_TOTAL_PRICE,
    updatePrice
});

export const updateVariablePrice = (variablePrice) => ({
    type: UPDATED_VARIABLE_PRICE,
    variablePrice
});

export const setCouponAmount = (couponAmt) => ({
    type: SET_COUPON_AMOUNT,
    couponAmt
});

export const setCouponCode = (couponName) => ({
    type: SET_COUPON_CODE,
    couponName
});

export const setTotalPriceWithCoupon = (couponAmtWithPrice) => ({
    type: SET_TOTALPRICE_WITH_COUPON,
    couponAmtWithPrice
});

export const setTheDeliveryPrice = (theDeliveryPrice) => ({
    type: SET_DELIVERY_PRICE,
    theDeliveryPrice
});

export const setTheUnsusedBalance = (theUnusedBalance) => ({
    type: SET_UNUSED_BALANCE,
    theUnusedBalance
});

export const setNewBalance = (theNewBalance) => ({
    type: SET_NEW_BALANCE,
    theNewBalance
})

