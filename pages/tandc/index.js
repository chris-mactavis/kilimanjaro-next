import Layout from "../../components/Layout";
import Head from "next/head";


const termsAndCondition = () => {

    return (
        <Layout>
            <Head>
                <title>Terms and Condition | Kilimanjaro</title>
            </Head>
            <header className="store-header about-us"></header>
            <section className="contact-us store-location about">
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center">
                            <h4>Terms and Condition</h4>
                        </div>
                        <div className="col-md-10 mx-auto">
                            <p>
                                Please carefully read the terms and conditions (“Terms and Conditions”) below before placing any order
                                from http://www.kilimanjaro-restaurants.com. By placing an order for any of the food items from this Website, 
                                whereas it is by phone, through our mobile applications or by any other available channel, you agree to be bound 
                                by these Terms and Conditions.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default termsAndCondition;