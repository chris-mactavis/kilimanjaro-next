import Layout from "../../components/Layout";
import Head from "next/head";

const MakePayment = () => {
    return (
        <>
            <Layout>
                <Head>
                    <title>Make Payment | Kilimanjaro</title>
                </Head>
                <section className="pickupPayment shopping-cart">
                    <div className="container">
                        <div className="complete-order">
                            <div className="row">
                                <div className="col-md-6 mx-auto">
                                    <h2>Order number: 3w25414656</h2>
                                </div>

                                <div className="col-md-10 mx-auto">
                                    <div className="orders-info-container make-payment-container">
                                        <div>
                                            <div className="d-flex">
                                              <p>Date:</p> <p className="font-weight-bold ml-4">18th, Sept. 2020</p>
                                            </div> 
                                            <div className="d-flex">
                                                <p>Customers Name:</p> <p className="font-weight-bold ml-4">Mark David</p>
                                            </div>
                                            <div className="d-flex">
                                                <p>Phone Number:</p> <p className="font-weight-bold ml-4">+2341234567893</p>
                                            </div> 
                                        </div>
                                        <div className="table-responsive">
                                            <table class="table">
                                                <thead>
                                                    <tr>
                                                        <th>Item</th>
                                                        <th className="text-center">Quantity</th>
                                                        <th className="text-center">Unit Price</th>
                                                        <th className="text-right">Amount</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Small Body</td>
                                                        <td className="text-center">1</td>
                                                        <td className="text-center">N1000</td>
                                                        <td className="text-right">N1000</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Small Body</td>
                                                        <td className="text-center">2</td>
                                                        <td className="text-center">N1000</td>
                                                        <td className="text-right">N2000</td>
                                                    </tr>
                                                    <tr>
                                                        <td>&nbsp;</td>
                                                        <td>&nbsp;</td>
                                                        <td className="amt-total text-center">Total:</td>
                                                        <td className="amt-total text-right">N3,000</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="text-right">
                                            <button className="btn btn-login">Make Payment</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
};

export default MakePayment;