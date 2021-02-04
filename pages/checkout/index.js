import Layout from '../../components/Layout';
import Head from 'next/head';
import PlacesAutocomplete, { geocodeByAddress, getLatLng, } from 'react-places-autocomplete';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { NotificationManager } from 'react-notifications';
import Link from 'next/link';
import $ from 'jquery';

import OrderingSteps from '../../components/orders/orderingSteps/orderingSteps';
import OrderingStepsMobile from '../../components/orders/orderingStepsMobile/orderingStepsMobile';
import FormInput from '../../components/formInput/formInput';
import axiosInstance from '../../config/axios';
import { addToCart, setCouponAmount, setTotalPriceWithCoupon, updateTotalPrice, setTheDeliveryPrice } from '../../store/actions/shop'
import { loader } from '../../store/actions/loader';
import InlineLoadingWhite from '../../components/UI/inlineLoaderWhite';
import InlineLoading from '../../components/UI/inlineLoader';



const Checkout = () => {

    const { register, handleSubmit, errors, reset } = useForm();
    const {
        register: register2,
        errors: errors2,
        handleSubmit: handleSubmit2,
        reset: reset2
      } = useForm({});
    

    //  All store
    const allCart = useSelector(state => state.shop.cart);
    const allTotalPrice = useSelector(state => state.shop.updatedPrice);
    const couponStorePrice = useSelector(state => state.shop.couponAmount);
    const deliveryPriceInStore = useSelector(state => state.shop.deliveryPrice);
    // const loggedIn = useSelector(state => state.auth.loggedIn);
    const loadingState = useSelector(state => state.loader.loading);
    const isLoggedIn = useSelector(state => state.auth.loggedIn);
    let user = useSelector(state => state.auth.user) || {};
    user = typeof user === 'object' ? user : JSON.parse(user);
    const couponCode = useSelector(state => state.shop.couponName);

    const [streetAddress, setStreetAddress] = useState('');
    const [latLng, setLatLng] = useState(null);
    const [paymentOption, setPaymentOption] = useState('delivery');
    const [ paymentMethod, setPaymentmethod] = useState('payment on delivery');
    const [ isLoading, setIsLoading ] = useState(false);
    const [ selectedRestaurant, setSelectedRestaurant ] = useState(null);
    const [ deliveryPrice, setDeliveryPrice ] = useState(deliveryPriceInStore);
    const [ total, setTotal ] = useState(allTotalPrice)
    const [value, setValue] = useState(0);
    const [passwordShown, setPasswordShown] = useState(false);
    const [ inlineLoader, setInlineLoader ] = useState(false);
    const [ couponLoader, setCouponLoader ] = useState(0);
    const [ couponErrorMessage, setCouponErrorMessage ] = useState('');
    const [ theCouponPrice, setTheCouponPrice ] = useState(couponStorePrice);
    const [ theCouponCodeName, setTheCouponCodeName ] = useState(couponCode);

    const [ paymentInfoInterswitch, setPaymentInfoInterwitch ] = useState({});
    const [ stringHash, setStringHash ] = useState(null);
    const [ theProId, setTheProId ] = useState(null);

    // console.log(paymentInfoInterswitch);
    // console.log(stringHash);
    // console.log(theProId);


    const [localCart, setLocalCart] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        if (isLoggedIn) {
            async function fetchDeductedBalance() {
                try {
                    const token = Cookies.get('token');
                    const  { data: balanceDeducted }  = await axiosInstance.patch("deduct-order-price-from-unused-balance", {
                        order_price: total
                    }, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
    
                    console.log(balanceDeducted);
                } catch(error) {
                   console.log(error);
                }
            }
            fetchDeductedBalance();
        }
    }, []);
  
    
    useEffect(() => {
        const allProductCart = Cookies.get('setCart') ? JSON.parse(Cookies.get('setCart')) : [];
        Cookies.get('setCart') ? setLocalCart(JSON.parse(Cookies.get('setCart'))) :  setLocalCart([]);
        // const tolPrice = Cookies.get('totalPrice') ? JSON.parse(Cookies.get('totalPrice')) : null;
        const selectedRes =  Cookies.get('selectedRestaurant') ? JSON.parse(Cookies.get('selectedRestaurant')) : null;
        setSelectedRestaurant(selectedRes);

        // dispatch(updateTotalPrice(tolPrice));

        // if (!localCart.length > 0) {
            dispatch(addToCart(allProductCart));
        // }
       
    }, []);
    
    useEffect(() => {
        const newTotalPriceAfterCoupon = allTotalPrice - theCouponPrice + deliveryPrice;
        setTotalPriceWithCoupon(newTotalPriceAfterCoupon);
        if (newTotalPriceAfterCoupon) {
            setTotal(newTotalPriceAfterCoupon);
        }
        Cookies.set('totalPriceAmtWithCoupon', newTotalPriceAfterCoupon);
        setValue(value => ++value);
    }, [theCouponPrice, deliveryPrice]);

    useEffect(() => {
        window.$ = $;
            $(window).ready(function () {
                const $el = $("html, body");
                $el.css({'overflow-x': 'unset'});
            });
    }, []);

    useEffect(() => {
        if ($(window).width() > 768) {
            $(window).scroll(function (e) {
                const $el = $('.order-details');
                const isPositionFixed = ($el.css('position') === 'sticky');
                if ($(this).scrollTop() > 140 && !isPositionFixed) {
                    $el.css({'position': 'sticky', 'top': '100px'});
                }
                if ($(this).scrollTop() < 140 && isPositionFixed) {
                    $el.css({'position': 'static', 'top': '0'});
                }
            });
        } 

        if (paymentOption === 'pickup') {
            console.log('true');
            setPaymentmethod('payment online')
        } else {
            console.log('false')
            setPaymentmethod('payment on delivery');
        }
    }, [paymentOption, setPaymentmethod]);


    const billingInfoHandler = async data => {
       dispatch(loader());
       setInlineLoader(true);
        const cartItems = localCart.map(cart => ({
            restaurant_product_id: cart.product.id,
            product_cost: cart.price,
            quantity: cart.quantity,
            subtotal: cart.totalPrice,
            variation: cart.product.product_type === 'variable' ? cart.product_variation : ''
        }));

        if (data) {
            let orderData = {};
            if (isLoggedIn) {
                // if logged in
                if (paymentOption === 'delivery') {
                    // delivery (online and on delivery)
                    orderData = {
                        email: user.email,
                        phone: data.phone,
                        signup_device: 'web',
                        restaurant_id : selectedRestaurant.id,
                        street_address: streetAddress,
                        house_number: data.houseNumber,
                        longitude: latLng.lng,
                        latitude: latLng.lat,
                        payment_method: paymentMethod === 'payment online' ? 'webPay' : 'Pay on delivery',
                        quantity: localCart.length,
                        subtotal: allTotalPrice,
                        delivery: deliveryPrice,
                        total: total,
                        order_type: paymentOption,
                        ordered_from: 'web',
                        delivery_note: data.message,
                        order_items: cartItems
                    }
                } else if (paymentOption === 'pickup') {
                    // if pickup
                    orderData = {
                        email: user.email,
                        phone: data.phone,
                        signup_device: 'web',
                        restaurant_id : selectedRestaurant.id,
                        payment_method: 'webPay',
                        quantity: localCart.length,
                        subtotal: allTotalPrice,
                        total: total,
                        order_type: paymentOption,
                        ordered_from: 'web',
                        delivery_note: data.message,
                        order_items: cartItems
                    };
                }
            } else {
                //  if not logged in
                if (paymentOption === 'delivery') {
                    // If delivery (both online and pay on delivery)
                    orderData = {
                        first_name: data.first_name,
                        last_name: data.last_name,
                        email: data.email,
                        phone: data.phone,
                        signup_device: 'web',
                        restaurant_id: selectedRestaurant.id,
                        street_address: streetAddress,
                        house_number: data.houseNumber,
                        longitude: latLng.lng,
                        latitude: latLng.lat,
                        payment_method: paymentMethod === 'payment online' ? 'webPay' : 'Pay on delivery',
                        quantity: localCart.length,
                        subtotal: allTotalPrice,
                        delivery: deliveryPrice,
                        total: total,
                        order_type: paymentOption,
                        ordered_from: 'web',
                        delivery_note: data.message,
                        order_items: cartItems
                    }
                } else if (paymentOption === 'pickup') {
                    // if pickup
                    orderData = {
                        first_name: data.first_name,
                        last_name: data.last_name,
                        email: data.email,
                        phone: data.phone,
                        signup_device: 'web',
                        restaurant_id: selectedRestaurant.id,
                        payment_method: 'webPay',
                        quantity: localCart.length,
                        subtotal: allTotalPrice,
                        total: total,
                        order_type: paymentOption,
                        ordered_from: 'web',
                        delivery_note: data.message,
                        order_items: cartItems
                    };
                }
            }

            if ((paymentOption === 'delivery' && paymentMethod === 'payment online') || (paymentOption === 'pickup'  && paymentMethod === 'payment online')) {
                /** FLUTTERWAVE PAYMENT HANDLER */
                // const trans = FlutterwaveCheckout({
                //     public_key: "FLWPUBK_TEST-fe28dc780f5dd8699e9ac432c33c036e-X",
                //     tx_ref: `kilimanjaro-ref-${Math.random() * 99}`,
                //     amount: total,
                //     currency: "NGN",
                //     country: "NG",
                //     payment_options: "card, mobilemoneyghana, ussd",
                //     meta: {
                //         consumer_id: 23,
                //         consumer_mac: "92a3-912ba-1192a",
                //     },
                //     customer: {
                //         email: isLoggedIn ? user.email : data.email,
                //         phone_number: isLoggedIn ? user.phone : data.phone,
                //         name: isLoggedIn ? (user.first_name + ' ' + user.last_name) : (data.first_name + ' ' + data.last_name),
                //     },
                //     callback: async (data) => {
                //         try {
                //             await submitOrder(orderData);
                //             trans.close();
                //         } catch (error) {
                //             console.log(error);
                //             dispatch(loader());
                //             setInlineLoader(false); 
                //             NotificationManager.error(error.response.data.message, '', 3000);
                //         }
                //         console.log(data);
                //     },
                //     onclose: function() {
                //         dispatch(loader());
                //         setInlineLoader(false); 
                //     },
                //     customizations: {
                //         title: "Killimanjaro",
                //         description: "Payment for items in cart",
                //         logo: "/images/logo.png",
                //     },
                // });

                 /** INTERSWITCH PAYMENT HANDLER */
                // const productId = [];
                // let theProductId = null;
                // const sha512 = require('sha512');
                // let hash = '';
                // const info = {
                //     ref: `kilimanjaro-ref-${Math.random() * 99}`,
                //     product_id: localCart.map((cart, id) =>  {
                //         productId.push(cart.product.id);
                //         const newId = productId.join('');
                //         theProductId = newId;
                //     }),
                //     payItemId: `${Math.floor(Math.random() * 999)}`,
                //     userInfoName: isLoggedIn ? (user.first_name + ' ' + user.last_name) : (data.first_name + ' ' + data.last_name),
                //     theCusId: isLoggedIn && user.id,
                //     MacKey: "D3D1D05AFE42AD50818167EAC73C109168A0F108F32645C8B59E897FA930DA44F9230910DAC9E20641823799A107A02068F7BC0F4CC41D2952E249552255710F",

                // };

                let transRef = 'Kili-' + parseInt(Math.random() * 100000);
                let itemId = "936";
                let amount = total;
                let siteRedirectUrl = "http://localhost:8080/webpopupnew.html";
                let macKey = "D3D1D05AFE42AD50818167EAC73C109168A0F108F32645C8B59E897FA930DA44F9230910DAC9E20641823799A107A02068F7BC0F4CC41D2952E249552255710F";

                let theId = [];
                const id = localCart.map((cart, id) =>  {
                    theId.push(cart.product.id);
                    const newId = theId.join('');
                   
                });

                let productId = `${theId.join('')}`;

                // setPaymentInfoInterwitch(info);
                // setTheProId(theProductId);
                const sha512 = require("sha512");
                const hashString =  transRef + productId + itemId + amount + siteRedirectUrl + macKey;
                let hash = sha512(hashString).toString('hex').toUpperCase();

                console.log(hashString, hash);
            
                var obj = {
                    postUrl: "https://sandbox.interswitchng.com/collections/w/pay",
                    amount,
                    productId,
                    transRef,
                    siteName: "Kilimanjaro",
                    itemId,
                    customerId: "84",
                    siteRedirectUrl,
                    currency: "NGN",
                    hash,
                    onComplete: function (paymentResponse) {
                        console.log(paymentResponse);
                    }
                };

                new IswPay(obj);

                dispatch(loader());
                setInlineLoader(false);

            } else {
                try {
                    await submitOrder(orderData);
                } catch (error) {
                    console.log(error);
                    dispatch(loader());
                    setInlineLoader(false);
                    NotificationManager.error(error.response.data.message, '', 3000);
                }
            }

        }
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
        setStreetAddress('');
        reset({});
    };

    const submitOrder = async (orderData) => {
        const data = await axiosInstance.post('orders', orderData);
        const orderItem = data.data.data;
        Cookies.set('orderItem', JSON.stringify(orderItem));
        dispatch(loader());
        setInlineLoader(false); 
        NotificationManager.success('Order added successfully', '', 3000);
        Router.push('/complete-order');
        dispatch(addToCart([]));
        dispatch(updateTotalPrice(0));
        Cookies.remove('setCart');
        Cookies.remove('totalPrice');
    }

    const verifyEmailHandler = async email => {
        try {
            const { data: {data: {email_exists}} } = await axiosInstance.post('verify-email', {email});
            return !email_exists || 'Email already exists. Do you want to login instead?'
        } catch (error) {

        }
    }

    const onchangePaymentOption = (e) => {
        setPaymentOption(e.target.value);
    };

    const onchangePaymentMethod = (e) => {
        setPaymentmethod(e.target.value);
    }
  
    const handleChange = (streetAddress) => {
        setStreetAddress(streetAddress);
    };

    const handleSelect = streetAddress => {
        dispatch(loader());
        setInlineLoader(true);
        geocodeByAddress(streetAddress)
            .then(async results => {
                const latLng = await getLatLng(results[0]);
                setStreetAddress(results[0].formatted_address);
                setLatLng(latLng);
                return latLng;
            })
            .then(async latLng => {
                // console.log(latLng, 'handle');
                const deliveryDataForAmount = {
                    restaurant_id: selectedRestaurant.id,
                    longitude: latLng ? latLng.lng : null,
                    latitude: latLng ? latLng.lat : null
                }

                try {
                    const {data: {data}} = await axiosInstance.post('delivery-fee', deliveryDataForAmount);
                    const getDeliveryCoupon = Cookies.get('deliveryCoupon') ? Cookies.get('deliveryCoupon') : null;
                    if (getDeliveryCoupon) {
                        setDeliveryPrice(0);
                        setTheDeliveryPrice(0);
                    } else {
                        setDeliveryPrice(data.delivery_price);
                        setTheDeliveryPrice(data.delivery_price);
                    }
                    setValue(value => ++value);
                    setTimeout(() => {
                        dispatch(loader());
                        setInlineLoader(false);
                    }, 1000);
                } catch(error) {
                    console.log(error);
                    dispatch(loader());
                    setInlineLoader(false);
                }
            })
            .catch(error => console.error('Error', error));
    };
    
    const searchOptions = {
        componentRestrictions: {country: "ng"}
    }

    const makePayment = () => {
        
    };

    const loginRedirect = () => {
        localStorage.setItem('checkoutToLogin', '/checkout');
        Router.push('/signup');
    }

    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    const couponErrorMessageHandler = (message) => {
        setCouponErrorMessage(message)
        NotificationManager.error(message, '', 6000);
        setTimeout(() => {
            setCouponErrorMessage('')
        }, 6000);
    }

    const couponApplication = async data => {
        const couponCode = data.coupon;
        dispatch(loader());
        setCouponLoader(1);
        const getDeliveryCoupon = Cookies.get('deliveryCoupon') ? Cookies.get('deliveryCoupon') : null;


        try {
            const token = Cookies.get('token');
            const  { data: firstUserCode }  = await axiosInstance.get("is-ftu", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const  { data: {data: couponResult} }  = await axiosInstance.get(`coupons?code=${couponCode}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const theCouponApplication = () => {
                // CHECKING FOR COUPON TYPE
                if (couponResult.coupon_type == 'percentage') {
                    Cookies.set('coupName',  couponCode);
                    // CHECKING FOR MINIMUN ORDER BEFORE APPLYING THE COUPON
                    if (allTotalPrice >= +couponResult.min_order) {
                        const newPrice = (+couponResult.value / 100) * allTotalPrice;
                        setCouponAmount(newPrice);
                        Cookies.set('couponAmt', newPrice);
                        NotificationManager.success('Coupon code applied successfully', '', 3000);
                        setValue(value => ++value);
                        setTheCouponPrice(newPrice);
                        setTheCouponCodeName(couponCode);
                    } else {
                        couponErrorMessageHandler(`Sorry, this coupon requires a minimum order of ₦${couponResult.min_order} in order to be applied.`);
                    }
    
                } else if (couponResult.coupon_type == 'price') {
                    Cookies.set('coupName',  couponCode);
                     // CHECKING FOR MINIMUN ORDER BEFORE APPLYING THE COUPON
                    if (allTotalPrice >= +couponResult.min_order) {
                        const newPrice = +couponResult.value;
                        setCouponAmount(newPrice);
                        Cookies.set('couponAmt', newPrice);
                        NotificationManager.success('Coupon code applied successfully', '', 3000);
                        setValue(value => ++value);
                        setTheCouponPrice(newPrice);
                        setTheCouponCodeName(couponCode);
                    } else {
                        couponErrorMessageHandler(`Sorry, this coupon requires a minimum order of ₦${couponResult.min_order} in order to be applied.`);
                    }
    
                } else if (couponResult.coupon_type == 'delivery') {
                    Cookies.set('coupName',  couponCode);
                      // CHECKING FOR MINIMUN ORDER BEFORE APPLYING THE COUPON
                    if (allTotalPrice >= +couponResult.min_order) {
                        const newPrice = 0;
                        setCouponAmount(newPrice);
                        Cookies.set('couponAmt', newPrice);
                        Cookies.set('deliveryCoupon', 1);
                        NotificationManager.success('Coupon code applied successfully', '', 3000);
                        setTheCouponPrice(newPrice);
                        setDeliveryPrice(0);
                        setTheDeliveryPrice(0);
                        setTheCouponCodeName(couponCode);
                    } else {
                        couponErrorMessageHandler(`Sorry, this coupon requires a minimum order of ₦${couponResult.min_order} in order to be applied.`);
                    }
                }
            }

            if (theCouponPrice > 0 || getDeliveryCoupon == 1) {
                couponErrorMessageHandler('Sorry, you can only apply this coupon once.');
            } else {
                //  This test if a coupon is for a city  
                if (couponResult.cities == null || couponResult.cities.includes(+selectedRestaurant.city_id)) {
                    // This test if the coupon is avialable
                    if (couponResult.status) {
                        // This test if the user is a first time user
                        if ((firstUserCode == 1 && couponResult.ftu == 1)) {
                            theCouponApplication();  
                        } else if ((firstUserCode == 0 && couponResult.ftu == 0)) {
                            theCouponApplication();
                        } else if ((firstUserCode == 1 && couponResult.ftu == 0)) {
                            theCouponApplication();
                        } else {
                            couponErrorMessageHandler("Sorry, this coupon is only for first time users.");
                        }
                    } else {
                        couponErrorMessageHandler("Sorry, this coupon is not available at the moment.");
                    }

                } else {
                    couponErrorMessageHandler("Sorry, this coupon is not available in your city.");
                }
            } 
            
            
            dispatch(loader());
            setCouponLoader(0)
        } catch (error) {
            dispatch(loader());
            setCouponLoader(0)
            NotificationManager.error(error.response.data.message, '', 5000);
            console.log(error);
        }
        reset2({});
    };

    const interswitchPaymentHandler = () => {
       return <>
        <input name="product_id" type="hidden" value={`${theProId}`} />
        <input name="pay_item_id" type="hidden" value={`${paymentInfoInterswitch.payItemId}`} />
        <input name="amount" type="hidden" value={`${total}`} />
        <input name="currency" type="hidden" value="566" />
        <input name="site_redirect_url" type="hidden" value="http://localhost:3000/complete-order"/>
        <input name="txn_ref" type="hidden" value={`${paymentInfoInterswitch.ref}`} />
        <input name="cust_id" type="hidden" value={`${paymentInfoInterswitch.theCusId}`} />
        <input name="cust_name" type="hidden" value={`${paymentInfoInterswitch.userInfoName}`} />
        <input name="hash" type="hidden" value={`${stringHash}`} />
        </>
    }

    return (
        <>
            <Layout>
                <Head>
                    <title>Checkout | Kilimanjaro</title>
                    <script src="https://checkout.flutterwave.com/v3.js"></script>
                    <script type="text/javascript" src="http://sandbox.interswitchng.com/collections/public/webpay.js"></script>
                </Head>

                {
                    !localCart.length > 0 || allTotalPrice < 1000 
                    ? 
                    <section className="shopping-cart empty-cart">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="empty-cart-container">
                                        <p className="d-flex align-items-center"><img className="pr-2 img-fluid" src="/images/icon/exclamation-mark.svg" alt="" />A minimum order of ₦1000 is required before checking out. current cart's total is: ₦{allTotalPrice === null ? '0' : allTotalPrice}</p>
                                        {!localCart.length > 0 && <p>Your cart is currently empty.</p>}
                                        {localCart.length > 0
                                            ?
                                            <Link href="/cart"><button className="btn"><span className="text">Return to cart</span></button></Link>
                                            :
                                            <Link href="/"><button className="btn"><span className="text">Return to homepage</span></button></Link>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    :
                    <section className="shopping-cart">
                        <div className="container">
                            <OrderingSteps activeTabs={[1, 2]} />
                            <OrderingStepsMobile activeTabs={[2]} />
                            {/* Checkout */}
                            <div className="checkout-section">
                                <div className="row">
                                    <div className="col-md-7">
                                        <h4>Payment Option</h4>
                                        <div className="d-flex align-items-center flex-wrap coupon-delivery-sect">
                                            <label className="payment">
                                                <input type="radio" value="delivery" name="radio" onChange={onchangePaymentOption} key={'Delivery'} defaultChecked />Delivery
                                            </label>
                                            <label className="payment">
                                                <input type="radio" value="pickup" name="radio" onChange={onchangePaymentOption} key={'Pickup'} />Pickup
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <form id="checkoutForm" key={1} onSubmit={handleSubmit(billingInfoHandler)} className="signup-form" 
                                    action={(paymentOption === 'delivery' && paymentMethod === 'payment online') || (paymentOption === 'pickup') ? 'https://sandbox.interswitchng.com/webpay/pay' : ''} 
                                    method={(paymentOption === 'delivery' && paymentMethod === 'payment online') || (paymentOption === 'pickup') ? 'POST' : ''}>

                                    {/* {(paymentOption === 'delivery' && paymentMethod === 'payment online') || (paymentOption === 'pickup') 
                                    ? interswitchPaymentHandler() : '' } */}
    
                                    <div className="row">
                                        <div className="col-md-7">
                                            {/* Payment Method */}
                                            <h4 className="mt-4">Payment Method</h4>
                                            <div className="d-flex align-items-center flex-wrap coupon-delivery-sect">
                                                {paymentOption === 'delivery'
                                                    ?
                                                    <>
                                                        <label className="payment">
                                                            <input type="radio" value="pay on delivery" onChange={onchangePaymentMethod} name="radio" defaultChecked key={'PayOnDelivery'} />Pay On Delivery
                                                        </label>
                                                        <label className="payment">
                                                            <input type="radio" value="payment online" onChange={onchangePaymentMethod} name="radio" key={'PayOnline'} />Pay Online
                                                        </label>
                                                    </>
                                                    :
                                                    <>
                                                        <label className="payment">
                                                            <input type="radio" value="payment online" onChange={onchangePaymentMethod} name="radio" defaultChecked key={'PayOnline-2'} />Pay Online
                                                         </label>
                                                    </>
                                                }
                                            </div>

                                            {!isLoggedIn && <p>Already a member? <a onClick={loginRedirect} className="red-colored">Login</a></p>}

                                            {/* Contact Details */}
                                            {paymentOption === 'pickup' && isLoggedIn ? '' : <h4 className="mt-5">Billing Details</h4>}
                                            {!isLoggedIn && <div>
                                                <FormInput
                                                    type="text"
                                                    name="first_name"
                                                    placeholder="First Name*"
                                                    label="First Name"
                                                    register={register({ required: 'First name is required' })}
                                                    error={errors.first_name && errors.first_name.message}
                                                />
                                                <FormInput
                                                    type="text"
                                                    name="last_name"
                                                    placeholder="Last Name*"
                                                    label="Last Name"
                                                    register={register({ required: 'Last name is required' })}
                                                    error={errors.last_name && errors.last_name.message}
                                                />
                                                <FormInput
                                                    type="email"
                                                    name="email"
                                                    placeholder="Email*"
                                                    label="Email"
                                                    register={register({
                                                        required: 'Please input a valid email address',
                                                        pattern: /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/,
                                                        validate: async value => verifyEmailHandler(value)
                                                    })}
                                                    error={errors.email && errors.email.message}
                                                />
                                                <div>
                                                    <label htmlFor="Password">Password</label>
                                                    <div className="textbox">
                                                        <input
                                                            type={passwordShown ? "text" : "password"}
                                                            name="password"
                                                            placeholder="Password*"
                                                            label="Password"
                                                            ref={register({ required: 'Password must be more than 8 characters', minLength: 8 })}
                                                        />
                                                        <i onClick={togglePasswordVisiblity} className={passwordShown ? "fa fa-eye" : "fa fa-eye-slash"} aria-hidden="true"></i>
                                                        <div className={`border ${errors.password ? "border-error" : null}`}></div>
                                                    </div>
                                                    {errors.password && <p className="error">{errors.password.message}</p>}
                                                </div>
                                                {paymentOption === 'pickup' && <FormInput
                                                    type="number"
                                                    name="phone"
                                                    placeholder="+234 80 1234 5678*"
                                                    label="Mobile Number"
                                                    register={register({ required: 'This field is required.' })}
                                                    error={errors.phone && errors.phone.message}
                                                />}
                                            </div>
                                            }

                                            {isLoggedIn && <FormInput
                                                type="number"
                                                name="phone"
                                                placeholder="+234 80 1234 5678*"
                                                label="Mobile Number"
                                                register={register({ required: 'This field is required.' })}
                                                error={errors.phone && errors.phone.message}
                                                defaultValue={user && user.phone}
                                            />}

                                            {paymentOption === 'delivery' && <div>
                                                <PlacesAutocomplete
                                                    value={streetAddress}
                                                    onChange={handleChange}
                                                    onSelect={handleSelect}
                                                    searchOptions={searchOptions}
                                                >
                                                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                                        <div>
                                                            <FormInput
                                                                type="text"
                                                                name='streetAddress'
                                                                label="Street/Estate Address"
                                                                {...getInputProps({
                                                                    placeholder: 'Manually type your street/estate address',
                                                                    className: 'location-search-input',
                                                                })}
                                                                register={register({ required: 'This field is required' })}
                                                                error={errors.streetAddress && errors.streetAddress.message}
                                                            />
                                                            <div className="autocomplete-dropdown-container">
                                                                {loading && <div>Loading...</div>}
                                                                {suggestions.map((suggestion) => {
                                                                    const className = suggestion.active
                                                                        ? 'suggestion-item--active'
                                                                        : 'suggestion-item';
                                                                    // inline style for demonstration purpose
                                                                    const style = suggestion.active
                                                                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                                                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                                                    return (
                                                                        <div className="input-suggestion" key={suggestion.placeId}
                                                                            {...getSuggestionItemProps(suggestion, {
                                                                                style,
                                                                            })}
                                                                        >
                                                                            <span>{suggestion.description}</span>
                                                                        </div>
                                                                    );
                                                                })}
                                                            </div>
                                                        </div>
                                                    )}
                                                </PlacesAutocomplete>
                                                <FormInput
                                                    type="text"
                                                    name="houseNumber"
                                                    placeholder="House Number*"
                                                    label="House Number"
                                                    register={register({ required: true })}
                                                    error={errors.houseNumber && 'This field is required'}
                                                />
                                            </div>}

                                            <h4 className="mt-5">Additional Informations</h4>
                                            <textarea
                                                // className={errors.message ? 'textarea-error' : null}
                                                name="message"
                                                placeholder='Order/delivery note'
                                                ref={register}
                                            />
                                        </div>

                                        <div className="col-md-5">
                                            <div className="order-details text-center">
                                                <h4>Order Details</h4>
                                                <div className="order-details-list">
                                                    <div className="order-prod mb-5">
                                                        {localCart.map((cart, id) => {
                                                            return <div className="d-flex align-items-center justify-content-between flex-wrap w-100" key={cart.product.id}>
                                                                <p>{cart.quantity}x <span>{cart.product.product}</span></p>
                                                                <p key={cart}>{'₦' + cart.totalPrice}</p>
                                                            </div>
                                                        })}
                                                    </div>
                                                    <div className="total-order-details d-flex align-items justify-content-between flex-wrap">
                                                        <p>Subtotal</p>
                                                        <p>{'₦' + allTotalPrice}</p>
                                                    </div>
                                                   { theCouponPrice > 0 && <div className="total-order-details d-flex align-items justify-content-between flex-wrap">
                                                        <p>Coupon: {theCouponCodeName}</p>    
                                                        <p>- {'₦' + theCouponPrice}[Remove]</p>
                                                    </div> }
                                                    {paymentOption === 'delivery' && <div className="total-order-details d-flex align-items justify-content-between flex-wrap">
                                                        <p>Delivery</p>
                                                        <p>{`${deliveryPrice === null ? '₦0' : '₦' + deliveryPrice}`}</p>
                                                    </div>}
                                                    <div className="total-order-details d-flex align-items justify-content-between flex-wrap">
                                                        <p>Order Total </p>
                                                        <p>{'₦' + total}</p>
                                                    </div>
                                                    {deliveryPrice === null && <p style={{ "fontSize": "14px" }} className="d-flex align-items-center mt-4">Please select a city and restaurant close to you before you can place your order.</p>}
                                                    <div className="d-flex justify-content-center">{loadingState && inlineLoader ? <InlineLoadingWhite /> : <button type="submit" className={deliveryPrice === null ? "btn-white btn-place-order disabled-white" : "btn-white btn-place-order"}><span className="text">Place Order</span></button>}</div>
                                                    {/* <button className="btn btn-place-order " type="button" onClick={makePayment}>Pay Now</button> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                <div className="row">
                                    <div className="col-md-7">
                                        <form key={2} onSubmit={handleSubmit2(couponApplication)} className="signup-form coupon-form">
                                            <div className="coupon-container">
                                                <input className="coupon-input" ref={register2()} type="text" name="coupon" placeholder="Paste Coupon Code" />
                                                {loadingState && couponLoader === 1 ? <InlineLoading /> : <button className="btn"><span className="text">Apply Coupon</span></button> }
                                            </div>
                                            <p className="error">{couponErrorMessage}</p>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                }
            </Layout>
        </>
    );

};

export default Checkout;