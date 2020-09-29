import { SAVE_RESTAURANTS } from '../actions/shop';

const initialState = {
    allRestaurants : [],
    selectedRestaurant: null
};

const shop = ( state = initialState, action) => {
    switch (action.type) {
        case SAVE_RESTAURANTS : 
            return {
                ...state,
                allRestaurants: action.restaurants,
            }
        default: 
            return state;
    }

}

export default shop;

