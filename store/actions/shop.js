
export const SAVE_RESTAURANTS = 'SAVE_RESTAURANTS';
export const SELECTED_RESTAURANT = 'SELECTED_RESTAURANTS';
export const ADD_TO_CART = 'ADD_TO_CART';

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


