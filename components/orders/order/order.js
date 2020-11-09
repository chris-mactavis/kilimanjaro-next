const Order = () => {
    return (
        <>
            <div className="col-md-8 mx-auto">
                <div className="orders-container">
                    <div className="row">
                        {/* <div className="col-md-4 text-center mb-5 mb-sm-0">
                            <img className="img-fluid" src="/images/food-order-image.png" alt="" />
                            <div style={{backgroundImage: 'url(https://image.shutterstock.com/image-photo/view-lagos-lagoon-victoria-island-260nw-1066980758.jpg)'}}></div>
                        </div> */}
                        <div className="col-md-12">
                            <div className="order-details-container">
                                <div className="d-flex flex-wrap justify-content-between">
                                    <p className="text-red">Food Court, Abia Mall</p>
                                    <p className="date">20th May, 3:25PM</p>
                                </div>
                                <div className="d-flex flex-wrap justify-content-between">
                                    <p className="prices-details">1x Yam porridge and Fish</p>
                                    <p className="prices-details">N1600</p>
                                </div>
                                <div className="d-flex flex-wrap justify-content-between">
                                    <p className="prices-details">2x Beef Shawarma</p>
                                    <p className="prices-details">N2400</p>
                                </div>
                                <div className="d-flex flex-wrap justify-content-between">
                                    <p className="prices-details bold-text">Total(Including vat)</p>
                                    <p className="prices-details bold-text">N4000</p>
                                </div>
                                <div className="text-right"><button className="btn">Re-order</button></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Order;