import {PRODUCT_UPDATED, COUPON_UPDATED} from '../actions/liveEvents';

const initialState = {
    productUpdated: false,
    couponUpdated: false
}

const liveEvent = (state = initialState, action) => {
    switch(action.type) {
        case PRODUCT_UPDATED:
            console.log('in reducer');
            return {...state, productUpdated: action.data};
        case COUPON_UPDATED:
            console.log('in reducer coupon');
            return {...state, couponUpdated: action.data};
        default:
            return state;
    }
}

export default liveEvent;