import { SAVE_RESTAURANTS, SELECTED_RESTAURANT, ADD_TO_CART, SET_TOTAL_PRICE, UPDATED_TOTAL_PRICE, UPDATED_VARIABLE_PRICE, SET_COUPON_AMOUNT, SET_TOTALPRICE_WITH_COUPON, SET_COUPON_CODE, SET_DELIVERY_PRICE, SET_UNUSED_BALANCE, SET_NEW_BALANCE } from '../actions/shop';
import Cookies from 'js-cookie';

const totalPrice = Cookies.get('totalPrice');
const  cart = Cookies.get('setCart');
const  couponAmt = +Cookies.get('couponAmt');
const  totalPriceAmtWithCoupon = +Cookies.get('totalPriceAmtWithCoupon');
const  couponNameUsed = Cookies.get('coupName');
const  theBalance = +Cookies.get('unusedBalance');
const newUnusedBalance = +Cookies.get('newUnusedBalance');

const initialState = {
    allRestaurants : [],
    selectedRestaurant: null,
    cart: cart || [],
    totalPrice: 0,
    couponAmount: couponAmt || 0,
    totalPriceWithCoupon: totalPriceAmtWithCoupon || 0,
    updatedPrice : totalPrice || 0,
    variablePrice: null,
    couponName: couponNameUsed || '',
    deliveryPrice: 0,
    balance: theBalance || 0,
    theNewBalance: newUnusedBalance || 0
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
        case SET_COUPON_AMOUNT :
            return {
                ...state,
                couponAmount: action.couponAmt
            }
        case SET_TOTALPRICE_WITH_COUPON :
            return {
                ...state,
                couponAmount: action.couponAmtWithPrice
            }
        case SET_COUPON_CODE :
            return {
                ...state,
                couponName: action.couponName
            }
        case SET_DELIVERY_PRICE :
            return {
                ...state,
                deliveryPrice: action.theDeliveryPrice
            }
        case SET_UNUSED_BALANCE:
            return {
                ...state,
                balance: action.theUnusedBalance
            }
        case SET_NEW_BALANCE:
            return {
                ...state,
                theNewBalance: action.theNewBalance
            }
        default: 
            return state;
    }

}

export default shop;

