import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

import Layout from '../../components/Layout';
import FormInput from '../../components/formInput/formInput';
import axiosInstance from '../../config/axios';
import { loader } from '../../store/actions/loader';
import { storeAuth } from '../../store/actions/auth';
import { useEffect, useState } from 'react';


const Account = ({orders}) => {

    // All store
    let user = useSelector(state => state.auth.user) || {};
    user =  typeof user === 'object' ? user : JSON.parse(user);
    console.log(orders);

    return (
        <>
            <Layout>
                <Head>
                    <title>Account | Kilimanjaro</title>
                </Head>

                <section className="signup account">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-10 mx-auto">
                                <h3>My Account</h3>
                                <h5>Account Information</h5>
                                <div>
                                    <p className="name">Name: <span>{user.first_name} {user.last_name}</span></p>
                                    <p>Email: <span>{user.email}</span></p>
                                    <p>Phone Number: <span>{user.phone}</span></p>
                                </div>
                                <div className="d-flex">
                                    <Link href="/edit-account"><button className="btn mr-5">Edit</button></Link> 
                                    <Link href="/change-password"><button className="btn">Change password</button></Link>
                                </div>
                                <h5 className="mt-5">My Orders</h5>
                                {!orders.length > 0 && <p>You have not made any orders yet.</p>}
                                {orders.length > 0 && <div className="order-list">
                                    <Table>
                                        <Thead>
                                            <Tr>
                                                <Th>Order Number</Th>
                                                <Th>Date</Th>
                                                <Th>Status</Th>
                                                <Th>Total</Th>
                                                <Th>Actions</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {orders.map((order) => {
                                                const d = new Date(order.created_at);
                                                const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
                                                const month = months[d.getMonth()];
                                                const day = d.getDate();
                                                const year = d.getFullYear();

                                                const qtyItem = order.quantity > 1 ? 'items' : 'item'

                                                return <Tr key={order.id}>
                                                    <Td>{order.order_number}</Td>
                                                    <Td>{`${day} ${month} ${year}`}</Td>
                                                    <Td>Processing</Td>
                                                    <Td>{`₦${order.total} for ${order.quantity} ${qtyItem}`}</Td>
                                                    <button onClick={() => Router.push('/account/view-order')} className="btn mt-3 mb-3">View</button>
                                                </Tr>
                                            })}
                                             {/* <Tr>
                                                 <Td>#16430</Td>
                                                 <Td>9 April 2019</Td>
                                                 <Td>Processing</Td>
                                                 <Td>N1000 for 1 items</Td>
                                                 <button className="btn mt-3 mb-3">View</button>
                                             </Tr>
                                             <Tr>
                                                 <Td>#16430</Td>
                                                 <Td>9 April 2019</Td>
                                                 <Td>Processing</Td>
                                                 <Td>N1000 for 1 items</Td>
                                                 <button className="btn mt-3 mb-3">View</button>
                                             </Tr> */}
                                        </Tbody>
                                    </Table>

                                </div>}
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
};

Account.getInitialProps = async({ req, res }) => {
    let userToken = null;
    if (process.browser) {
        userToken = Cookies.get('token');
    } else {
        userToken = req.cookies.token;
    }
    try {
        const {data: {data}} = await axiosInstance.get('orders', {headers: {'Authorization': `Bearer ${userToken}`}});
        return {orders : data}
      
    } catch (error) {
        console.log(error);
        return {orders: {}};
    }
}

export default Account;