import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Cookies from 'js-cookie';

import Layout from '../../../components/Layout';
import axiosInstance from '../../../config/axios';
// import { loader } from '../../store/actions/loader';
// import { storeAuth } from '../../store/actions/auth';
// import { useEffect, useState } from 'react';


const ViewOrder = ({order}) => {
    console.log(order);
    const d = new Date(order.created_at);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = months[d.getMonth()];
    const day = d.getDate();
    const year = d.getFullYear();

    const orderItem = order.order_items;
    const user = order.user

    // All store

    return (
        <>
            <Layout>
                <Head>
                    <title>View Order | Kilimanjaro</title>
                </Head>

                <section className="signup account">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-10 mx-auto">
                                <h3>View Order</h3>
                                <p>Order <span className="col-black">{order.order_number}</span> was placed on <span className="col-black"> {`${day} ${month} ${year}`} </span> and is currently <span className="col-black">{order.status}.</span> </p>
                                <h5 className="mb-4">Order Details</h5>
                                <div>
                                    <p className="mr-4 col-black">Product</p>
                                    <div>
                                        {orderItem.map((item) => {
                                            return <p key={item.id}>{item.quantity}x <span>{item.product}</span></p>
                                        })}
                                    </div>
                                </div>
                                <div>
                                    <p  className="mr-4 col-black">Subtotal</p>
                                    <p>	₦{order.subtotal}</p>
                                </div>
                                <div>
                                    <p  className="mr-4 col-black">Total</p>
                                    <p>	₦{order.total}</p>
                                </div>
                                
                                <h5 className="mb-4">Billing Address</h5>
                                <p>{user.first_name} {user.last_name}</p>
                                <p>{user.email}</p>
                                <p>{user.phone}</p>
                                <p>{order.house_number}</p>
                                <p>{order.ship_to}</p>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
};

ViewOrder.getInitialProps = async({ req, res}) => {
    let orderId = null;
    let userToken = null;
    if (process.browser) {
        orderId = Cookies.get('singleOrderId');
        userToken = Cookies.get('token');
    } else {
        orderId = req.cookies.singleOrderId;
        userToken = req.cookies.token;
    }

    try {
        const {data: {data}} = await axiosInstance.get(`orders/${orderId}`, {headers: {'Authorization': `Bearer ${userToken}`}});
        return {order : data}
    } catch (error) {
        console.log(error);
        return {order: {}};
    }
}

export default ViewOrder;