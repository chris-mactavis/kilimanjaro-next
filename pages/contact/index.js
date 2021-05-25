import Layout from "../../components/Layout";
import Head from "next/head";

import ContactUs from "../../components/contactUs/contactUs";
import axiosInstance from '../../config/axios';


const Contact = ({contact_banner, head_office_address, email}) => {

    return (
        <>
        <Layout>
            <Head>
            <title>Contact Us| Kilimanjaro</title>
            </Head>
            <header className="store-header contact-us"  style={{backgroundImage: `url(${contact_banner})`}}></header>
            <ContactUs 
                headOfficeAddress={head_office_address} 
                email={email} />
        </Layout>
        </>
    );
};

Contact.getInitialProps = async() => {
    try {
        const {data: {data: {contact_banner, head_office_address, email}}} = await axiosInstance.get('settings');
        return {contact_banner, head_office_address, email}; 
    } catch(e) {
        console.log(e);
        return {};
    }
}

export default Contact;