
export const SAVE_RESTAURANTS = 'SAVE_RESTAURANTS';
export const SELECTED_RESTAURANT = 'SELECTED_RESTAURANTS';
export const ADD_TO_CART = 'ADD_TO_CART';
export const SET_TOTAL_PRICE = 'SET_TOTAL_PRICE';
export const UPDATED_TOTAL_PRICE  = 'UPDATED_TOTAL_PRICE';

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


