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

                <header className="store-header">
                    {/* <img className="img-fluid" src="/images/store-location-2.png" alt=""/> */}
                </header>
                <section className="store-location">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 text-center">
                                <h4>You can find us here</h4>
                            </div>
                            <div className="col-md-4 mb-5">
                                <h5>Abia</h5>
                                <ul>
                                    <li>&ndash;Food Court, Abia Mall</li>
                                </ul>
                            </div>
                            <div className="col-md-4 mb-5">
                                <h5>Lagos</h5>
                                <ul>
                                    <li>&ndash;84 Ozumba Mbadiwe Street, Victoria island.</li>
                                    <li>&ndash;Murtala Muhammed International Airport Departure Lounge.</li>
                                </ul>
                            </div>
                            <div className="col-md-4 mb-5">
                                <h5>Portharcourt</h5>
                                <ul>
                                    <li>&ndash;1 Agip Road, Agip Roundabout, Rumeme.</li>
                                    <li>&ndash;GRA Junction, Aba Road.</li>
                                    <li>&ndash;222 Onne Road, GRA Phase II.</li>
                                </ul>
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