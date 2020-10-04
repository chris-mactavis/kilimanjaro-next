import { SAVE_RESTAURANTS, SELECTED_RESTAURANT } from '../actions/shop';

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
        case SELECTED_RESTAURANT :
            return {
                ...state,
                selectedRestaurant: action.selectRestaurant
            }
        default: 
            return state;
    }

}

export default shop;

