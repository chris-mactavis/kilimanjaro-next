import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Cookies from 'js-cookie';

import Layout from '../../../components/Layout';
// import { loader } from '../../store/actions/loader';
// import { storeAuth } from '../../store/actions/auth';
// import { useEffect, useState } from 'react';


const ViewOrder = () => {

    // All store

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
                                <h5>Order Details</h5>
                                <div className="d-flex align-items-center">
                                    <p className="mr-4">Product</p>
                                    <div>
                                        <p>1x Jollof rice</p>
                                        <p>1x Jollof rice</p>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center">
                                    <p  className="mr-4">Subtotal</p>
                                    <p>	₦1000</p>
                                </div>
                                <div className="d-flex align-items-center">
                                    <p  className="mr-4">Total</p>
                                    <p>	₦2000</p>
                                </div>
                                
                                <h5>Billing Address</h5>
                                <p>Khris Brown</p>
                                <p>Khris Brown</p>
                                <p>Khris Brown</p>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
};

export default ViewOrder;