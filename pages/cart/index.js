import Layout from '../../components/Layout';
import Head from 'next/head';
import Router from 'next/router';

import RelatedProducts from '../../components/relatedProducts/relatedProducts';
import OrderingSteps from '../../components/orders/orderingSteps/orderingSteps';

const ShoppingCart = () => {
    const drinks = [
        { url: '/images/coke.svg', id: 0 },
        { url: '/images/5alive.svg', id: 1 },
        { url: '/images/fanta.svg', id: 2 },
        { url: '/images/coke.svg', id: 3 }
    ];

    return (
        <>
            <Layout>
                <Head>
                    <title>Cart | Kilimanjaro</title>
                </Head>

                <section className="shopping-cart">
                    <div className="container">
                        <OrderingSteps activeTabs={[1]} />
                        <div className="row">
                            <div className="col-md-8 mx-auto">
                                <h4>Review Your Order</h4>
                                <div className="order-review d-flex align-items-center justify-content-between flex-wrap">
                                    <button><span>X</span>Remove</button>
                                    <img src="/images/food-order-image.png" alt="" />
                                    <p className="product-name">Small Body</p>
                                    <div className="d-flex">
                                        <p className="product-qty">Quantity</p>
                                        <input type='number' />
                                    </div>
                                    <p>N1000</p>
                                </div>

                                <div className="row">
                                    <div className="col-md-8">
                                        <div className="coupon-delivery-sect d-flex align-items-center justify-content-between flex-wrap">
                                            <div className="d-flex align-items-center justify-content-between flex-wrap">
                                                <label className="review">Coupon</label>
                                                <input type="text" name="coupon" id="coupon" />
                                            </div>

                                            {/* <label>
                                <input type="radio" value="delivery" name="radio" />Delivery
                            </label>
                            <label>
                                <input type="radio" value="pick up" name="radio" />Pick up
                            </label> */}
                                        </div>
                                    </div>
                                    <div className="col md-4">
                                        <div className="price-review coupon-delivery-sect">
                                            <div className="d-flex align-items-center justify-content-between flex-wrap">
                                                <p>Coupon</p>
                                                <p>N-500</p>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between flex-wrap">
                                                <p>Subtotal</p>
                                                <p>N2000</p>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between flex-wrap">
                                                <p>Delivery fee</p>
                                                <p>N500</p>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between flex-wrap">
                                                <p>Total</p>
                                                <p>N2000</p>
                                            </div>
                                        </div>
                                        <button className="btn btn-order w-100" onClick={() => Router.push('/checkout')}>Checkout</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                {/* Related Product shown on the review order */}
                <section className="shopping-cart">
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
                </section>
            </Layout>
        </>
    );
};

export default ShoppingCart;