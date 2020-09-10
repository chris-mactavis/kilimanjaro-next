import Layout from '../../../components/Layout';
import Head from 'next/head';
import Router from 'next/router';
import RelatedProducts from '../../../components/relatedProducts/relatedProducts';

const ShoppingCart = () => {
    const drinks = [
        {url : '/images/coke.svg', id: 0},
        { url: '/images/5alive.svg', id: 1 },
        { url: '/images/fanta.svg', id: 2 },
        {url : '/images/coke.svg', id: 3}
    ];

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
                                                <label>Coupon</label>
                                                <input type="text" name="coupon" id="coupon" />
                                            </div>
                                        
                                            <label>
                                                <input type="radio"  value="delivery" name="radio" />Delivery
                                            </label>
                                            <label>
                                                <input type="radio"  value="pick up" name="radio" />Pick up
                                            </label>
                                        </div>
                                        <textarea  placeholder='Order/delivery note' />
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
                                        <button onClick={() => Router.push('/menu/checkout')} className="btn btn-order w-100">Checkout</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Related Product */}
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