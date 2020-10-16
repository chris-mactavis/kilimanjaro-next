import Layout from '../../components/Layout';
import Head from 'next/head';

import ContactUs from '../../components/contactUs/contactUs';

const StoreLocation = () => {

    return (
        <>
            <Layout contactSection>
                <Head>
                    <title>Store Location | Kilimanjaro</title>
                </Head>

                <header className="store-header"></header>
                <section className="store-location">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 text-center">
                                <h4>You can find us here</h4>
                            </div>
                            <div className="col-md-4 mb-5">
                                <div className="card">
                                    <img className="img-fluid" src="/images/abia.png" alt="" />
                                    <div className="d-flex mt-5 align-items-center justify-content-between">
                                        <h5>Abia</h5>
                                        <button className="btn">
                                            View Outlets
                                    </button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 mb-5">
                                <div className="card">
                                    <img className="img-fluid" src="/images/lagos.png" alt=""/>
                                    <div className="d-flex mt-5 align-items-center justify-content-between">
                                    <h5>Lagos</h5>
                                    <button className="btn">
                                        View Outlets
                                    </button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 mb-5">
                                <div className="card">
                                    <img className="img-fluid" src="/images/Delta-Mall.png" alt="" />
                                    <div className="d-flex mt-5 align-items-center justify-content-between">
                                        <h5>Delta</h5>
                                        <button className="btn">
                                            View Outlets
                                    </button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 mb-5">
                                <div className="card">
                                    <img className="img-fluid" src="/images/abuja" alt="" />
                                    <div className="d-flex mt-5 align-items-center justify-content-between">
                                        <h5>Delta</h5>
                                        <button className="btn">
                                            View Outlets
                                    </button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 mb-5">
                                <div className="card">
                                    <img className="img-fluid" src="/images/lagos.png" alt="" />
                                    <div className="d-flex mt-5 align-items-center justify-content-between">
                                        <h5>Delta</h5>
                                        <button className="btn">
                                            View Outlets
                                    </button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 mb-5">
                                <div className="card">
                                    <img className="img-fluid" src="/images/lagos.png" alt="" />
                                    <div className="d-flex mt-5 align-items-center justify-content-between">
                                        <h5>Delta</h5>
                                        <button className="btn">
                                            View Outlets
                                    </button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 mb-5">
                                <div className="card">
                                    <img className="img-fluid" src="/images/lagos.png" alt="" />
                                    <div className="d-flex mt-5 align-items-center justify-content-between">
                                        <h5>Delta</h5>
                                        <button className="btn">
                                            View Outlets
                                    </button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 mb-5">
                            <div className="card">
                                    <img className="img-fluid" src="/images/lagos.png" alt="" />
                                    <div className="d-flex mt-5 align-items-center justify-content-between">
                                        <h5>Delta</h5>
                                        <button className="btn">
                                            View Outlets
                                    </button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 mb-5">
                                <div className="card">
                                    <img className="img-fluid" src="/images/lagos.png" alt="" />
                                    <div className="d-flex mt-5 align-items-center justify-content-between">
                                        <h5>Delta</h5>
                                        <button className="btn">
                                            View Outlets
                                    </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
               <ContactUs />
            </Layout>
        </>
    );
};

export default StoreLocation;