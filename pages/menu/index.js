import Layout from '../../components/Layout';
import Head from 'next/head';
import { useState } from 'react';
import Select from 'react-select';
import Slider from 'react-slick';
import Router from 'next/router';



const Menu = () => {
    const cities = [
        {value: 'Food Court, Abia Mall', label: 'Food Court, Abia Mall'},
        {value: 'Food Court, Lagos', label: 'Food Court, Lagos'},
        {value: 'Food Court, Kano', label: 'Food Court, Kano'},
        {value: 'Food Court, Abuja', label: 'Food Court, Abuja'},
        {value: 'Food Court, PH', label: 'Food Court, PH'}
    ];

    // const [ Productquantity, changeQuantity ] = useState({
    //     quantity: 0
    // });

    const [ addClass, changeClass ] = useState({
        active: false
    });

    const settings = {
        dots: true,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 3000,
    };

    const toggleActiveClass = () => {
        changeClass({
            active: !addClass.active
        });
    };

    let cartClasses = ['cart'];
    if(addClass.active) {
        cartClasses.push('active-cart');
    }


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
                <section className="products">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8">
                                <h4>Combo Deals</h4>
                                <div className="single-product">
                                    <div className="row">
                                        <div className="col-md-4 text-center mb-5 mb-sm-0">
                                            <img className="img-fluid" src="/images/food-order-image.png" alt="" />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="d-flex align-items-center justify-content-between flex-wrap mb-3">
                                                <p className="product-name">Small Body</p>
                                                <div className="d-flex">
                                                    <p className="product-qty">Quantity</p>
                                                    <input type='number' />
                                                </div>
                                            </div>
                                            <p className="product-description">Excepteur sint occaecat cupidatat non proident, sunt in.</p>
                                            <div className="d-flex align-items-center justify-content-between flex-wrap mt-5">
                                                <button className="btn">Add to cart</button>
                                                <p className="amount">N1000</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="single-product">
                                    <div className="row">
                                        <div className="col-md-4 text-center mb-5 mb-sm-0">
                                            <img className="img-fluid" src="/images/food-order-image.png" alt="" />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="d-flex align-items-center justify-content-between flex-wrap mb-3">
                                                <p className="product-name">Small Body</p>
                                                <div className="d-flex">
                                                    <p className="product-qty">Quantity</p>
                                                    <input type='number' />
                                                </div>
                                            </div>
                                            <p className="product-description">Excepteur sint occaecat cupidatat non proident, sunt in.</p>
                                            <div className="d-flex align-items-center justify-content-between flex-wrap mt-5">
                                                <button className="btn">Add to cart</button>
                                                <p className="amount">N1000</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cartClasses.join(' ')}>
                        <div className="cart-container">
                            <div className="cart-icon-container">
                                <button onClick={toggleActiveClass}> <img src="/images/icon/cart-icon.svg" alt=""/></button>
                                <p className="product-count">1</p>
                            </div>
                            <p className="cart-text">Cart</p>
                        </div>
                        <div className="cart-product-list">
                            <div className="product-list">
                                <img className="img-fluid" src="/images/food-order-image.png" alt=""/>
                                <p>Small body</p>
                                <input type='number' pattern='[0-9]{0,5}'/>
                                <p className="bold">N1000</p>
                                <button>x</button>
                            </div>
                            <div className="cart-button-actions d-flex align-items-center justify-content-between flex-wrap">
                                <div className="d-flex">
                                    <label className="contain">Save Basket
                                        <input type="checkbox" />
                                        <span className="checkmark"></span>
                                    </label>
                                </div>
                                <div>
                                    <button className="btn btn-grey mr-4" onClick={() => Router.push('/menu/shopping-cart')}>View/Edit Cart</button>
                                    <button className="btn">Proceed to Checkout</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
};

export default Menu;