import Order from './order/order';

const Orders = () => {
    return (
        <>
            <section className="orders how-it-works">
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center">
                            <h2>Recent Orders</h2>
                        </div>
                        <Order />
                        <Order />
                    </div>
                </div>
            </section>
        </>

    );
};

export default Orders;