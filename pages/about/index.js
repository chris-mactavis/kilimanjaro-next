import Layout from "../../components/Layout";
import Head from "next/head";


const About = () => {
    return (
        <Layout>
            <Head>
                <title>About | Kilimanjaro</title>
            </Head>
            <header className="store-header about-us"></header>
            <section className="contact-us store-location">
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center">
                            <h4>About Us</h4>
                        </div>
                        <div className="col-md-10 text-center mx-auto">
                            <p>
                                Kilimanjaro is one of Sundry Foods’ restaurant brands, operating in the Quick Service Restaurant (QSR) segment,
                                the brand has established itself as a market leader and one of the fastest growing restaurant brands in the 
                                country with currently 31 stores across Nigeria and more to come.
                            </p>
                            <p>
                                Kilimanjaro caters to the unique preference of the general populace in this part of sub-Saharan Africa for their local dishes.
                                Our unique menu consists of select popular contemporary and Nigerian offerings. Items on our menu can also be found on dining 
                                tables in other African countries. The Kilimanjaro brand was born out the quest to satisfy both local and continental food cravings of our people. 
                                We deliver fresh, hot and mouth-watering meals, pastries, sandwiches and beverages to thousands of customers in the finest environment each day. 
                                Our restaurants stand out for their bright colours and lovely ambience inviting you to dine-in or grab-and-go with the best quality meals.
                            </p>
                            <p>
                                We are working to ensure there is a Kilimanjaro restaurant in every major city in the country.
                            </p>    
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default About;