import { SAVE_RESTAURANTS, SELECTED_RESTAURANT, ADD_TO_CART } from '../actions/shop';

const initialState = {
    allRestaurants : [],
    selectedRestaurant: null,
    cart: []
};

const shop = ( state = initialState, action) => {
    switch (action.type) {
        case SAVE_RESTAURANTS : 
            return {
                ...state,
                allRestaurants: action.restaurants,
            }
        case SELECTED_RESTAURANT :
            return {
                ...state,
                selectedRestaurant: action.selectRestaurant
            }
        case ADD_TO_CART :
            return {
                ...state,
                cart: action.allCart
            }
        default: 
            return state;
    }

}

export default shop;

