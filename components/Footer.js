const Footer = ({showSecFooter}) => {
    return (
        <>
            {
                showSecFooter && <section className="sec-footer">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-7">
                                <p>
                                    With the Kilimeals app anyone can simply use a mobile device
                                    to look over our numerous delicacies, place an order and pick up
                                    in store or have it delivered to their doorstep.
                            </p>
                                <div className="mobile-link-container">
                                    <a href=""><img src="/images/playstore.png" alt="" /></a>
                                    <a href=""><img src="/images/appstore.png" alt="" /></a>
                                </div>
                            </div>
                            <div className="col-md-5">
                                <img className="app-img" src="/images/app-image.png" alt="" />
                            </div>
                        </div>
                    </div>
                </section>
            }

            <footer className="footer">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="footer-body">
                                <p>Copyright 2020 Kilimanjaro Restaurants</p>
                                <div className="social-media">
                                    <a href="https://www.instagram.com/kilirestaurant/" target="_blank">
                                        <img src="/images/icon/instagram.svg" alt="" className="img-fluid" />
                                    </a>
                                    <a href="https://twitter.com/kilirestaurant" target="_blank">
                                        <img src="/images/icon/twitter.svg" alt="" className="img-fluid" />
                                    </a>
                                    <a href="http://www.facebook.com/kilimanjarorestaurants" target="_blank">
                                        <img src="/images/icon/facebook.svg" alt="" className="img-fluid" />
                                    </a>
                                    <a href="mailto:info@sundryfood.com" target="_blank">
                                        <img src="/images/icon/mail.svg" alt="" className="img-fluid" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )

};

export default Footer;