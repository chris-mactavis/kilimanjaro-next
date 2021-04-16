import Cookies from 'js-cookie';
import { NotificationManager } from 'react-notifications';
import Router from 'next/router';


import { loader } from './loader';
import axiosInstance from '../../config/axios';


export const STORE_AUTH = 'STORE_AUTH';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';


export const loginAsync = data => {
     let newData = data;
    return async dispatch => {
        dispatch(loader());
        try {
            const {data: response} = await axiosInstance.post('login', newData);
            dispatch(loader());
            dispatch(storeAuth(response.data));
            NotificationManager.success(response.message, '', 5000);
            const checkoutCookies = localStorage.getItem('checkoutToLogin') ? localStorage.getItem('checkoutToLogin') : '';
            if (checkoutCookies === '/checkout') {
                Router.push('/checkout');
            } else {
                Router.push('/account');
            }
        } catch (error) {
            console.log(error);
            dispatch(loader());
            NotificationManager.error(error.response.data.message, '', 5000);
        }
    }
}


export const storeAuth = data => {
    Cookies.set('token', data.token);
    Cookies.set('user', JSON.stringify(data.user));
    
    return {
        type: LOGIN,
        data
    }
};

export const logout = () => {
    Cookies.remove('token');
    Cookies.remove('user');
    Cookies.remove('singleOrderId');
    localStorage.removeItem('orders');
    
    return {
        type: LOGOUT
    }
}