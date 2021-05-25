
import Head from "next/head";
import Slider from 'react-slick';

import Layout from "../../components/Layout";
import axiosInstance from '../../\/config/axios';



const About = ({about_banner, about_content, about_gallery}) => {
    console.log({about_banner});
    console.log({about_content});
    console.log({about_gallery});

    const settings = {
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 3000,
        centerMode: true,
        centerPadding: '100px',
        slidesToShow: 3,
        responsive: [
            {
             breakpoint: 992,
             settings: {
                arrows: false,
                centerMode: true,
                centerPadding: '40px',
                slidesToShow: 2
             }
            },
            {
              breakpoint: 768,
              settings: {
                arrows: false,
                centerMode: true,
                centerPadding: '40px',
                slidesToShow: 1
              }
            },
            {
              breakpoint: 480,
              settings: {
                arrows: false,
                centerMode: true,
                centerPadding: '40px',
                slidesToShow: 1
              }
            }
        ]
    };

    return (
        <Layout>
            <Head>
                <title>About | Kilimanjaro</title>
            </Head>
            {/* <header className="store-header about-us"></header> */}
            <header className="store-header about-us" style={{backgroundImage: `url(${about_banner})`}}>
                {/* <img src="/images/about-slide-img-1.jpg" alt="" className="img-fluid" /> */}
            </header>
            <section className="contact-us store-location about">
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center">
                            <h4>About Us</h4>
                        </div>
                        <div className="col-md-10 text-sm-center text-left mx-auto">
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
                    <div className="mt-5 slide-images">
                        <div className="row">
                            <div className="col-12">
                                <Slider {...settings}>
                                    <img className="img-fluid" src="/images/about-slide-img-1.jpg" alt="" />
                                    <img className="img-fluid" src="/images/about-slide-img-2.jpg" alt="" />
                                    <img className="img-fluid" src="/images/about-slide-img-3.jpg" alt="" />
                                    <img className="img-fluid" src="/images/about-slide-img-2.jpg" alt="" />
                                    <img className="img-fluid" src="/images/about-slide-img-3.jpg" alt="" />
                                    <img className="img-fluid" src="/images/about-slide-img-1.jpg" alt="" />
                                </Slider>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

About.getInitialProps = async() => {
    try {
        const {data: {data: {about_banner, about_content, about_gallery}}} = await axiosInstance.get('settings');
        return {about_banner, about_content, about_gallery};
    } catch(e) {
        console.log(e);
        return {};
    }
}

export default About;