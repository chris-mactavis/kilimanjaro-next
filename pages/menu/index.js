import Head from 'next/head';
import { useState, useEffect } from 'react';
import Select from 'react-select';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { NotificationManager } from 'react-notifications';
import nookies from 'nookies';
// import { useForm } from "react-hook-form";



import Layout from '../../components/Layout';
import { selectedRestaurant, saveRestaurants, addToCart, setTotalPrice, updateVariablePrice  } from '../../store/actions/shop';
import axiosInstance from '../../config/axios';
import { loader } from '../../store/actions/loader';
import InlineLoading from '../../components/UI/inlineLoader';




const Menu = ({ productCategories }) => {

    //  All Store
    const dispatch = useDispatch();
    const restaurant = useSelector(state => state.shop.selectedRestaurant);
    const allRestaurants = useSelector(state => state.shop.allRestaurants);
    const allCart = useSelector(state => typeof state.shop.cart === 'string' ? JSON.parse(state.shop.cart) : state.shop.cart);
    const allTotalPrice = useSelector(state => state.shop.totalPrice);
    const loadingState = useSelector(state => state.loader.loading);

    const [ allCities, setAllCities ] = useState([]);
    const [ newRestaurants, setNewRestaurants ] = useState([]);
    const [restaurantCategories, setRestaurantCategories] = useState(productCategories);
    const [allProductCat, setAllProductCategory] = useState(null);
    const [products, setProducts] = useState([]);
    const [addClass, changeClass] = useState({ active: false });
    const [addVariationClass, changeVariationClass] = useState({ active: false });
    const [activeCategory, setActiveCategory] = useState([]);
    const [productCart, setProductCart] = useState([]);
    const [value, setValue] = useState(0);
    const [ inlineLoading, setInlineLoading ] = useState(0);
    const [ restaurantName, setRestaurantName ] = useState(null);
    const [ selectedVariableProducts, setSelectedVariableProducts] = useState([]);
    const [ quantitiesArray, setQuantitiesArray] = useState([]);
    const [ categoryActiveName, setCategoryActiveName ] = useState('Combo Deals');
    const [disableScrollEvent, setDisableScrollEvent] = useState(false);
    const [ varId, setVarId ] = useState({});
    // const [ allCart, setAllCart ] = useState([]);
    
    const mappedCities = allCities.map(city => ({value: city.id, label: city.city}));
  
    useEffect(() => {
        const cities = localStorage.getItem('setAllCities') ? JSON.parse(localStorage.getItem('setAllCities')) : [];
        setAllCities(cities);
        Cookies.remove('variable');
    }, [])

    useEffect(() => {
        if (process.browser && !disableScrollEvent) {
            let headers = document.querySelectorAll('.category-header');
            window.addEventListener("scroll", (event) => {
                Array.from(headers).forEach(header => {
                    const itemHeight = header.getBoundingClientRect().top;
                    if (itemHeight <= 189.54 && itemHeight > 100) {
                        setCategoryActiveName(header.id)
                    }
                })
            });
        }
    }, [])

    useEffect(() => {
        if (restaurantCategories.length > 0) {
            // Set the default quantities for all products
            let products = [];
            restaurantCategories.forEach(c => {
                const productsArray = c.category_products;
                
                productsArray.forEach(x => {
                    
                    products.push(x);
                });
            });

            setQuantitiesArray(products.map(p => ({productId: p.id, quantity: 1})));

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

       
        if (!restaurant) {
            dispatch(selectedRestaurant(selectRestaurant));
        }

        if (!allRestaurants.length > 0) {
            dispatch(saveRestaurants(setRestaurants));
        }

    }, []);

    useEffect(() => {
        window.$ = $;
            $(window).ready(function () {
                const $el = $("html, body");
                $el.css({'overflow-x': 'unset'});
                document.body.scrollTop = 0; // For Safari
                document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
            });
    }, []);

    useEffect(() => {
    
        if ($(window).width() > 768) {
            $(window).scroll(function (e) {
                const $el = $('#category-top');
                const isPositionFixed = ($el.css('position') === 'sticky');
                if ($(this).scrollTop() > 140 && !isPositionFixed) {
                    $el.css({'position': 'sticky', 'top': '79px'});
                }
                if ($(this).scrollTop() < 140 && isPositionFixed) {
                    $el.css({'position': 'static', 'top': '0'});
                }
            })
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
    };

    // const productDisplayHandler = (categoryId) => {
    //     let productCat = restaurantCategories.find(productCategory => productCategory.id === categoryId);
    //     setActiveCategory([]);
    //     if (productCat.id === categoryId) {
    //         setActiveCategory(activeCategory => activeCategory.concat(`active-${categoryId}`))
    //     }
    //     let products = productCat.category_products;
    //     setAllProductCategory(productCat);
    //     setProducts(products);
    // };


    const categoryListHandler = (categoryName) => {
        setDisableScrollEvent(true);
        setTimeout(() => setCategoryActiveName(categoryName), 500);
        let headers = document.getElementById(categoryName);
        const itemHeight = headers.offsetTop;
        window.scroll({
            top: itemHeight,
            left: 0,
            behaviour: 'smooth'
        });
        setTimeout(() => setDisableScrollEvent(false), 500);
    }

    const handleMenuRestaurantCItyChange = ({value: restaurantId}) => {
        dispatch(loader());
        let newRestaurants = allCities.find(city => city.id === restaurantId).restaurants;
        newRestaurants = newRestaurants.map(restaurant => ({...restaurant, value: restaurant.city_id, label: restaurant.name}));
        setRestaurantName( null )
        setNewRestaurants(newRestaurants);
        dispatch(saveRestaurants(newRestaurants));
        Cookies.set('setRestaurants', JSON.stringify(newRestaurants));
        setTimeout(() => {
            dispatch(loader());
        }, 1500);      
    }

    const handleMenuRestaurantInputChange = async value => {
        Cookies.remove('setCart');
        Cookies.set('totalPrice', 0);
        dispatch(addToCart([]));
        setProductCart([]);
        setAllProductCategory(null);
        setProducts([]);
        setActiveCategory([]);
        setRestaurantName( value );
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
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
            setTimeout(() => setCategoryActiveName('Combo Deals'), 500);
        } catch (error) {
            dispatch(loader());
            console.log(error);
        }
        Cookies.set('selectedRestaurant', JSON.stringify(value));
        setValue(value => ++value);
    };

    const handleQuantityChange = (e, prodId) => {
        // quantitySelected = e.target.value;
        const prevProdQtyIndex = quantitiesArray.findIndex(x => x.productId === prodId);
        const prevProdQty = quantitiesArray[prevProdQtyIndex];

        if (prevProdQty) {
            quantitiesArray[prevProdQtyIndex] = {productId: prodId, quantity: +e.target.value};
        } else {
            const newQuantityArray = {productId: prodId, quantity: +e.target.value};
            quantitiesArray.push(newQuantityArray);
        }
        
        setQuantitiesArray(quantitiesArray);
    };

    const addtoCartHandler = (prod) => {
        setInlineLoading(prod.id);
        dispatch(loader());
        const prevCart = [...productCart];
        const quantitySelected = quantitiesArray.find(q => q.productId === prod.id).quantity;
        /** This is an example of checking if a product is in cart and updating it */
        const prodInCartIndex = prevCart.findIndex(cart => cart.product.id === prod.id);

        const productType = prod.product_type;
        // Kindly help me check whats wrong in the variation, both for normal and increased product
        if (prodInCartIndex >= 0) {

            const prodInCart = prevCart[prodInCartIndex];

            if (productType === 'variable') {
                const productVariation = selectedVariableProducts.find(x => x.productId === prod.id);
                prevCart[prodInCartIndex] = {
                    product: prod,
                    quantity: +prodInCart.quantity + parseInt(quantitySelected),
                    price: productVariation.price,
                    salePrice: productVariation.salePrice || productVariation.price,
                    totalPrice: +prodInCart.totalPrice + ((productVariation.salePrice || productVariation.price) * parseInt(quantitySelected))
                }
            } else {
                const newTotalPrice = prod.sale_price ? +quantitySelected * parseInt(prod.sale_price) : +quantitySelected *  parseInt(prod.price);
                prevCart[prodInCartIndex] = {
                    product: prod,
                    quantity: +prodInCart.quantity + parseInt(quantitySelected),
                    price: parseInt(prod.price),
                    salePrice: prodInCart.salePrice ? +prodInCart.salePrice + parseInt(prod.sale_price) : null,
                    totalPrice: +prodInCart.totalPrice + newTotalPrice,
                }
            }

            
        } else {
            
            if (productType === 'variable') {
                const productVariation = selectedVariableProducts.find(x => x.productId === prod.id);
                productVariation.salePrice = productVariation.salePrice || null;
                const newCart = {...productVariation, quantity: quantitySelected, totalPrice: quantitySelected * (productVariation.salePrice || productVariation.price)};
                prevCart.push(newCart);
            } else {
                prevCart.push({
                    product: prod,
                    quantity: parseInt(quantitySelected),
                    price: parseInt(prod.price),
                    salePrice: parseInt(prod.sale_price),
                    totalPrice: prod.sale_price ? quantitySelected * parseInt(prod.sale_price) : quantitySelected *  parseInt(prod.price),
                });
            }
            
        }
        setProductCart(prevCart);
        dispatch(addToCart(prevCart));
        dispatch(setTotalPrice());
        Cookies.set('setCart', JSON.stringify(prevCart));
        setValue(value => ++value);
        // dispatch(setTotalPrice()) ? Cookies.set('totalPrice', JSON.stringify(allTotalPrice)) : null;
        setTimeout(() => {
            dispatch(loader());
        }, 1500);
        setTimeout(() => {
            setInlineLoading(0);
        }, 1500);
        setTimeout(() => {
            NotificationManager.success('Added successfully', '', 3000);
        }, 1500);
    };

    const deleteProductCartHandler = (index, id) => {
        console.log(selectedVariableProducts, 'varProd'); 
        var i = selectedVariableProducts.findIndex(selVar => selVar.productId === id);
        selectedVariableProducts.splice(i, 1);
        console.log(i, 'theIndex');
        allCart.splice(index, 1);
        setProductCart(allCart);
        dispatch(addToCart(allCart));
        dispatch(setTotalPrice());
        Cookies.set('setCart', JSON.stringify(allCart));
        setValue(value => ++value);
    };

    let cartDisplay = <p>Your cart is currently empty</p>;

    if (allCart.length > 0) {
        cartDisplay =  <>
        {allCart.map((cart, index) => {
            return <>
                <div key={cart.product.id} className="product-list">
                    {/* <img className="img-fluid" src={cart.product.image_url} alt="" />
                    <p>{cart.product.product}</p>
                    <input onChange={(e) => updateQuantityChangeHandle(e, index)} type='number' defaultValue={cart.quantity} /> */}
                    {/* <p>{cart.quantity}</p> */}
                    {/* {cart.salePrice ? <p className="bold">{'₦'+cart.salePrice}</p> : <p className="bold">{'₦'+cart.price}</p>} */}
                    {/* <p className="bold">{'₦'+cart.totalPrice}</p>
                    <button onClick={() => deleteProductCartHandler(index)}>X</button> */}
                    <div className="row text-md-left text-center">
                        <div className="col-md-3">
                            <img className="img-fluid" src={cart.product.image_url} alt="" />
                        </div>
                        <div className="col-md-6">
                            <div className="align-items-center justify-content-around flex-wrap">
                                <p>{cart.product.product}</p>
                            </div>
                            <p className="bold">{'₦'+cart.totalPrice}</p>
                            <input onChange={(e) => updateQuantityChangeHandle(e, index)} type='number' defaultValue={cart.quantity} min="1" />
                        </div>
                        <div className="col-md-2">
                            <button onClick={() => deleteProductCartHandler(index, cart.product.id)}>X</button>
                        </div>
                    </div>
                </div>
            </>
        })} 
        </>
    };

    const updateQuantityChangeHandle = (e, cartIndex) => {
        const price = allCart[cartIndex].salePrice || allCart[cartIndex].price;
        allCart[cartIndex].quantity = +e.target.value;
        allCart[cartIndex].totalPrice = +e.target.value * price;
        setProductCart(allCart);
        dispatch(addToCart(allCart));
        dispatch(setTotalPrice());
        Cookies.set('setCart', JSON.stringify(allCart));
        setValue(value => ++value);
    }

    const handleVariationChange = (value, prod) =>  {
        // remove if this gives problem
        // selectedVariableProducts.pop();
        // console.log(selectedVariableProducts, 'array');
        changeVariationClass({
            active: true
        });
        const tempCart = {
            productId: prod.id,
            product: prod,
            quantity: null,
            price:  parseInt(value.value),
            salePrice: parseInt(value.sale_price),
            totalPrice: null,
            product_variation: value.name
        }
        setVarId(tempCart);
        selectedVariableProducts.push(tempCart);
        setSelectedVariableProducts(selectedVariableProducts);
    } 


    const gotoCartHandler = () => {
        Router.push('/cart');
    };

    
        

    return (
        <>
            <Layout>
                <Head>
                    <title>Menu | Kilimanjaro</title>
                </Head>
                <section id="category-top" className={`select-restaurant ${!restaurantCategories.length > 0 ? 'active-select-restaurant' : null}`}>
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <div className="d-flex flex-wrap align-items-center">
                                    <p>Ordering from</p>
                                    <form className="select-state mb-md-0 mb-2">
                                        <Select onChange={handleMenuRestaurantCItyChange} className="select-tool" options={mappedCities} placeholder='Select a city' instanceId="menuCities" />
                                    </form>
                                    <form className="select-state">
                                        <Select value={restaurantName} onChange={handleMenuRestaurantInputChange} className={newRestaurants.length > 0 ? "select-tool" : "select-tool select-disabled"} options={allRestaurants} placeholder='Select a restaurant' instanceId="menuCategories" />
                                    </form>
                                    {loadingState && inlineLoading === 0 ? <form className="select-state">
                                        <div className="inline-loading-css-menu-page"><InlineLoading /></div>
                                    </form> : null}
                                </div>
                                <ul className="product-cat">
                                    {restaurantCategories.map((productCategory) => {
                                        return <a onClick={() => categoryListHandler(productCategory.category)} key={productCategory.id}><li className={categoryActiveName === productCategory.category ? 'product-cat-list active' : 'product-cat-list'}>{productCategory.category}</li></a>
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
                                    {restaurantCategories.map((restaurantCategory) => {
                                        return <>
                                            <h4 id={restaurantCategory.category} className="category-header">{restaurantCategory.category}</h4>
                                            {restaurantCategory.category_products.map((prod) => {
                                                let variations = [];
                                                let variationName = null;
                                                let variablePrice = null;
                                                if (prod.product_type === 'variable' && prod.product_variations.length > 0) {
                                                    variations = prod.product_variations[0].variations;
                                                    variationName = prod.product_variations[0].variable_name;
                                                    variations = variations ? JSON.parse(variations) : [];
                                                    variations = variations.map(v => {
                                                        variablePrice = v.sale_price || v.price;
                                                        return { ...v, value: variablePrice , label: v.name + " — " + "₦" + variablePrice }
                                                    });
                                                };

                                                const newVarBtn = addVariationClass.active && varId.productId === prod.id ? 'btn' : 'btn disabled';

                                                let productPrices = prod.sale_price ? <p className="amount"><s>{`₦${prod.price}`}</s></p> : <p className="amount">{`₦${prod.price}`}</p>
                                                let productSalePrice = prod.sale_price === null ? null : <p className="amount sale">{'₦' + prod.sale_price}</p>
                                                let btn = <button onClick={() => addtoCartHandler(prod)} className='btn'>Add to cart</button>;
                                                if (prod.product_type === 'variable') {
                                                    productPrices = null;
                                                    productSalePrice = null;
                                                    btn = <button onClick={() => addtoCartHandler(prod, variations)} className={newVarBtn}>Add to cart</button>;
                                                }

                                                return <>
                                                    <div key={prod.id} className="single-product">
                                                        <div className="row">
                                                            <div className="col-md-4 text-center text-sm-left mb-5 mb-sm-0">
                                                                <img className="img-fluid" src={prod.image_url} alt="" />
                                                            </div>
                                                            <div className="col-md-8 pl-sm-0">
                                                                <div className="d-flex align-items-center justify-content-between flex-wrap mb-3">
                                                                    <p className="product-name">{prod.product}</p>
                                                                    <div className="d-flex">
                                                                        <p className="product-qty">Quantity</p>
                                                                        <input defaultValue={1} onChange={(e) => handleQuantityChange(e, prod.id)} type='number' min="1" />
                                                                    </div>
                                                                </div>
                                                                <p className="product-description">{prod.short_description}</p>
                                                                
                                                                {
                                                                    prod.product_type === 'variable' &&
                                                                    <>
                                                                        <form className="select-state mt-4">
                                                                            <Select onChange={(e) => handleVariationChange(e, prod)} className="select-tool w-100 variation" options={variations} placeholder={`Choose a ${variationName}`} instanceId={`productVariations-${prod.id}`} />
                                                                        </form>
                                                                        <div className="d-flex align-items-center justify-content-between flex-wrap mt-4">
                                                                            {loadingState && inlineLoading === prod.id ? <InlineLoading /> : btn}
                                                                            <div>
                                                                                {productPrices}
                                                                                {productSalePrice}
                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                }
                                                                {/* {
                                                                    prod.product_type === 'variable' &&
                                                                    <form onSubmit={handleSubmit(sub)} className="select-state mt-4">
                                                                        <Select onChange={(e) => handleVariationChange(e, prod)} className="select-tool w-100" options={variations} placeholder={`Choose a ${variationName}`} instanceId={`productVariations-${prod.id}`} />
                                                                        <div className="d-flex align-items-center justify-content-between flex-wrap mt-4">
                                                                            {loadingState && inlineLoading === prod.id ? <InlineLoading /> : btn}
                                                                            <div>
                                                                                {productPrices}
                                                                                {productSalePrice}
                                                                            </div>
                                                                        </div>
                                                                    </form>
                                                                } */}
                                                                {
                                                                    prod.product_type === 'simple' &&
                                                                    <div className="d-flex align-items-center justify-content-between flex-wrap mt-4">
                                                                        {loadingState && inlineLoading === prod.id ? <InlineLoading /> : btn}
                                                                        <div>
                                                                            {productPrices}
                                                                            {productSalePrice}
                                                                        </div>
                                                                    </div>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            })}
                                        </>
                                    })}

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
                        <div onClick={toggleActiveClass} className="cart-container">
                            <div className="cart-icon-container">
                                <button> <img src="/images/icon/cart-icon.svg" alt="" /></button>
                                <p className="product-count">{allCart.length}</p>
                            </div>
                            <p className="cart-text">Cart</p>
                        </div>
                        <div className="cart-product-list">
                            <div className={allCart.length > 2 ? "cart-listing-container" :  "cart-listing-container cart-listing-height"}>
                                {cartDisplay}
                            </div>
                            <div className="cart-button-actions d-flex align-items-center justify-content-between flex-wrap">
                                <div className="d-flex">
                                    <label className="contain">Save Basket
                                        <input type="checkbox" key={'save-basket'} />
                                        <span className="checkmark"></span>
                                    </label>
                                </div>
                                <div>
                                    <button className='btn btn-grey mr-4' onClick={() => Router.push('/cart')}>View/Edit Cart</button>
                                    <button className={allTotalPrice >= 1000 ?  'btn' : 'btn disabled'} onClick={() => Router.push('/checkout')}>Proceed to Checkout</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div  onClick={gotoCartHandler} className='cart cart-mobile-view'>
                        <div className="cart-container">
                            <div className="cart-icon-container">
                                <button> <img src="/images/icon/cart-icon.svg" alt="" /></button>
                                <p className="product-count">{allCart.length}</p>
                            </div>
                            <p className="cart-text">Cart</p>
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
        // if (!selRestaurant) {
        //     Router.push("/");
        //     return;
        // }
    } else {
        selRestaurant = JSON.parse(req.cookies.selectedRestaurant);
        // if (!selRestaurant) {
        //     res.redirect('/');
        //     return; 
        // } else {
        //     selRestaurant = JSON.parse(req.cookies.selectedRestaurant);
        // }
    }

    // if (process.browser) {
    //     selRestaurant = JSON.parse(Cookies.get('selectedRestaurant'));
       
    // } else {

    //     let sel = {};
    //     if (selRestaurant === null) {
    //     return sel = {
    //         selRestaurant: null,
    //         selRes: false
    //     }
    // }
    //     selRestaurant = JSON.parse(req.cookies.selectedRestaurant);
    // }


    let restaurantId = selRestaurant.id;

    try {
        const { data: { data } } = await axiosInstance.get(`product-categories?restaurant_id=${restaurantId}`);
        const productCategories = data.filter(cat => cat.category_products.length > 0);
        return { productCategories};
    } catch (error) {
        console.log(error)
        return {productCategories: null} ;
    }
}

export default Menu;