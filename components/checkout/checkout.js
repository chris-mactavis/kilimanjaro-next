

const checkout = () => {
    return (
        <>
            <section className="checkout-section shopping-cart">
                <div className="container">
                    <div className="row">
                       <div className="col-md-8">
                            <h4>Payment Method</h4>

                            <div className="d-flex align-items-center flex-wrap coupon-delivery-sect">
                                <label>
                                    <input type="radio" value="delivery" name="radio" />Payment on delivery
                                </label>
                                <label>
                                    <input type="radio" value="pick up" name="radio" />Payment online
                                </label>
                            </div>
                       </div>
                       <div className="col-md-4">
                            <h4>Order Details</h4>
                       </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default checkout;