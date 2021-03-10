import Link from 'next/link';

const Footer = ({showSecFooter}) => {
    return (
        <>
            {
                showSecFooter && <section className="sec-footer">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-7">
                                <p className="d-sm-block d-none">
                                    With the Kilimeals app anyone can simply use a mobile device <br/>
                                    to look over our numerous delicacies, place an order and pick up <br/>
                                    in store or have it delivered to their doorstep.
                                </p>
                                <p className="d-sm-none d-block">
                                    With the Kilimeals app anyone can simply use a mobile device
                                    to look over our numerous delicacies, place an order and pick up
                                    in store or have it delivered to their doorstep.
                                </p>
                                <div className="mobile-link-container">
                                    <a href=""><img src="/images/playstore.png" alt="" /></a>
                                    <a href=""><img src="/images/appstore.png" alt="" /></a>
                                </div>
                            </div>
                            <div className="col-md-5 d-lg-block d-none">
                                {/* <img className="app-img" src="/images/app-image.png" alt="" /> */}
                                <img className="app-img app-img-1" src="/images/app-1.png" alt="" />
                                <img className="app-img app-img-2" src="/images/app-2.png" alt="" />
                            </div>
                        </div>
                    </div>
                </section>
            }

            <footer className="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            {/* <div className="footer-body"> */}
                                <ul className="navbar-nav">
                                    <li className="nav-item mr-5">
                                        <Link href="/faq"><a className="nav-link">FAQ</a></Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link href="/tandc"><a className="nav-link">Terms and Conditions</a></Link>
                                    </li>
                                </ul>
                        </div>
                        <div className="col-md-4 text-center">
                            <p>Copyright 2020 Kilimanjaro Restaurants</p>
                        </div>

                        <div className="col-md-4">
                            <div className="social-media d-flex align-items-center justify-content-md-end justify-content-center flex-wrap">
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
                            {/* </div> */}
                      
                    </div>
                </div>
            </footer>
        </>
    )

};

export default Footer;