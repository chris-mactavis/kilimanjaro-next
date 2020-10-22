import Layout from '../../components/Layout';
import Head from 'next/head';
import PlacesAutocomplete, { geocodeByAddress, getLatLng, } from 'react-places-autocomplete';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { NotificationManager } from 'react-notifications';


import OrderingSteps from '../../components/orders/orderingSteps/orderingSteps';
import FormInput from '../../components/formInput/formInput';
import axiosInstance from '../../config/axios';
import { addToCart, updateTotalPrice } from '../../store/actions/shop'
import { loader } from '../../store/actions/loader';



const Checkout = () => {

    //  All store
    const allCart = useSelector(state => state.shop.cart);
    const allTotalPrice = useSelector(state => state.shop.updatedPrice);
    const loggedIn = useSelector(state => state.auth.loggedIn); 

    const [streetAddress, setStreetAddress] = useState('');
    const [latLng, setLatLng] = useState(null);
    const [paymentOption, setPaymentOption] = useState('delivery');
    const [ paymentMethod, setPaymentmethod] = useState('payment on delivery');
    const [ isLoading, setIsLoading ] = useState(false);
    const [ selectedRestaurant, setSelectedRestaurant ] = useState(null);
    const [ deliveryPrice, setDeliveryPrice ] = useState(0);
    const [ total, setTotal ] = useState(allTotalPrice)
    const [value, setValue] = useState(0);

    const [localCart, setLocalCart] = useState([]);

    const dispatch = useDispatch();

    const isLoggedIn = useSelector( state => state.auth.loggedIn);
    let user = useSelector(state => state.auth.user);
    user = JSON.parse(user);
    
    // let orderTotal = allTotalPrice;

    // if (deliveryPrice) {
    //     orderTotal = deliveryPrice.delivery_price + allTotalPrice;
    // }
    
    useEffect(() => {
        const allProductCart = Cookies.get('setCart') ? JSON.parse(Cookies.get('setCart')) : [];
        Cookies.get('setCart') ? setLocalCart(JSON.parse(Cookies.get('setCart'))) :  setLocalCart([]);
        const tolPrice = Cookies.get('totalPrice') ? JSON.parse(Cookies.get('totalPrice')) : null;
        const selectedRes =  Cookies.get('selectedRestaurant') ? JSON.parse(Cookies.get('selectedRestaurant')) : null;
        setSelectedRestaurant(selectedRes);

        dispatch(updateTotalPrice(tolPrice));

        if (!localCart.length > 0) {
            dispatch(addToCart(allProductCart));
        }
    }, []);

    const { register, handleSubmit, errors, reset } = useForm();

    const billingInfoHandler = async data => {
       dispatch(loader());
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
                orderData = {
                    email: user.email,
                    phone: data.phone,
                    signup_device: 'web',
                    restaurant_id : selectedRestaurant.id,
                    street_address: streetAddress,
                    house_number: data.houseNumber,
                    longitude: latLng.lng,
                    latitude: latLng.lat,
                    payment_method: 'webPay',
                    quantity: localCart.length,
                    subtotal: allTotalPrice,
                    delivery: deliveryPrice,
                    total: total,
                    order_type: paymentOption,
                    ordered_from: 'web',
                    delivery_note: data.message,
                    order_items: cartItems
                }
            } else {
                orderData = {
                    first_name: data.first_name,
                    last_name: data.last_name,
                    email: data.email,
                    phone: data.phone,
                    signup_device: 'web',
                    restaurant_id : selectedRestaurant.id,
                    street_address: streetAddress,
                    house_number: data.houseNumber,
                    longitude: latLng.lng,
                    latitude: latLng.lat,
                    payment_method: 'webPay',
                    quantity: localCart.length,
                    subtotal: allTotalPrice,
                    delivery: deliveryPrice,
                    total: total,
                    order_type: paymentOption,
                    ordered_from: 'web',
                    delivery_note: data.message,
                    order_items: cartItems
                }
            }

            if ((paymentOption === 'delivery' && paymentMethod === 'pay online') || (paymentOption === 'pickup' && paymentMethod === 'pay online')) {
                FlutterwaveCheckout({
                    public_key: "FLWPUBK_TEST-fe28dc780f5dd8699e9ac432c33c036e-X",
                    tx_ref: "hooli-tx-1920bbtyt",
                    amount: total,
                    currency: "NGN",
                    country: "NG",
                    payment_options: "card, mobilemoneyghana, ussd",
                    redirect_url: // specified redirect URL
                        Route.push('/order-complete'),
                    meta: {
                        consumer_id: 23,
                        consumer_mac: "92a3-912ba-1192a",
                    },
                    customer: {
                        email: user.email,
                        phone_number: user.phone,
                        name: user.first_name + user.last_name,
                    },
                    callback: async (data) => {
                        try {
                            const data = await axiosInstance.post('orders', orderData);
                            const orderItem = data.data.data; 
                            console.log(orderItem);
                            Cookies.set('orderItem', JSON.stringify(orderItem));
                            dispatch(loader());
                            NotificationManager.success('Order added successfully', '', 3000);
                            Router.push('/complete-order');
                            dispatch(addToCart([]));
                            dispatch(updateTotalPrice(0));
                            Cookies.remove('setCart');
                            Cookies.remove('totalPrice');
                        } catch (error) {
                            console.log(error);
                            dispatch(loader());
                            NotificationManager.error(error.response.data.message, '', 3000);
                        }
                        console.log(data);
                    },
                    onclose: function() {
                        // close modal
                    },
                    customizations: {
                        title: "My store",
                        description: "Payment for items in cart",
                        logo: "https://assets.piedpiper.com/logo.png",
                    },
                });
            }

            try {
                const data = await axiosInstance.post('orders', orderData);
                const orderItem = data.data.data; 
                console.log(orderItem);
                Cookies.set('orderItem', JSON.stringify(orderItem));
                dispatch(loader());
                NotificationManager.success('Order added successfully', '', 3000);
                Router.push('/complete-order');
                dispatch(addToCart([]));
                dispatch(updateTotalPrice(0));
                Cookies.remove('setCart');
                Cookies.remove('totalPrice');
            } catch (error) {
                console.log(error);
                dispatch(loader());
                NotificationManager.error(error.response.data.message, '', 3000);
            }

        }
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
        setStreetAddress('');
        reset({});
    };

    const verifyEmailHandler = async email => {
        try {
            const { data: {data: {email_exists}} } = await axiosInstance.post('verify-email', {email});
            return !email_exists || 'Email already exists. Do you want to login instead?'
        } catch (error) {

        }
    }

    const onchangePaymentOption = (e) => {
        console.log(e.target.value);
        setPaymentOption(e.target.value);
    };

    const onchangePaymentMethod = (e) => {
        console.log(e.target.value);
        setPaymentmethod(e.target.value);
    }
  
    const handleChange = (streetAddress) => {
        setStreetAddress(streetAddress);
    };

    const handleSelect = streetAddress => {
        // setTotal(0);
        setDeliveryPrice(0);
        setValue(value => ++value);
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
                    dispatch(loader());
                    const {data: {data}} = await axiosInstance.post('delivery-fee', deliveryDataForAmount);
                    console.log(data);
                    setDeliveryPrice(data.delivery_price);
                    // let calculateTotal = total;
                    const calculateTotal = +data.delivery_price + +allTotalPrice;
                    setTotal(calculateTotal);
                    setValue(value => ++value);
                    setTimeout(() => {
                        dispatch(loader());
                    }, 1000)
                    // console.log(data);
                } catch(error) {
                    console.log(error);
                }
                // console.log('Success', latLng)
            })
            .catch(error => console.error('Error', error));
    };
    
    const searchOptions = {
        componentRestrictions: {country: "ng"}
    }

    const makePayment = () => {
        
    };

    const loginRedirect = () => {
        Cookies.set('checkoutToLogin', 'check-redirect');
        Router.push('/signup');
    }

    return (
        <>
            <Layout>
                <Head>
                    <title>Checkout | Kilimanjaro</title>
                    <script src="https://checkout.flutterwave.com/v3.js"></script>
                </Head>
                <section className="shopping-cart">
                    <div className="container">
                        <OrderingSteps activeTabs={[1, 2]} />
                        {/* Checkout */}
                        <div className="checkout-section">
                            <div className="row">
                                <div className="col-md-7">
                                    <h4>Payment Option</h4>
                                    <div className="d-flex align-items-center flex-wrap coupon-delivery-sect">
                                        <label className="pay-opt">
                                            <input type="radio" value="delivery" name="radio" onChange={onchangePaymentOption} defaultChecked />Delivery
                                            </label>
                                        <label className="pay-opt">
                                            <input type="radio" value="pickup" name="radio" onChange={onchangePaymentOption} />Pickup
                                            </label>
                                    </div>
                                </div>
                            </div>
                            <form onSubmit={handleSubmit(billingInfoHandler)} className="signup-form">
                                <div className="row">
                                    <div className="col-md-7">
                                        {/* Payment Method */}
                                        <h4 className="mt-4">Payment Method</h4>
                                        <div className="d-flex align-items-center flex-wrap coupon-delivery-sect">
                                            { paymentOption === 'delivery' 
                                                ?
                                                <>
                                                    <label className="payment">
                                                        <input type="radio" value="payment on delivery" onChange={onchangePaymentMethod} name="radio" defaultChecked />Pay On Delivery
                                                    </label>
                                                    <label className="payment">
                                                        <input type="radio" value="payment online" onChange={onchangePaymentMethod} name="radio" />Pay Online
                                                    </label>
                                                </> 
                                                :
                                                <>
                                                    <label className="payment">
                                                        <input type="radio" value="payment online" onChange={onchangePaymentMethod} name="radio" />Pay Online
                                                    </label>
                                                </>
                                            }
                                        </div>

                                        {/* Contact Details */}
                                       { paymentOption === 'delivery' && 
                                       <>
                                       <h4 className="mt-5">Billing Details</h4>
                                       {!loggedIn && <div>
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
                                                required: 'Please input a valid email address' ,
                                                pattern: /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/,
                                                validate: async value => verifyEmailHandler(value) 
                                            })}
                                            error={errors.email && errors.email.message}
                                        />
                                         <FormInput
                                            type="password"
                                            name="password"
                                            placeholder="Password*"
                                            label="Password"
                                            register={register({ required: true, minLength: 8 })}
                                            error={errors.password && errors.password.message}
                                        />
                                        </div>}
                                        <FormInput
                                            type="number"
                                            name="phone"
                                            placeholder="+234 80 1234 5678*"
                                            label="Mobile Number"
                                            register={register({ required: 'This field is required.' })}
                                            error={errors.phone && errors.phone.message}
                                        />
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
                                                            placeholder: 'Street/estate address*',
                                                            className: 'location-search-input',
                                                        })}
                                                        register={register({ required: 'This field is required.' })}
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
                                            error={errors.houseNumber && 'This field is required.'}
                                        /> 
                                        </>}
                                        {!isLoggedIn && <p>ALready a member? <a onClick={loginRedirect} className="red-colored">Login</a></p>}
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
                                                            <p key={cart}>{'₦'+cart.totalPrice}</p>
                                                        </div>
                                                    })}
                                                </div>
                                                <div className="total-order-details d-flex align-items justify-content-between flex-wrap">
                                                    <p>Subtotal</p>
                                                    <p>{'₦'+allTotalPrice}</p>
                                                </div>
                                                <div className="total-order-details d-flex align-items justify-content-between flex-wrap">
                                                    <p>Delivery</p>
                                                    <p>{`${deliveryPrice === null ? '₦0' : '₦'+deliveryPrice}`}</p>
                                                </div>
                                                <div className="total-order-details d-flex align-items justify-content-between flex-wrap">
                                                    <p>Order Total </p>
                                                    <p>{'₦'+total}</p>
                                                </div>
                                                <p style={{"fontSize":"14px"}} className="d-flex align-items-center mt-4"><img className="mr-2" src="images/icon/exclamation-mark.svg" alt=""/>Please select a city and restaurant close to you before you can place your order.</p>
                                                <button className={deliveryPrice === null ? "btn btn-place-order disabled" : "btn btn-place-order"}>Place Order</button>
                                                {/* <button className="btn btn-place-order " type="button" onClick={makePayment}>Pay Now</button> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );

};

export default Checkout;