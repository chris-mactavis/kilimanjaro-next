import { SAVE_RESTAURANTS, SELECTED_RESTAURANT, ADD_TO_CART, SET_TOTAL_PRICE, UPDATED_TOTAL_PRICE, UPDATED_VARIABLE_PRICE } from '../actions/shop';
import Cookies from 'js-cookie';


const initialState = {
    allRestaurants : [],
    selectedRestaurant: null,
    cart: [],
    totalPrice: 0,
    updatedPrice : 0,
    variablePrice: null
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
        case SET_TOTAL_PRICE :
            const cartItems = [...state.cart];
            let totalPrice = 0;
            cartItems.forEach(cartItem => totalPrice += cartItem.totalPrice);
            Cookies.set('totalPrice', totalPrice);
            return {
                ...state,
                totalPrice,
                updatedPrice: totalPrice
            }
        case UPDATED_TOTAL_PRICE :
            return {
                ...state,
                updatedPrice: action.updatePrice
            }
        case UPDATED_VARIABLE_PRICE :
            return {
                ...state,
                variablePrice: action.variablePrice
            }
        default: 
            return state;
    }

}

export default shop;

