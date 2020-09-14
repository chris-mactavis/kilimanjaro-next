import Layout from '../../../components/Layout';
import Head from 'next/head';
import RelatedProducts from '../../../components/relatedProducts/relatedProducts';
import ReviewOrder from '../../../components/orders/reviewOrder.js/reviewOrder';
import Checkout from '../../../components/orders/checkout/checkout';
import { useState } from 'react';
import OrderComplete from '../../../components/orders/orderComplete/orderComplete';

const ShoppingCart = () => {
    const drinks = [
        {url : '/images/coke.svg', id: 0},
        { url: '/images/5alive.svg', id: 1 },
        { url: '/images/fanta.svg', id: 2 },
        {url : '/images/coke.svg', id: 3}
    ];

    const [ activeTabs, setActiveTabs ] = useState([1]);

    const [ displayOrderProcess, setDisplayOrderProcess ] = useState({
        showReviewOrder : true,
        showPaymentOrder : false,
        showOrderComplete : false
    });

    const checkoutOrderHandler = () => {
        setDisplayOrderProcess({
            showReviewOrder: false,
            showPaymentOrder: true,
            showOrderComplete: false
        });
        setActiveTabs([1,2]);
    };

    const submitOrderHandler = () => {
        setDisplayOrderProcess({
            showReviewOrder: false,
            showPaymentOrder: false,
            showOrderComplete: true
        });
        setActiveTabs([1,2,3]);
    };
   

    return (
        <>
            <Layout>
                <Head>
                    <title>Shopping Cart | Kilimanjaro</title>
                </Head>

                <section className="shopping-cart">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <h1>Food Court, Abia Mall</h1>
                            </div>
                            <div className="col-md-7 mx-auto">
                                <div className="d-flex align-items-center justify-content-between mb-5">
                                    <div className="number-container text-center">
                                        <p className={`number ${activeTabs.includes(1) ? "active-number" : null}`}>1</p>
                                        <p className="number-text">Shopping Cart</p>
                                    </div>
                                    <div className="number-container text-center mid-line">
                                        <div className="align-items-center">
                                            <p className={`number ${activeTabs.includes(2) ? "active-number" : null}`}>2</p>
                                        </div>
                                        <p className="number-text">Checkout</p>
                                    </div>
                                    <div className="number-container text-center">
                                        <p className={`number ${activeTabs.includes(3) ? "active-number" : null}`}>3</p>
                                        <p className="number-text">Order Complete</p>
                                    </div>
                                </div>
                            </div>
                            {/* Display the review order section */}
                            { displayOrderProcess.showReviewOrder && <ReviewOrder checkoutOrder={checkoutOrderHandler } /> }
                        </div>
                        {/* Checkout component display */}
                        { displayOrderProcess.showPaymentOrder && <Checkout submitOrder={submitOrderHandler } /> }

                        {/* complete order component display */}
                        { displayOrderProcess.showOrderComplete && <OrderComplete /> }
                    </div>
                </section>


                {/* Related Product shown on the review order */}
                { displayOrderProcess.showReviewOrder && <section className="shopping-cart">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <h4>Goes well with</h4>
                            </div>
                        </div>
                        <div className="row">
                            {drinks.map((drink) => <RelatedProducts url={drink.url} key={drink.id} />)}
                        </div>
                    </div>
                </section> }
            </Layout>
        </>
    );
};

export default ShoppingCart;