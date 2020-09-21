import Layout from '../../components/Layout';
import Head from 'next/head';

import OrderingSteps from '../../components/orders/orderingSteps/orderingSteps';

const CompleteOrder = () => {
    return (
        <Layout>
            <Head>
                <title>Complete Order | Kilimanjaro</title>
            </Head>
            <section className="shopping-cart">
                <div className="container">
                    <OrderingSteps activeTabs={[1, 2, 3]} />
                    {/* complete order */}
                    <div className="complete-order">
                        <div className="row">
                            <div className="col-md-6 mx-auto">
                                <h2>Order number: 3w25414656</h2>
                            </div>

                            <div className="col-md-10 mx-auto">
                                <div className="orders-info-container">
                                    <h4>Your meal will arrive shortly</h4>
                                    <div className="order-details details pb-5">
                                        <div className="row">
                                            <div className="col-md-8">
                                                <h5 className="red">Order Details</h5>
                                                <p>Excepteur sint occaecat cupidatat non proident, sunt in culpaofficia deserunt mollit anim id est eopksio laborum.
                                             Sed perspiciatis unde omnis istpoe natus error sit voluptatem accusantium doloremque eopsloi laudantium, totam rem </p>
                                            </div>
                                            <div className="col-md-4 text-center">
                                                <h5 className="mb-0">Order Total</h5>
                                                <h6 className="amt">N2000</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="order-details mt-4">
                                        <div className="row">
                                            <div className="col-md-4">
                                                <h5 className="red">Delivery address</h5>
                                                <p>Excepteur sint occaecat cupidatat non proident, sunt in culpaofficia deserunt mollit anim id est eopksio laborum.</p>
                                            </div>
                                            <div className="col-md-4">
                                                <h5 className="red">Store Location</h5>
                                                <p>Food Court, Abia mall </p>
                                            </div>
                                            <div className="col-md-4">
                                                <h5 className="red">Personal Details</h5>
                                                <p>Excepteur sint occaecat cupidatat non proident, sunt in culpaofficia deserunt mollit anim id est eopksio laborum.</p>
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