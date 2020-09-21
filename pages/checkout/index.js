import Layout from '../../components/Layout';
import Head from 'next/head';
import PlacesAutocomplete, { geocodeByAddress, getLatLng, } from 'react-places-autocomplete';
import { Component } from 'react';


import OrderingSteps from '../../components/orders/orderingSteps/orderingSteps';
import FormInput from '../../components/formInput/formInput';


class Checkout extends Component {
    state = { 
        streetAddress: '',
        latLong: null
    };

    preview = () => {
        const showDetails = this.state;
        console.log(showDetails);
    }

    handleChange = streetAddress => {
        this.setState({ streetAddress });
    };

    handleSelect = streetAddress => {
        geocodeByAddress(streetAddress)
          .then(async results => {
              const latLng = await getLatLng(results[0]);
              this.setState({
                    streetAddress: results[0].formatted_address,
                    latLong : latLng
                });
          })
          .then(latLng => console.log('Success', latLng))
          .catch(error => console.error('Error', error));
    };

    render() {
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
                                        {/* Payment Method */}
                                        <h4>Payment Method</h4>
                                        <div className="d-flex align-items-center flex-wrap coupon-delivery-sect">
                                            <label className="payment">
                                                <input type="radio" value="payment on delivery" name="radio" />Payment on delivery
                                        </label>
                                            <label className="payment">
                                                <input type="radio" value="payment online" name="radio" />Payment online
                                        </label>
                                        </div>

                                        {/* Contact Details */}
                                        <h4 className="mt-5">Billing Details</h4>
                                        <form className="signup-form">
                                            <FormInput
                                                type="text"
                                                name="name*"
                                                placeholder="Name"
                                                label="Name"
                                            />
                                            <FormInput
                                                type="number"
                                                name="mobileNumber"
                                                placeholder="+234 80 1234 5678"
                                                label="Mobile Number"
                                            />
                                            <PlacesAutocomplete key="addresses"
                                                value={this.state.streetAddress}
                                                onChange={this.handleChange}
                                                onSelect={this.handleSelect}
                                            >
                                                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                                    <div>
                                                        <FormInput
                                                            type="text"
                                                            name=""
                                                            label="Street/Estate Address"
                                                            {...getInputProps({
                                                                placeholder: 'Street/estate address',
                                                                className: 'location-search-input',
                                                            })}
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
                                                name="houseNumber*"
                                                placeholder="House Number"
                                                label="House Number"
                                            />
                                        </form>
                                        <h4 className="mt-5">Additional Information</h4>
                                        <textarea placeholder='Order/delivery note' />

                                        {/* Deliver To */}
                                        {/* <div className="contact-info">
                                            <div className="contact-details">
                                                <p>Delivery to:</p>
                                                <p className="delivery-text">No 7 Compellingly conceptualize holistic technology street</p>
                                                <>
                                                    <input type="text" name="deliver" id="deliver" placeholder="Please insert a delivery address" />
                                                    <button className="btn mt-3">Submit</button>
                                                </>
                                            </div>
                                            <div className="account-change d-flex flex-wrap align-items-center">
                                                <p>Delivery to a different address?</p>
                                                <button>Add address</button>
                                            </div>
                                            <textarea placeholder='Order/delivery note' />
                                        </div> */}
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
                                                <button onClick={this.preview} className="btn btn-place-order">Place Order</button>
                                            </div>
                                        </div>

                                        {/* <div className="contact-info">
                                            <div className="contact-details">
                                                <p>Order/Delivery note</p>
                                                <p className="delivery-text">Compellingly conceptualize holistic technology through
                                                B2B benefits. Continually embrace sticky sources through
                                                B2C partnerships. Completely reinvent
                                                </p>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </Layout>
            </>
        );
    }

};

export default Checkout;

{/* <div className="contact-info">
    <div className="contact-details">
        <p>Full Name:<span>Abolarin O. Christopher</span></p>
        <p>Email:<span>abol@gmail.com</span></p>
        <p>Mobile:<span>+234 0812345678</span></p>
    </div>
    <div className="account-change d-flex flex-wrap align-items-center">
        <p>Not Abolarin O. Christopher?</p>
        <button>Change Account</button>
    </div>
</div> */}