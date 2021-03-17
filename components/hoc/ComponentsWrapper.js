import { useDispatch } from "react-redux";
import Pusher from 'pusher-js';
import {useEffect} from 'react';
import {productUpdated, couponUpdated} from '../../store/actions/liveEvents';

const ComponentWrapper = ({Component, pageProps}) => {
    const dispatch = useDispatch();
    useEffect(() => {
        Pusher.logToConsole = false;
        const pusher = new Pusher('8d0fc5535e8e8d125d2c', {
            cluster: 'eu',
            forceTLS: true
        });
        
        // Live Product Update
        const productChannel = pusher.subscribe('product-updated');
        productChannel.bind('App\\Events\\ProductUpdated', eventData => {
            dispatch(productUpdated(true));
        });

        //Coupon Product Update
        const couponChannel = pusher.subscribe('coupon-updated');
        couponChannel.bind('App\\Events\\CouponUpdated', eventData => {
            // console.log(eventData, 'couponUpdated');
            dispatch(couponUpdated(true));
        });
    
      }, []);
    return <Component {...pageProps} />
}

export default ComponentWrapper;