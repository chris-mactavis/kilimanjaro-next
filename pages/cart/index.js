import Layout from '../../components/Layout';
import Head from 'next/head';
// import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { NotificationManager } from 'react-notifications';
import Router from 'next/router';
import Link from 'next/link';


import RelatedProducts from '../../components/relatedProducts/relatedProducts';
import OrderingSteps from '../../components/orders/orderingSteps/orderingSteps';
import OrderingStepsMobile from '../../components/orders/orderingStepsMobile/orderingStepsMobile';
import { selectedRestaurant, addToCart, setTotalPrice, updateTotalPrice, updateVariablePrice } from '../../store/actions/shop';
import { loader } from '../../store/actions/loader';
import InlineLoading from '../../components/UI/inlineLoader';

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

    const allTotalPrice = useSelector(state => state.shop.updatedPrice);
    const varPrice = useSelector(state => state.shop.variablePrice);
    const loadingState = useSelector(state => state.loader.loading);

    const [localCart, setLocalCart] = useState([]);
    const [value, setValue] = useState(0);
    const [ activeUpdateCart, setActiveUpdateCart ] = useState(false);
    
    
    // Displaying the total price with variable products
    let newTotalPrice = 0;
    if (varPrice) {
        newTotalPrice = parseInt(allTotalPrice) + varPrice.totalVariablePrice;
    } else {
        newTotalPrice = parseInt(allTotalPrice)
    }
    
    useEffect(() => {
        // Fetch cart
        Cookies.get('setCart') ? setLocalCart(JSON.parse(Cookies.get('setCart'))) :  setLocalCart([]);

        const allProductCart = Cookies.get('setCart') ? JSON.parse(Cookies.get('setCart')) : [];
        const selectRestaurant = Cookies.get('selectedRestaurant') ? JSON.parse(Cookies.get('selectedRestaurant')) : null;
        const tolPrice = Cookies.get('totalPrice') ? Cookies.get('totalPrice') : null;
        const cookiesVariablePrice = Cookies.get('variable') ? JSON.parse(Cookies.get('variable')) : null;
        dispatch(updateTotalPrice(tolPrice));

        if (!varPrice) {
            dispatch(updateVariablePrice(cookiesVariablePrice));
        }

        if (!localCart.length > 0) {
            dispatch(addToCart(allProductCart));
        }

        if (!restaurant) {
            dispatch(selectedRestaurant(selectRestaurant));
        }
    }, []); 
    
    const updateQuantityChangeHandle = (e, cartIndex) => {
        setActiveUpdateCart(true);
        const price = localCart[cartIndex].salePrice || localCart[cartIndex].price;
        localCart[cartIndex].quantity = +e.target.value;
        localCart[cartIndex].totalPrice = +e.target.value * price;
        setLocalCart(localCart);
    }

    const deleteProductCartHandler = (index) => {
        localCart.splice(index, 1);
        dispatch(addToCart(localCart));
        Cookies.set('setCart', JSON.stringify(localCart));
        dispatch(setTotalPrice());
        setValue(value => ++value); 
    };

    const updateCartHander = () => {
        dispatch(loader());
        dispatch(addToCart(localCart));
        Cookies.set('setCart', JSON.stringify(localCart));
        dispatch(setTotalPrice());
        setValue(value => ++value); 
        setTimeout(() => {
            dispatch(loader());
        }, 1000);
        setTimeout(() => {
            NotificationManager.success('Cart updated successfully', '', 3000);
        }, 1500);
        setActiveUpdateCart(false);
    }

    let cartDisplay = <p className="text-center">Your cart is currently empty</p>;
    if (localCart.length > 0) {
        cartDisplay = <>
            {localCart.map((cart, index) => {
                let price = cart.salePrice ? +cart.salePrice : +cart.price;
                return <div key={cart.product.id} className="order-review d-flex align-items-center justify-content-between flex-wrap">
                    <button onClick={() => deleteProductCartHandler(index)}><span>X</span>Remove</button>
                    <img src={cart.product.image_url} alt="" />
                    <p className="product-name">{cart.product.product} </p>
                    <div className="d-flex">
                        <p className="product-qty">Quantity</p>
                        {/* <input onChange={(e) => updateQuantityChangeHandle(e, cart)} defaultValue={cart.quantity} type='number' /> */}
                        <input onChange={(e) => updateQuantityChangeHandle(e, index)} defaultValue={cart.quantity} type='number' min="1"/>
                    </div>
                    <p>{'₦' + cart.totalPrice}</p>
                    {/* {cart.product.sale_price ? <p>{'₦' + cart.product.sale_price}</p> : <p>{'₦' + cart.product.price}</p>} */}
                </div>
            })}
        </>
    }

    return (
        <>
            <Layout>
                <Head>
                    <title>Cart | Kilimanjaro</title>
                </Head>

               {!localCart.length > 0
                ? 
                    <section className="shopping-cart empty-cart">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="empty-cart-container">
                                        <p className=""><img className="pr-2 img-fluid" src="/images/icon/exclamation-mark.svg" alt="" />A minimum order of ₦1000 is required before checking out. current cart's total is: ₦{allTotalPrice === null ? '0' : allTotalPrice }</p>
                                        <p>Your cart is currently empty.</p>
                                        <Link href="/"><button className="btn"><span className="text">Return to homepage</span></button></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                :
                    <section className="shopping-cart">
                        <div className="container">
                            <OrderingSteps activeTabs={[1]} />
                            <OrderingStepsMobile activeTabs={[1]}/>
                            <div className="row">
                                <div className="col-md-8 mx-auto">
                                    {allTotalPrice >= 1000 ? '' : <p className="d-flex align-items-center mb-5"><img className="pr-2 img-fluid" src="/images/icon/exclamation-mark.svg" alt="" />A minimum order of ₦1000 is required before checking out. current cart's total is: ₦{allTotalPrice}</p>}
                                    <h4>Review Your Order</h4>
                                    {cartDisplay}
                                    <div className="d-flex justify-content-end mt-4 mb-3">
                                        {loadingState ? <InlineLoading /> : <button onClick={updateCartHander} className={activeUpdateCart ? "btn" : "btn disabled"}><span className="text">Update Cart</span></button>}
                                    </div>
                                    <div className="row">
                                        <div className="col-md-8">
                                            <div className="coupon-delivery-sect d-flex align-items-center justify-content-between flex-wrap">
                                                <div className="d-flex align-items-center justify-content-between flex-wrap">
                                                    {/* <label className="review">Coupon</label>
                                                    <input type="text" name="coupon" id="coupon" /> */}
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
                                                    <p>Subtotal</p>
                                                    <p>{'₦' + newTotalPrice}</p>
                                                </div>
                                                {/* <div className="d-flex align-items-center justify-content-between flex-wrap">
                                                <p>Delivery fee</p>
                                                <p>N500</p>
                                            </div> */}
                                                <div className="d-flex align-items-center justify-content-between flex-wrap">
                                                    <p>Total</p>
                                                    <p>{'₦' + newTotalPrice}</p>
                                                </div>
                                            </div>
                                            {/* <button onClick={() => Router.push('/checkout')} className={!localCart.length > 0 || allTotalPrice < 1000 ? "btn disabled btn-order w-100" : "btn btn-order w-100"}>Checkout</button> */}
                                            { !localCart.length > 0 || allTotalPrice < 1000 
                                                ? 
                                                <button className={!localCart.length > 0 || allTotalPrice < 1000 ? "btn disabled btn-order w-100" : "btn btn-order w-100"}><span className="text">Checkout</span></button>
                                                :
                                                <button onClick={() => Router.push('/checkout')} className={!localCart.length > 0 || allTotalPrice < 1000 ? "btn disabled btn-order w-100" : "btn btn-order w-100"}><span className="text">Checkout</span></button>
                                            }
                                            {/* <button onClick={() => Router.push('/checkout')} className={!localCart.length > 0 || allTotalPrice < 1000 ? "btn disabled btn-order w-100" : "btn btn-order w-100"}><span className="text">Checkout</span></button> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                }

                {/* Related Product shown on the review order */}
               {!localCart > 0 ? <section className="shopping-cart">
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
                </section> : ''}
            </Layout>
        </>
    );
};

export default ShoppingCart;