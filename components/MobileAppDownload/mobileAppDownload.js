const MobileAppDownload = () => {
    return (
        <>
            <section className="download-mobile-app">
                <div className="container">
                    <div className="row">
                        <div className="col-md-7">
                            <p>
                            With the Kilimeals app anyone can simply use a mobile device
                            to look over our numerous delicacies, place an order and pick up 
                            in store or have it delivered to their doorstep.
                            </p>
                            <div className="mobile-link-container">
                                <a href=""><img src="/images/playstore.png" alt="" className="img1" /></a>
                                <a href=""><img src="/images/appstore.png" alt="" className="img2" /></a>
                            </div>
                        </div>
                        <div className="col-md-5">
                            <img className="app-img" src="/images/app-image.png" alt=""/>
                        </div>
                    </div>
                </div>
                {/* <img src="/images/app-image.png" alt=""/> */}
            </section>
        </>
    )
};

export default MobileAppDownload;