import Layout from '../../components/Layout';
import Head from 'next/head';
import Cookies from 'js-cookie';
import Router from 'next/router';

import OrderingSteps from '../../components/orders/orderingSteps/orderingSteps';
import OrderingStepsMobile from '../../components/orders/orderingStepsMobile/orderingStepsMobile';
import { useEffect, useState } from 'react';


const CompleteOrder = () => {

    const [ completeOrderItem, setCompleteOrderItem ] = useState({});
    const [ selRestaurant, setSelRestaurant ] = useState({});
    console.log(completeOrderItem);
    console.log(selRestaurant);

    useEffect(() => {
        const orderCompleteItem = JSON.parse(Cookies.get('orderItem'));
        const resSelected = JSON.parse(Cookies.get('selectedRestaurant'));
        setSelRestaurant(resSelected);
        setCompleteOrderItem(orderCompleteItem);
    }, []);

    return (
        <Layout>
            <Head>
                <title>Complete Order | Kilimanjaro</title>
            </Head>
            <section className="shopping-cart">
                <div className="container">
                    <OrderingSteps activeTabs={[1, 2, 3]} />
                    <OrderingStepsMobile activeTabs={[3]} />
                    {/* complete order */}
                    <div className="complete-order">
                        <div className="row">
                            <div className="col-md-8 mx-auto">
                            <h2>Order number: {completeOrderItem.order_number}</h2>
                            </div>
                    
                            <div className="col-md-10 mx-auto">
                                <button onClick={() => Router.push('/')} className="btn mb-4"><span className="text">Return to homepage</span></button>
                                <div className="orders-info-container">
                                    <h4>You will be contacted soon, your order is been processed</h4>
                                    <div className="order-details details pb-sm-5 pb-2">
                                        <div className="row">
                                            <div className="col-md-8">
                                                <h5 className="red">Order Details</h5>
                                                <p>{completeOrderItem.delivery_note}</p>
                                            </div>
                                            <div className="col-md-4 text-center">
                                                <h5 className="mb-0">Order Total</h5>
                                                <h6 className="amt">{'₦'+completeOrderItem.total}</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="order-details mt-4">
                                        <div className="row">
                                            <div className="col-md-4">
                                                <h5 className="red">Delivery address</h5>
                                                <p>{completeOrderItem.ship_to}</p>
                                            </div>
                                            <div className="col-md-4">
                                                <h5 className="red">Store Location</h5>
                                                <p>{selRestaurant.name}</p>
                                            </div>
                                            <div className="col-md-4">
                                                <h5 className="red">Personal Details</h5>
                                                <p>{completeOrderItem.house_number}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}

export default CompleteOrder;