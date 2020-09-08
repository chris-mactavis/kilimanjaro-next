import Layout from '../../../components/Layout';
import Head from 'next/head';

const ShoppingCart = () => {
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
                                <h5>Food Court, Abia Mall</h5>
                            </div>
                            <div className="col-md-7 mx-auto">
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="number-container text-center">
                                        <p className="number active-number">1</p>
                                        <p className="number-text">Shopping Cart</p>
                                    </div>
                                    <div className="number-container text-center mid-line">
                                        <div className="align-items-center">
                                            <p className="number">2</p>
                                        </div>
                                        
                                        <p className="number-text">Checkout</p>
                                    </div>
                                    <div className="number-container text-center">
                                        <p className="number">3</p>
                                        <p className="number-text">Order Complete</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </Layout>
        </>
    );
};

export default ShoppingCart;