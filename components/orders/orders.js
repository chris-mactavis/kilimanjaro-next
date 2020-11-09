import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { NotificationManager } from 'react-notifications';
import Router from 'next/router';


import { loader } from '../../store/actions/loader';
import InlineLoading from '../UI/inlineLoader';
import axiosInstance from '../../config/axios';
import { addToCart, setTotalPrice } from '../../store/actions/shop';


const Orders = () => {

    const [ inlineLoading, setInlineLoading ] = useState(0);

    const dispatch = useDispatch();
    const loadingState = useSelector(state => state.loader.loading);

    const recentOrders = localStorage.getItem('orders') ? JSON.parse(localStorage.getItem('orders')) : [];

    const reOrderBtnHandler = async (id, resName, resId) => {
        setInlineLoading(id);
        dispatch(loader());
        const token = Cookies.get('token');
        const restaurantName = {
            name: resName,
            id: resId
        }
        try {
            const {data: response} = await axiosInstance.post('re-order', {order_id: id}, {headers: {'Authorization': `Bearer ${token}`}});
            const reOrderData = response.data;
            dispatch(addToCart(reOrderData));
            dispatch(setTotalPrice());
            dispatch(loader());
            setInlineLoading(0);
            Cookies.set('setCart', JSON.stringify(reOrderData));
            Cookies.remove('selectedRestaurant');
            Cookies.set('selectedRestaurant', JSON.stringify(restaurantName));
            NotificationManager.success('Added to cart successfully', '', 3000);
            Router.push('/cart');
        } catch (error) {
            console.log(error)
            dispatch(loader());
            NotificationManager.error(error.response.data.message, '', 3000);
        }
    }

    return (
        <>
            <section className="orders how-it-works">
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center">
                            <h2>Recent Orders</h2>
                        </div>
                        { recentOrders.length === 0
                         ? 
                         <p className="text-center">You have no recent oders yet.</p>  
                         :
                        <>
                            {recentOrders.slice(0, 2).map((recentOrder) => {
                                const orderItems = recentOrder.order_items;
                                return <div key={recentOrder.id} className="col-md-8 mx-auto">
                                    <div className="orders-container">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="order-details-container">
                                                    <div className="d-flex flex-wrap justify-content-between">
                                                        <p className="text-red">{recentOrder.restaurant}</p>
                                                        <p className="date">{recentOrder.order_date}</p>
                                                    </div>
                                                    {orderItems.map((item) => {
                                                        return <div key={item.id} className="d-flex flex-wrap justify-content-between">
                                                            <p className="prices-details">{item.quantity}x {item.product}</p>
                                                            <p className="prices-details">₦{item.subtotal}</p>
                                                        </div>
                                                    })}
                                                    {recentOrder.delivery &&
                                                        <div className="d-flex flex-wrap justify-content-between">
                                                            <p className="prices-details">Delivery Price</p>
                                                            <p className="prices-details">₦{recentOrder.delivery}</p>
                                                        </div>
                                                    }
                                                    <div className="d-flex flex-wrap justify-content-between">
                                                        <p className="prices-details bold-text">Total(Including vat)</p>
                                                        <p className="prices-details bold-text">₦{recentOrder.total}</p>
                                                    </div>
                                                    <div className="text-right">{loadingState && inlineLoading === recentOrder.id ? <InlineLoading /> : <button onClick={() => reOrderBtnHandler(recentOrder.id, recentOrder.restaurant, recentOrder.restaurant_id)} className="btn">Re-order</button>}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            })}
                        </>
                        }
                    </div>
                </div>
            </section>
        </>

    );
};

export default Orders;