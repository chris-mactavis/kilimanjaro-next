
const OrderingSteps = ({activeTabs}) => {

    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <h1>Food Court, Abia Mall</h1>
                </div>
                <div className="col-md-7 mx-auto">
                    <div className="d-flex align-items-center justify-content-between mb-5">
                        <div className="number-container text-center">
                            <p className={`number ${activeTabs.includes(1) ? "active-number" : null}`}>1</p>
                            <p className="number-text">Shopping Cart</p>
                        </div>
                        <div className="number-container text-center mid-line">
                            <div className="align-items-center">
                                <p className={`number ${activeTabs.includes(2) ? "active-number" : null}`}>2</p>
                            </div>
                            <p className="number-text">Checkout</p>
                        </div>
                        <div className="number-container text-center">
                            <p className={`number ${activeTabs.includes(3) ? "active-number" : null}`}>3</p>
                            <p className="number-text">Order Complete</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default OrderingSteps;