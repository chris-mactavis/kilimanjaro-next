import Head from 'next/head';
import { useState, useEffect } from 'react';
import Select from 'react-select';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';

import Layout from '../../components/Layout';
import { selectedRestaurant, saveRestaurants } from '../../store/actions/shop';
import axiosInstance from '../../config/axios';
import { loader } from '../../store/actions/loader';



const Menu = ({productCategories}) => {
    // console.log(productCategories);

    const [ productCategory, setProductCategory ] = useState(null);
    const [ products, setProducts ] = useState([]);
    // console.log(productCategory.category);
    console.log(products);

    const dispatch = useDispatch();
    const restaurant = useSelector(state => state.shop.selectedRestaurant);
    const allRestaurants = useSelector(state => state.shop.allRestaurants);

    useEffect(() => {
        const selectRestaurant =  JSON.parse(Cookies.get('selectedRestaurant'));
        const setRestaurants = JSON.parse(Cookies.get('setRestaurants'));
        if (!restaurant) {
            dispatch(selectedRestaurant(selectRestaurant));
        }

        if (!allRestaurants.length > 0) {
            dispatch(saveRestaurants(setRestaurants));
        }

    }, []);

    const [ addClass, changeClass ] = useState({
        active: false
    });

    const toggleActiveClass = () => {
        changeClass({
            active: !addClass.active
        });
    };

    let cartClasses = ['cart'];
    if(addClass.active) {
        cartClasses.push('active-cart');
    }

    const productDisplayHandler = (categoryId) => {
        dispatch(loader());
        setTimeout(() => {
            dispatch(loader());
        }, 1500);
        let productCat = productCategories.find(productCategory => productCategory.id === categoryId);
        let products = productCat.category_products;
        setProductCategory(productCat);
        setProducts(products);
    }

    return (
        <>
            <Layout>
                <Head>
                    <title>Menu | Kilimanjaro</title>
                </Head>
                <section className="select-restaurant">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <div className="d-flex flex-wrap align-items-center">
                                    <p>Ordering from</p>
                                    <form className="select-state">
                                        <Select className="select-tool" options={allRestaurants} placeholder='Select a restaurant' instanceId="menuCategories" />
                                    </form>
                                </div>
                                <ul className="product-cat">
                                    {productCategories.map((productCategory) => {
                                        if (productCategory.category_products.length > 0) {
                                            return <a onClick={() => productDisplayHandler(productCategory.id)} key={productCategory.id}><li className={`product-cat-list ${productCategory.id === productCategory.id ? '' : null}`}>{productCategory.category}</li></a>
                                        } else {
                                            return null;
                                        }
                                        
                                    })}
                                    {/* <a><li className="product-cat-list active">Combo deals</li></a>
                                     <a><li className="product-cat-list">Traditional</li></a>*/}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="products">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8">
                                <>
                                    <h4>{productCategory ? productCategory.category : null}</h4>
                                    {products.length > 0 ? products.map((prod) => {
                                    return <div key={prod.id} className="single-product">
                                            <div className="row">
                                                <div className="col-md-4 text-center mb-5 mb-sm-0">
                                                    <img className="img-fluid" src={prod.image_url} alt="" />
                                                </div>
                                                <div className="col-md-8">
                                                    <div className="d-flex align-items-center justify-content-between flex-wrap mb-3">
                                                        <p className="product-name">{prod.product}</p>
                                                        <div className="d-flex">
                                                            <p className="product-qty">Quantity</p>
                                                            <input type='number' />
                                                        </div>
                                                    </div>
                                                    <p className="product-description">{prod.short_description}</p>
                                                    <div className="d-flex align-items-center justify-content-between flex-wrap mt-5">
                                                        <button className="btn">Add to cart</button>
                                                        <div>
                                                            <p className="amount"><s>{`N${prod.price}`}</s></p>
                                                            { prod.sale_price === null ? null : <p className="amount sale">{'N' + prod.sale_price}</p> }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }) : null}
                                </>
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
                                                <div>
                                                    <p className="amount">N1000</p>
                                                    <p className="amount sale">N1000</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="single-product">
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
                                </div> */}
                                {/* <div className="single-product">
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
                                </div> */}
                            </div>
                            <div className="col-md-4">
                                <div className="coupon-on-menu">
                                    <a>
                                        <img className="img-fluid" src="/images/kili-spicy.png" alt="" />
                                    </a>
                                    <a>
                                        <img className="img-fluid" src="/images/kili-shawama-promo-2.png" alt="" />
                                    </a>
                                    <a>
                                        <img className="img-fluid" src="/images/Kili-promo-2.png" alt="" />
                                    </a>
                                    <a>
                                        <img className="img-fluid" src="/images/kili-easter-promo.png" alt="" />
                                    </a>
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
                                <p className="bold">N10000</p>
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
                                    <button className="btn btn-grey mr-4" onClick={() => Router.push('/cart')}>View/Edit Cart</button>
                                    <button className="btn" onClick={() => Router.push('/checkout')}>Proceed to Checkout</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
};

Menu.getInitialProps = async({req, res}) => {
    let selRestaurant = null;
    if (process.browser) {
        selRestaurant =  JSON.parse(Cookies.get('selectedRestaurant'));
    } else {
        selRestaurant =  JSON.parse(req.cookies.selectedRestaurant);
    }
    let restaurantId = selRestaurant.id;
    
    try {
        const {data: {data}} = await axiosInstance.get(`product-categories?restaurant_id=${restaurantId}`);
        return {productCategories: data};
    } catch (error) {
        console.log(error)
        return {};
    }
  }

export default Menu;