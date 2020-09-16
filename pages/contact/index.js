import Layout from "../../components/Layout";
import Head from "next/head";

import ContactUs from "../../components/contactUs/contactUs";


const Contact = () => {
    return (
        <>
        <Layout>
            <Head>
            <title>Contact Us| Kilimanjaro</title>
            </Head>
            <header className="store-header contact-us">
                {/* <img className="img-fluid" src="/images/store-location-2.png" alt=""/> */}
            </header>
            <ContactUs />
        </Layout>
        </>
    );
};

export default Contact;