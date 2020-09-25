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
            <header className="store-header contact-us"></header>
            <ContactUs />
        </Layout>
        </>
    );
};

export default Contact;