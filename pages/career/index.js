import Layout from "../../components/Layout";
import Head from "next/head";
import Slider from 'react-slick';


const Career = () => {
    const settings = {
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 4000,
        // slidesToShow: 1,
    };

    return (
        <>
            <Layout>
                <Head>
                    <title>Career | Kilimanjaro</title>
                </Head>
                <header className="store-header about-us career"></header>
                <section className="contact-us store-location career">
                    <div className="container">
                        <div className="row mb-5 pb-5">
                            <div className="col-md-6">
                                <h4>Careers</h4>
                                <p>
                                    At Kilimanjaro, we pride ourselves in providing our employees with an enabling environment that inspires career growth and development.
                                    Our team of young, smart and passionate individuals are constantly challenged to deliver exceptional service.
                                    We regard this as the “calling to serve” rather than an occupation.
                                    We are friends and therefore motivate each other by maintaining a friendly work environment that exudes
                                    respect for individual differences and a desire to help each one achieve their personal goals.
                                </p>
                            </div>
                            <div className="col-md-6">
                                <h4>Testimonials</h4>
                                <Slider {...settings}>
                                    <div className="testimonial">
                                        <p className="testimonial-txt">Thanks for making my weekend a fabulous and fantastic one with the free meal I won.</p>
                                        <p className="testimonial-name">&ndash;Emeka Umejiego Kawawa</p>
                                    </div>
                                    <div className="testimonial">
                                        <p className="testimonial-txt">Anytime I eat at Kilimanjaro, I'm always happy.</p>
                                        <p className="testimonial-name">&ndash;Gift Finima</p>
                                    </div>
                                    <div className="testimonial">
                                        <p className="testimonial-txt">Nice place to eat good food.</p>
                                        <p className="testimonial-name">&ndash;Daniel Simon</p>
                                    </div>
                                </Slider>
                            </div>
                        </div>
                        <div className="row mt-5 pb-5">
                            <div className="col-md-6">``
                                <h4>Recruitment</h4>
                                <p>
                                    If you think you will fit into our team and you love to serve friends, then visit our current
                                    openings or send your resume along with a cover letter telling us about yourself and your 
                                    interests to <a className="link-to-hr" href="mailto:hr@sundryfood.com">hr@sundryfood.com</a> to get things started.
                                </p>
                            </div>
                            <div className="col-md-6">
                                <img className="img-fluid" src="/images/about-slide-img-1.jpg" alt=""/>
                            </div>
                        </div>
                        <div className="row mt-5 pt-5">
                            <div className="col-md-6">
                                <h4>Training &amp; development</h4>
                                <p>
                                    With a culture of internal development and an individual approach to career planning,
                                    we support and encourage our employees to shape their own future and grow with the company.
                                    We also groom our staff to take up leadership positions where they can showcase experience garnered
                                    from cross-functional work relationships within our system.
                                </p>
                                <p>
                                    We believe that training puts the employee right. Therefore we are committed to the learning and development
                                    of all employees at every level. We operate a high training budget annually to ensure that every employee improves
                                    and acquires core skill training. Our training school is equipped to provide employees with the perfect classroom
                                    and practical training experience to meet their development needs.
                                </p>
                            </div>
                            <div className="col-md-6">
                                <img className="img-fluid" src="/images/recruitment-pics.jpg" alt=""/>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
};

export default Career;