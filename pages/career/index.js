import Layout from "../../components/Layout";
import Head from "next/head";
import Slider from 'react-slick';
import axiosInstance from '../../config/axios';


const Career = ({careers, career_recruitment, career_recruitment_image, career_tnd, career_tnd_image, career_banner, testimonials}) => {
    const settings = {
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 4000,
        // slidesToShow: 1,
    };

    const createMarkup = (html) => ({__html: html});
    console.log({testimonials});

    return (
        <>
            <Layout>
                <Head>
                    <title>Career | Kilimanjaro</title>
                </Head>
                <header className="store-header about-us career" style={{backgroundImage: `url(${career_banner})`}}>
                  
                </header>
                <section className="contact-us store-location career">
                    <div className="container">
                        <div className="row mb-5 pb-5">
                            <div className="col-md-6">
                                <h4>Careers</h4>
                                <div dangerouslySetInnerHTML={createMarkup(careers)}></div>
                            </div>
                            <div className="col-md-6">
                                <h4>Testimonials</h4>
                                <Slider {...settings}>
                                    {testimonials.map((testimonial) => {
                                        return <div key={testimonial.user_id} className="testimonial">
                                                <div dangerouslySetInnerHTML={createMarkup(testimonial.testimony)}></div>
                                                <p className="testimonial-name">&ndash;{testimonial.user.first_name} {testimonial.user.last_name}</p>
                                            </div>
                                    } )}
                                </Slider>
                            </div>
                        </div>
                        <div className="row mt-5 pb-5">
                            <div className="col-md-6">
                                <h4>Recruitment</h4>
                                <div  dangerouslySetInnerHTML={createMarkup(career_recruitment)}></div>
                            </div>
                            <div className="col-md-6">
                                <img className="img-fluid" src={career_recruitment_image} alt=""/>
                            </div>
                        </div>
                        <div className="row mt-5 pt-5">
                            <div className="col-md-6">
                                <h4>Training &amp; development</h4>
                                <div  dangerouslySetInnerHTML={createMarkup(career_tnd)}></div>
                            </div>
                            <div className="col-md-6">
                                <img className="img-fluid" src={career_tnd_image} alt=""/>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
};

Career.getInitialProps = async() => {
    try {
        const {data: {data: {careers, career_recruitment, career_recruitment_image, career_tnd, career_tnd_image, career_banner}}} = await axiosInstance.get('settings');
        const {data: {data}} = await axiosInstance.get('testimonials');
        return {careers, career_recruitment, career_recruitment_image, career_tnd, career_tnd_image, career_banner, testimonials: data}; 
    } catch(e) {
        console.log(e);
        return {};
    }
}

export default Career;