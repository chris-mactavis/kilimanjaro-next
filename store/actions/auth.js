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
            // console.log(response.data);
            dispatch(loader());
            dispatch(storeAuth(response.data));
            NotificationManager.success(response.message, '', 3000);
            const checkoutCookies = Cookies.get('checkoutToLogin') ? Cookies.get('checkoutToLogin') : '';
            if (checkoutCookies === 'check-redirect') {
                Router.push('/checkout');
            } else {
                Router.push('/');1
            }
        } catch (error) {
            console.log(error);
            dispatch(loader());
            NotificationManager.error(error.response.data.message, '', 3000);
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

    return {
        type: LOGOUT
    }
}