import Layout from "../../components/Layout";
import Head from "next/head";
import Link from "next/link";

import axiosInstance from '../../config/axios';


const termsAndCondition = ({tandc, tandc_banner}) => {

    const createMarkup = (html) => ({__html: html});

    return (
        <Layout>
            <Head>
                <title>Terms and Condition | Kilimanjaro</title>
            </Head>
            <header className="store-header about-us"  style={{backgroundImage: `url(${tandc_banner})`}}></header>
            <section className="contact-us store-location about tandc">
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center">
                            <h4 className="mb-3">Terms and Conditions</h4>
                        </div>
                        <div className="col-md-10 mx-auto">
                            <div dangerouslySetInnerHTML={createMarkup(tandc)}></div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

termsAndCondition.getInitialProps = async() => {
    try {
        const {data: {data: {tandc, tandc_banner}}} = await axiosInstance.get('settings');
        return {tandc, tandc_banner}; 
    } catch(e) {
        console.log(e);
        return {};
    }
}

export default termsAndCondition;