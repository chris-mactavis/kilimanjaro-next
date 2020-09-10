
const reviewOrder = () => {

    return (
        <>
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
                                <input type="radio" value="delivery" name="radio" />Delivery
                            </label>
                            <label>
                                <input type="radio" value="pick up" name="radio" />Pick up
                            </label>
                        </div>
                        <textarea placeholder='Order/delivery note' />
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
        </>
    );
};

export default reviewOrder;