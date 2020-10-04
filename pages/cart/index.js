import Layout from '../../components/Layout';
import Head from 'next/head';
// import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';


import RelatedProducts from '../../components/relatedProducts/relatedProducts';
import OrderingSteps from '../../components/orders/orderingSteps/orderingSteps';
import { selectedRestaurant, addToCart } from '../../store/actions/shop';

const ShoppingCart = () => {
    const drinks = [
        { url: '/images/coke.svg', id: 0 },
        { url: '/images/5alive.svg', id: 1 },
        { url: '/images/fanta.svg', id: 2 },
        { url: '/images/coke.svg', id: 3 }
    ];

    const dispatch = useDispatch();

    //  All store 
    const restaurant = useSelector(state => state.shop.selectedRestaurant);
    const allCart = useSelector(state => state.shop.cart);
    // console.log(restaurant);

    // State
    const [ restaurantName, setRestaurantName ] = useState(restaurant);
    // console.log(restaurantName);

    // Note get the cookies and set the restaurant name
    
    useEffect(() => {
        const allProductCart = JSON.parse(Cookies.get('setCart'));
        const selectRestaurant = JSON.parse(Cookies.get('selectedRestaurant'));

        if (!allCart.length > 0) {
            dispatch(addToCart(allProductCart));
        }

        if (!restaurant) {
            dispatch(selectedRestaurant(selectRestaurant));
        }
    }, []);

    return (
        <>
            <Layout>
                <Head>
                    <title>Cart | Kilimanjaro</title>
                </Head>

                <section className="shopping-cart">
                    <div className="container">
                        <OrderingSteps restaurantName={restaurant} activeTabs={[1]} />
                        <div className="row">
                            <div className="col-md-8 mx-auto">
                                <h4>Review Your Order</h4>
                                {allCart.map((cart) => {
                                    return <div className="order-review d-flex align-items-center justify-content-between flex-wrap">
                                        <button><span>X</span>Remove</button>
                                        <img src={cart.product.image_url} alt="" />
                                        <p className="product-name">{cart.product.product} </p>
                                        <div className="d-flex">
                                            <p className="product-qty">Quantity</p>
                                            <input type='number' />
                                        </div>
                                        {cart.product.sale_price ? <p>{'₦'+cart.product.sale_price}</p> : <p>{'₦'+cart.product.price}</p>}
                                    </div>
                                })}
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
                                        <button className="btn btn-order w-100">Checkout</button>
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