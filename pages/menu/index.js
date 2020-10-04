import Head from 'next/head';
import { useState, useEffect } from 'react';
import Select from 'react-select';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { NotificationManager } from 'react-notifications';


import Layout from '../../components/Layout';
import { selectedRestaurant, saveRestaurants, addToCart } from '../../store/actions/shop';
import axiosInstance from '../../config/axios';
import { loader } from '../../store/actions/loader';



const Menu = ({ productCategories }) => {

    const [restaurantCategories, setRestaurantCategories] = useState(productCategories);
    const [allProductCat, setAllProductCategory] = useState(null);
    const [products, setProducts] = useState([]);
    const [addClass, changeClass] = useState({ active: false });
    const [activeCategory, setActiveCategory] = useState([]);
    const [productCart, setProductCart] = useState([]);
    // console.log(productCart);
    //  All Store
    const dispatch = useDispatch();
    const restaurant = useSelector(state => state.shop.selectedRestaurant);
    const allRestaurants = useSelector(state => state.shop.allRestaurants);
    const allCart = useSelector(state => state.shop.cart);

    useEffect(() => {
        if (restaurantCategories.length > 0) {
            const prods = restaurantCategories[0].category_products;
            setAllProductCategory(restaurantCategories[0]);
            setProducts(prods);
            setActiveCategory(activeCategory => activeCategory.concat(`active-${restaurantCategories[0].id}`));
        }
    }, []);

    useEffect(() => {
        const selectRestaurant = JSON.parse(Cookies.get('selectedRestaurant'));
        const setRestaurants = JSON.parse(Cookies.get('setRestaurants'));

        // Fix for cart not displaying on reload!
        const cartItems = Cookies.get('setCart') ? JSON.parse(Cookies.get('setCart')) : [];
        dispatch(addToCart(cartItems));
        setProductCart(cartItems);

        // Issue is here
        // if (allCart.length > 0) {
        //     const allProductCart = JSON.parse(Cookies.get('setCart'));
        //     console.log(allProductCart);
        //
        //     if (!allCart.length > 0) {
        //         dispatch(addToCart(allProductCart));
        //         setProductCart(allProductCart);
        //     }
        // }
       
        if (!restaurant) {
            dispatch(selectedRestaurant(selectRestaurant));
        }

        if (!allRestaurants.length > 0) {
            dispatch(saveRestaurants(setRestaurants));
        }


    }, []);

    const toggleActiveClass = () => {
        changeClass({
            active: !addClass.active
        });
    };

    let cartClasses = ['cart'];
    if (addClass.active) {
        cartClasses.push('active-cart');
    }

    const productDisplayHandler = (categoryId) => {
        dispatch(loader());
        let productCat = restaurantCategories.find(productCategory => productCategory.id === categoryId);
        setActiveCategory([]);
        if (productCat.id === categoryId) {
            setActiveCategory(activeCategory => activeCategory.concat(`active-${categoryId}`))
        }
        let products = productCat.category_products;
        setAllProductCategory(productCat);
        setProducts(products);
        setTimeout(() => {
            dispatch(loader());
        }, 1500);
    }

    const handleMenuRestaurantInputChange = async value => {
        setAllProductCategory(null);
        setProducts([]);
        setActiveCategory([]);
        try {
            dispatch(loader());
            const { data: { data } } = await axiosInstance.get(`product-categories?restaurant_id=${value.id}`);
            const productCategories = data.filter(cat => cat.category_products.length > 0);
            if (productCategories.length > 0) {
                const prods = productCategories[0].category_products;
                setAllProductCategory(productCategories[0]);
                setProducts(prods);
                setActiveCategory(activeCategory => activeCategory.concat(`active-${productCategories[0].id}`));
            }
            setRestaurantCategories(productCategories);
            dispatch(loader());
        } catch (error) {
            console.log(error);
        }
    }

    let quantitySelected = 0;
    const handleQuantityChange = (e) => {
        quantitySelected = e.target.value
    };

    const addtoCartHandler = (prod) => {
        dispatch(loader());
        const prevCart = [...productCart];
        prevCart.push({
            product: prod,
            quantity: parseInt(quantitySelected)
        });
        setProductCart(prevCart);
        dispatch(addToCart(prevCart));
        if (!allCart.length > 0){Cookies.set('setCart', JSON.stringify(prevCart));}
        setTimeout(() => {
            dispatch(loader());
        }, 1500);
        setTimeout(() => {
            NotificationManager.success('Added successfully', '', 3000);
        }, 1500);
    }

    return (
        <>
            <Layout>
                <Head>
                    <title>Menu | Kilimanjaro</title>
                </Head>
                <section className={`select-restaurant ${!restaurantCategories.length > 0 ? 'active-select-restaurant' : null}`}>
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <div className="d-flex flex-wrap align-items-center">
                                    <p>Ordering from</p>
                                    <form className="select-state">
                                        <Select onChange={handleMenuRestaurantInputChange} className="select-tool" options={allRestaurants} placeholder='Select a restaurant' instanceId="menuCategories" />
                                    </form>
                                </div>
                                <ul className="product-cat">
                                    {restaurantCategories.map((productCategory) => {
                                        return <a onClick={() => productDisplayHandler(productCategory.id)} key={productCategory.id}><li className={activeCategory.includes(`active-${productCategory.id}`) ? 'product-cat-list active' : 'product-cat-list'}>{productCategory.category}</li></a>
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="products">
                    <div className="container">
                        <div className="row">
                            {!restaurantCategories.length > 0 ?
                                <div className="col-md-8">
                                    <p>Sorry, there are no menu available for this restaurant.</p>
                                </div>
                                :
                                <div className="col-md-8">
                                    <>
                                        <h4>{allProductCat ? allProductCat.category : null}</h4>
                                        {products.length > 0 ? products.map((prod) => {
                                            return <div key={prod.id} className="single-product">
                                                <div className="row">
                                                    <div className="col-md-4 text-center text-sm-left mb-5 mb-sm-0">
                                                        <img className="img-fluid" src={prod.image_url} alt="" />
                                                    </div>
                                                    <div className="col-md-8 pl-0">
                                                        <div className="d-flex align-items-center justify-content-between flex-wrap mb-3">
                                                            <p className="product-name">{prod.product}</p>
                                                            <div className="d-flex">
                                                                <p className="product-qty">Quantity</p>
                                                                <input onChange={handleQuantityChange} type='number' />
                                                            </div>
                                                        </div>
                                                        <p className="product-description">{prod.short_description}</p>
                                                        <div className="d-flex align-items-center justify-content-between flex-wrap mt-5">
                                                            <button onClick={() => addtoCartHandler(prod)} className="btn">Add to cart</button>
                                                            <div>
                                                                {prod.sale_price ? <p className="amount"><s>{`₦${prod.price}`}</s></p> : <p className="amount">{`₦${prod.price}`}</p>}
                                                                {prod.sale_price === null ? null : <p className="amount sale">{'₦' + prod.sale_price}</p>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        }) : null}
                                    </>
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
                                                <div>
                                                    <p className="amount">N1000</p>
                                                    <p className="amount sale">N1000</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                                </div>}
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
                                <button onClick={toggleActiveClass}> <img src="/images/icon/cart-icon.svg" alt="" /></button>
                                <p className="product-count">{allCart.length}</p>
                            </div>
                            <p className="cart-text">Cart</p>
                        </div>
                        <div className="cart-product-list">
                            {allCart.map((cart) => {
                                return <>
                                    <div key={cart.product.id} className="product-list">
                                        <img className="img-fluid" src={cart.product.image_url} alt="" />
                                        <p>{cart.product.product}</p>
                                        <input type='number' pattern='[0-9]{0,5}' />
                                        {cart.product.sale_price ? <p className="bold">{'₦'+cart.product.sale_price}</p> : <p className="bold">{'₦'+cart.product.price}</p>}
                                        <button>x</button>
                                    </div>
                                </>
                            })}
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

Menu.getInitialProps = async ({ req, res }) => {
    let selRestaurant = null;
    if (process.browser) {
        selRestaurant = JSON.parse(Cookies.get('selectedRestaurant'));
    } else {
        selRestaurant = JSON.parse(req.cookies.selectedRestaurant);
    }
    let restaurantId = selRestaurant.id;

    try {
        const { data: { data } } = await axiosInstance.get(`product-categories?restaurant_id=${restaurantId}`);
        const productCategories = data.filter(cat => cat.category_products.length > 0);
        return { productCategories };
    } catch (error) {
        console.log(error)
        return {};
    }
}

export default Menu;