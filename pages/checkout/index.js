import Layout from '../../components/Layout';
import Head from 'next/head';
import PlacesAutocomplete, { geocodeByAddress, getLatLng, } from 'react-places-autocomplete';
import { useForm } from 'react-hook-form';
import { useState } from 'react';


import OrderingSteps from '../../components/orders/orderingSteps/orderingSteps';
import FormInput from '../../components/formInput/formInput';
import Loader from '../../components/UI/loader';
// import { NotificationManager } from 'react-notifications';



const Checkout = () => {

    // const showNotifications = () => {
    //     NotificationManager.success('Message', 'Title', 3000);
    // }

    const [streetAddress, setStreetAddress] = useState('');
    const [latLng, setLatLng] = useState(null);
    const [paymentOption, setPaymentOption] = useState('delivery');
    const [ isLoading, setIsLoading ] = useState(false);
    const [ showNotification, setShowNotification] = useState(false);

    const { register, handleSubmit, errors, reset } = useForm();

    const billingInfoHandler = (data) => {

        setIsLoading(true);
        if (data) {
            data.latLng = latLng;
            console.log(data);
        }
        setTimeout(() => {
            setIsLoading(false);
            setShowNotification(state => !state.showNotification);
        }, 2000);
        setStreetAddress('');
        reset({});
    };

    const paymentOptionHandler = (e) => {
        setPaymentOption(e.target.value);
    };

    const handleChange = streetAddress => {
        // this.setState({ streetAddress });
        setStreetAddress(streetAddress);
    };

    const handleSelect = streetAddress => {
        geocodeByAddress(streetAddress)
            .then(async results => {
                const latLng = await getLatLng(results[0]);
                setStreetAddress(results[0].formatted_address);
                setLatLng(latLng);
            })
            .then(latLng => console.log('Success', latLng))
            .catch(error => console.error('Error', error));
    };


    return (
        <>
            <Layout>
                <Head>
                    <title>Checkout | Kilimanjaro</title>
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
                                            <input type="radio" value="delivery" name="radio" onChange={paymentOptionHandler} defaultChecked />Delivery
                                            </label>
                                        <label className="pay-opt">
                                            <input type="radio" value="pickup" name="radio" onChange={paymentOptionHandler} />Pickup
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
                                                        <input type="radio" value="payment on delivery" name="radio" />Pay On Delivery
                                                    </label>
                                                    <label className="payment">
                                                        <input type="radio" value="payment online" name="radio" />Pay Online
                                                    </label>
                                                </> 
                                                :
                                                <>
                                                    <label className="payment">
                                                        <input type="radio" value="payment online" name="radio" />Pay Online
                                                    </label>
                                                </>
                                            }
                                        </div>

                                        {/* Contact Details */}
                                       { paymentOption === 'delivery' && 
                                       <>
                                       <h4 className="mt-5">Billing Details</h4>
                                        <FormInput
                                            type="text"
                                            name="name"
                                            placeholder="Name*"
                                            label="Name"
                                            register={register({ required: true })}
                                            error={errors.name && 'This field is required.'}
                                        />
                                        <FormInput
                                            type="number"
                                            name="mobileNumber"
                                            placeholder="+234 80 1234 5678*"
                                            label="Mobile Number"
                                            register={register({ required: true })}
                                            error={errors.mobileNumber && 'This field is required.'}
                                        />
                                        <PlacesAutocomplete 
                                            value={streetAddress}
                                            onChange={handleChange}
                                            onSelect={handleSelect}
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
                                                        register={register({ required: true })}
                                                        error={errors.streetAddress && 'This field is required.'}
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
                                        <h4 className="mt-5">Additional Informations</h4>
                                        <textarea
                                            // className={errors.message ? 'textarea-error' : null}
                                            name="message"
                                            placeholder='Order/delivery note'
                                        />
                                    </div>

                                    <div className="col-md-5">
                                        <div className="order-details text-center">
                                            <h4>Order Details</h4>
                                            <div className="order-details-list">
                                                <div className="order-prod d-flex align-items justify-content-between mb-5 flex-wrap">
                                                    <p>2x <span>Yam porridge and fish</span></p>
                                                    <p>N2000</p>
                                                </div>
                                                <div className="total-order-details d-flex align-items justify-content-between flex-wrap">
                                                    <p>Subtotal</p>
                                                    <p>N2000</p>
                                                </div>
                                                <div className="total-order-details d-flex align-items justify-content-between flex-wrap">
                                                    <p>Delivery</p>
                                                    <p>N1000</p>
                                                </div>
                                                <div className="total-order-details d-flex align-items justify-content-between flex-wrap">
                                                    <p>Order Total </p>
                                                    <p>N3000</p>
                                                </div>
                                                <button className="btn btn-place-order">Place Order</button>
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