
const checkout = ({submitOrder}) => {

    let showDeliveryInput = false;

    // const changeAddressHandler = () => {
    //     showDeliveryInput = true
    // };

    return (
        <>
            <div className="checkout-section">
                <div className="row">
                    <div className="col-md-7">
                        {/* Payment Method */}
                        <h4>Payment Method</h4>
                        <div className="d-flex align-items-center flex-wrap coupon-delivery-sect">
                            <label>
                                <input type="radio" value="payment on delivery" name="radio" />Payment on delivery
                            </label>
                            <label>
                                <input type="radio" value="payment online" name="radio" />Payment online
                            </label>
                        </div>

                        {/* Contact Details */}
                        <h4 className="mt-5">Contact Details</h4>
                        <div className="contact-info">
                            <div className="contact-details">
                                <p>Full Name:<span>Abolarin O. Christopher</span></p>
                                <p>Email:<span>abol@gmail.com</span></p>
                                <p>Mobile:<span>+234 0812345678</span></p>
                            </div>
                            <div className="account-change d-flex flex-wrap align-items-center">
                                <p>Not Abolarin O. Christopher?</p>
                                <button>Change Account</button>
                            </div>
                        </div>

                        {/* Deliver To */}
                        <div className="contact-info">
                            <div className="contact-details">
                                <p>Delivery to:</p>
                                { !showDeliveryInput && <p className="delivery-text">No 7 Compellingly conceptualize holistic technology street</p> }
                                { showDeliveryInput && 
                                <>
                                    <input type="text" name="deliver" id="deliver" placeholder="Please insert a delivery address" />
                                    <button className="btn mt-3">Submit</button> 
                                </>}
                            </div>
                            <div className="account-change d-flex flex-wrap align-items-center">
                                <p>Delivery to a different address?</p>
                                <button>Add address</button>
                            </div>
                        </div>

                        
                        {/* <div className="delivery-address">
                            <h4 className="mt-5">Delivery Address</h4>
                           
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
                                <button onClick={submitOrder} className="btn btn-place-order">Place Order</button>
                            </div>
                        </div>

                        <div className="contact-info">
                            <div className="contact-details">
                                <p>Order/Delivery note</p>
                                <p className="delivery-text">Compellingly conceptualize holistic technology through
                                     B2B benefits. Continually embrace sticky sources through 
                                     B2C partnerships. Completely reinvent
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default checkout;