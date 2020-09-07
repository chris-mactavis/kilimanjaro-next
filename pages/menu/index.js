import Layout from '../../components/Layout';
import Head from 'next/head';
import { useEffect } from 'react';
import Select from 'react-select';
import Slider from 'react-slick';



const Menu = () => {
    const cities = [
        {value: 'Food Court, Abia Mall', label: 'Food Court, Abia Mall'},
        {value: 'Food Court, Lagos', label: 'Food Court, Lagos'},
        {value: 'Food Court, Kano', label: 'Food Court, Kano'},
        {value: 'Food Court, Abuja', label: 'Food Court, Abuja'},
        {value: 'Food Court, PH', label: 'Food Court, PH'}
    ];

    var settings = {
        dots: true,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 3000,
    };

    return (
        <>
            <Layout>
                <Head>
                    <title>Menu | Kilimanjaro</title>
                </Head>
                <header className="menu-header">
                    <Slider {...settings}>
                        <img className="img-fluid" src="/images/food-banner.png" alt="" />
                        <img className="img-fluid" src="/images/food-banner.png" alt="" />
                        <img className="img-fluid" src="/images/food-banner.png" alt="" />
                        <img className="img-fluid" src="/images/food-banner.png" alt="" />
                        <img className="img-fluid" src="/images/food-banner.png" alt="" />
                    </Slider>
                </header>
                <section className="select-restaurant">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <div className="d-flex flex-wrap align-items-center">
                                    <p>Ordering from</p>
                                    <Select options={cities} placeholder='Select a restaurant' instanceId="menuCategories" />
                                </div>
                                <ul className="product-cat">
                                    <a><li className="product-cat-list active">Combo deals</li></a>
                                     <a><li className="product-cat-list">Traditional</li></a>
                                     <a><li className="product-cat-list">Continental</li></a>
                                     <a><li className="product-cat-list">Swallow</li></a>
                                     <a><li className="product-cat-list">Pastries</li></a>
                                     <a><li className="product-cat-list">Proteins</li></a>
                                     <a><li className="product-cat-list">Soup</li></a>
                                     <a><li className="product-cat-list">Drinks</li></a>
                                     <a><li className="product-cat-list">Kiligrill</li></a>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <section className="products">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8">

                            </div>
                        </div>
                    </div>
                </section> */}
            </Layout>
        </>
    );
};

export default Menu;