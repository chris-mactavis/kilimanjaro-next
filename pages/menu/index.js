import Head from 'next/head';
import { useState, useEffect } from 'react';
import Select from 'react-select';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { NotificationManager } from 'react-notifications';
import debounce from 'lodash.debounce';

// import { useForm } from "react-hook-form";



import Layout from '../../components/Layout';
import { selectedRestaurant, saveRestaurants, addToCart, setTotalPrice, updateVariablePrice  } from '../../store/actions/shop';
import { couponUpdated, productUpdated } from '../../store/actions/liveEvents';
import axiosInstance from '../../config/axios';
import { loader } from '../../store/actions/loader';
import InlineLoading from '../../components/UI/inlineLoader';




const Menu = ({ productCategories, couponData, time, restaurantId }) => {

    
    //  All Store
    const dispatch = useDispatch();
    const restaurant = useSelector(state => state.shop.selectedRestaurant);
    const allRestaurants = useSelector(state => state.shop.allRestaurants);
    const allCart = useSelector(state => typeof state.shop.cart === 'string' ? JSON.parse(state.shop.cart) : state.shop.cart);
    const allTotalPrice = useSelector(state => state.shop.totalPrice);
    const loadingState = useSelector(state => state.loader.loading);
    const productIsUpdated = useSelector(state => state.liveEvent.productUpdated);
    const couponIsUpdated = useSelector(state => state.liveEvent.couponUpdated);

    const [ allCities, setAllCities ] = useState([]);
    const [ newRestaurants, setNewRestaurants ] = useState([]);
    const [ restaurantCategories, setRestaurantCategories ] = useState(productCategories);
    const [ allProductCat, setAllProductCategory ] = useState(null);
    const [ products, setProducts ] = useState([]);
    const [addClass, changeClass ] = useState({ active: false });
    const [addVariationClass, changeVariationClass ] = useState({ active: false });
    const [ activeCategory, setActiveCategory ] = useState([]);
    const [productCart, setProductCart ] = useState([]);
    const [ value, setValue ] = useState(0);
    const [ inlineLoading, setInlineLoading ] = useState(0);
    const [ restaurantName, setRestaurantName ] = useState(null);
    const [ selectedCityName, setSelectedCityName ] = useState(null);
    const [ selectedVariableProducts, setSelectedVariableProducts ] = useState([]);
    const [ quantitiesArray, setQuantitiesArray ] = useState([]);
    const [ categoryActiveName, setCategoryActiveName ] = useState('');
    const [ disableScrollEvent, setDisableScrollEvent ] = useState(false);
    const [ varId, setVarId ] = useState({});
    const [ closedHour, setClosedHour ] = useState('');
    const [ minOrderAmount, setMinOrderAmount ] = useState(null);
    const [ resId, setResId ] = useState(restaurantId);
    const [ couponListData, setCouponListData ] = useState(couponData);

    const [ searchvalue, setSearchValue ] = useState('');
	const [ dbValue, saveToDb ] = useState([]);
    const [ showSearchBar, setShowSearchBar ] = useState(false);
    const [ allProductList, setAllProductList ] = useState([]);

    // console.log({searchvalue});
    // console.log({allProductList});


    const mappedCities = allCities.map(city => ({value: city.id, label: city.city}));

    // Search product list 
    const handleSearch = async event => {
		const { value: nextValue } = event.target;
		setSearchValue(nextValue);
        console.log({nextValue});
        try {
            // // highlight-starts
            if (nextValue.length > 2) {
                // const debouncedSave = debounce( async () => {
                    // const {data: {data: response}} = await axiosInstance.get(`products/search?product=${nextValue}&restaurant_id=${resId}`);
                    const response = allProductList.filter(x => x.product.toLowerCase().includes(nextValue.toLowerCase()));
                    console.log({response});
                    if (nextValue.length > 2) {
                        setShowSearchBar(true);
                        saveToDb(response);
                        setValue(value => ++value);
                    } else {
                        setShowSearchBar(false);
                        saveToDb([]);
                        setValue(value => ++value);
                    }
                // }, 1000);
                // debouncedSave();
            } else {
                setShowSearchBar(false);
                saveToDb([]);
                setValue(value => ++value);
            }
            // highlight-ends
        } catch(e) {
            console.log(e.response);
            setShowSearchBar(false);
            saveToDb([]);
            setValue(value => ++value);
        }
	};

    useEffect(() => {
        const prodList = [];
        restaurantCategories.forEach(restCat => {
            restCat.category_products.forEach(prod => prodList.push(prod));
        });
        setAllProductList(prodList);
    }, []); 

    useEffect(() => {
        setCategoryActiveName(restaurantCategories[0].category);
    }, []);

    useEffect(() => {
        const selCityName = JSON.parse(Cookies.get('cityFocused'));
        const selResName = JSON.parse(Cookies.get('resFocused'));
        setSelectedCityName(selCityName);
        setRestaurantName(selResName);
    }, []);

    useEffect(() => {
        const fetchProductCategories = async () => {
            try {
                dispatch(loader());
                setInlineLoading(1);
                const { data: { data } } = await axiosInstance.get(`product-categories?restaurant_id=${resId}`);
                setRestaurantCategories(data);
                dispatch(loader());
                setInlineLoading(0);
                dispatch(productUpdated(false));
                setProductCart([]);
                dispatch(addToCart([]));
                dispatch(setTotalPrice());
                if (Cookies.set('setCart')) {
                    Cookies.remove('setCart');
                }
            } catch (error) {
                dispatch(loader());
                setInlineLoading(0);
                console.log(error.response.data.message);
            }
        } 

        if (productIsUpdated) {
            fetchProductCategories();
        }

    }, [productIsUpdated]);

    useEffect(() => {
        const fetchCoupon = async () => {
            try {
                dispatch(loader());
                setInlineLoading(1);
                const { data: { data } } = await axiosInstance.get(`product-coupons?restaurant_id=${resId}`);
                setCouponListData(data); 
                dispatch(loader());
                setInlineLoading(0);
                dispatch(couponUpdated(false));
                setProductCart([]);
                dispatch(addToCart([]));
                dispatch(setTotalPrice());
                if (Cookies.set('setCart')) {
                    Cookies.remove('setCart');
                }
            } catch(error) {
                dispatch(loader());
                setInlineLoading(0);
                console.log(error.response.data.message);
            }
        };

        if (couponIsUpdated) {
            fetchCoupon();
        }

    }, [couponIsUpdated]);

    useEffect(() => {
        const fetchMinPrice = async () => {
            try {
                const {data: {data : res}} = await axiosInstance.get('settings/get-min-order-amount');
                setMinOrderAmount(+res.min_order_amount);
            } catch (e) {
                console.log(e);
            }
        }
        fetchMinPrice();
    }, []);

    useEffect(() => {
        const currentTime = new Date().getHours();
        const openingHour = +time.opening_time;
        const closingHour = +time.closing_time;
    
        if (currentTime >= openingHour && currentTime < closingHour) { 
            Cookies.set('closed', false);
        } else {
          Cookies.set('closed', true);
        }

        const closedTime = Cookies.get('closed'); 
        setClosedHour(closedTime); 
    
      }, [time, setClosedHour]); 
  
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

        (function($){
            var elements = $(".category-single");
        
            for (var i = 0, len = elements.length; i < len; i++) {
                elements[i].addEventListener("click", function () {
                    var firstEl = $(this).find("a")[0];
                    firstEl.addEventListener("click", function (e) { e.preventDefault() });
                    $(this).find(".subcats").slideToggle();

                });
            }
        })(jQuery);
      
    
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
                const $el2 = $('.button-float');
                const isPositionFixed = ($el.css('position') === 'sticky');
                if ($(this).scrollTop() > 140 && !isPositionFixed) {
                    $el.css({'position': 'sticky', 'top': '79px'});
                    $el2.css({'display': 'block'});
                }
                if ($(this).scrollTop() < 140 && isPositionFixed) {
                    $el.css({'position': 'static', 'top': '0'});
                    $el2.css({'display': 'none'});
                }
            })
        }
        $(window).scroll(function (e) {
            const $el2 = $('.button-float');
            if ($(this).scrollTop() > 140) {
                $el2.css({'display': 'block'});
            }
            if ($(this).scrollTop() < 140) {
                $el2.css({'display': 'none'});
            }
        })
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

    const handleMenuRestaurantCItyChange = (val) => {
        dispatch(loader());
        let newRestaurants = allCities.find(city => city.id === val.value).restaurants;
        newRestaurants = newRestaurants.map(restaurant => ({...restaurant, value: restaurant.city_id, label: restaurant.name}));
        setRestaurantName( null )
        setNewRestaurants(newRestaurants);
        setSelectedCityName(val);
        dispatch(saveRestaurants(newRestaurants));
        Cookies.set('setRestaurants', JSON.stringify(newRestaurants));
        Cookies.set('cityFocused', JSON.stringify(val));
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
            // console.log({productCategories});
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
            setTimeout(() => setCategoryActiveName(productCategories[0].category), 500);
            setResId(value.id);
        } catch (error) {
            dispatch(loader());
            console.log(error);
        }
        const selectedRes = {
            label: value.label,
            value: value.id
        }
        Cookies.set('resFocused', JSON.stringify(selectedRes));
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
                const productVariation = selectedVariableProducts.find(x => x.productId === prod.id  && x.product_variation == varId.product_variation);
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
        // dispatch(setTotalPrice()) ? Cookies.set('totalPrice', JSON.stringify(allTotalPrice)) : null;
        setTimeout(() => {
            dispatch(loader());
        }, 1500);
        setTimeout(() => {
            setInlineLoading(0);
        }, 1500);
        setTimeout(() => {
            NotificationManager.success('Added to cart successfully', '', 3000);
        }, 1500);
        setValue(value => ++value);
    };

    const deleteProductCartHandler = (index, id) => {
        var i = selectedVariableProducts.findIndex(selVar => selVar.productId === id);
        selectedVariableProducts.splice(i, 1);
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
            let productName = "";
            if (cart.product_variation) {
                productName =  <p>{cart.product.product} ({cart.product_variation})</p>
            } else {
                productName =  <p>{cart.product.product}</p>
            }
            return <>
                <div key={`Prod-cart${cart.product.id}`} className="product-list">
                    <div className="row text-md-left text-center">
                        <div className="col-md-3">
                            <img className="img-fluid" src={cart.product.image_url} alt="" />
                        </div>
                        <div className="col-md-6">
                            <div className="align-items-center justify-content-around flex-wrap">
                               {productName}
                            </div>
                            <p className="bold">{'₦'+cart.totalPrice}</p> 
                            <input onChange={(e) => updateQuantityChangeHandle(e, index)} type='number' value={cart.quantity} defaultValue={cart.quantity}   min={'1'} />
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

    const addCouponToCart = async (value, resProduct) => {
      
        const prevCart = [...productCart];

        let productCoupon = null;
        resProduct.map((resProd) => {
            return productCoupon = {...resProd, price: value}
        });


        const prodInCartIndex = prevCart.findIndex(cart => cart.product.id === productCoupon.id);
        if (prodInCartIndex >= 0) {
            const prodInCart = prevCart[prodInCartIndex];
            const newTotalPrice = +prodInCart.quantity * +prodInCart.totalPrice;
            const newQuantity = prodInCart.quantity;
            prevCart[prodInCartIndex] = {
                product: productCoupon,
                quantity: newQuantity + 1,
                price: value,
                salePrice: null,
                totalPrice: +prodInCart.totalPrice + newTotalPrice
            }
        } else {
            prevCart.push({
                product: productCoupon,
                quantity: 1,
                price: value,
                salePrice: null,
                totalPrice: parseInt(value)
            });
        }
        
        setProductCart(prevCart);
        dispatch(addToCart(prevCart));
        dispatch(setTotalPrice());
        Cookies.set('setCart', JSON.stringify(prevCart));
        setTimeout(() => {
            NotificationManager.success('Added to cart successfully', '', 3000);
        }, 500);

        setValue(value => ++value);
    };

    const gotoCheckoutHandler = () => {
        if (closedHour == 'true') {
            NotificationManager.error('Sorry, You can only order between 8AM and 5PM', '', 6000);  
        } else if (closedHour == 'false') {
            Router.push('/checkout');
        }
    };

    const scrollTopHandler = () => {
        window.$ = $;
        $(window).ready(function () {
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        });
    };

    const scrollToProduct = (prod) => {
        let prodTab = document.getElementById(prod.product);
        const itemHeight = prodTab.offsetTop;
        window.scroll({
            top: itemHeight,
            left: 0,
            behaviour: 'smooth'
        });
        setShowSearchBar(false);
    }
  

    return (
        <>
            <Layout>
                <Head>
                    <title>Menu | Kilimanjaro Restaurant</title>
                </Head>
                {(loadingState && inlineLoading === 1) && <section className="topLoader">
                    <div className="topLoader-container">
                        {(loadingState && inlineLoading === 1) && <InlineLoading /> }
                    </div>
                </section>}
                <section id="category-top" className={`select-restaurant ${!restaurantCategories.length > 0 ? 'active-select-restaurant' : null}`}>
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <div className="d-flex flex-wrap align-items-center">
                                    <p>Change Location</p>
                                    <form className="select-state mb-md-0 mb-2">
                                        <Select value={selectedCityName} onChange={handleMenuRestaurantCItyChange} className="select-tool" options={mappedCities} placeholder='Select a city' instanceId="menuCities" />
                                    </form>
                                    <form className="select-state mb-md-0 mb-2">
                                        {/* <Select value={restaurantName} onChange={handleMenuRestaurantInputChange} className={newRestaurants.length > 0 ? "select-tool" : "select-tool select-disabled-2"} options={allRestaurants} placeholder='Select a restaurant' instanceId="menuCategories" /> */}
                                        <Select value={restaurantName} onChange={handleMenuRestaurantInputChange} className="select-tool" options={allRestaurants} placeholder='Select a restaurant' instanceId="menuCategories" />
                                    </form>
                                    <form className="select-state mr-0">
                                        <div className="search-container">
                                            <input onChange={handleSearch} type="text" placeholder="Search for a meal..."/>
                                            <ul className={showSearchBar ? "results active" : "results"}>
                                               {dbValue.map(serachRes => {
                                                   return <li onClick={() => scrollToProduct(serachRes)} key={`SEARCH-RESULT${serachRes.id}`} className="result">{serachRes.product}</li>
                                               })} 
                                            </ul>
                                        </div>
                                        {/* <Select value={restaurantName} onChange={handleMenuRestaurantInputChange} className="select-tool" options={allRestaurants} placeholder='Select a restaurant' instanceId="menuCategories" /> */}
                                    </form>
                                    {loadingState && inlineLoading === 0 ? <form className="select-state w-100 mt-1">
                                        <div className="inline-loading-css-menu-page"><InlineLoading /></div>
                                    </form> : null}
                                </div>
                                <ul className="product-cat">
                                    {restaurantCategories.map((productCategory) => {
                                        return <a onClick={() => categoryListHandler(productCategory.category)} key={`Prod-Category${productCategory.id}`}><li className={categoryActiveName === productCategory.category ? 'product-cat-list active' : 'product-cat-list'}>{productCategory.category}</li></a>
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
                                            <div key={`Res-Category${restaurantCategory.id}`}>
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
                                                            variablePrice =  v.sale_price || v.price;
                                                            return { ...v, value: variablePrice , label: v.name + " — " + "₦" + new Intl.NumberFormat().format(variablePrice) }
                                                        });
                                                    }; 

                                                    const newVarBtn = addVariationClass.active && varId.productId === prod.id ? 'btn' : 'btn disabled';

                                                    let productPrices = prod.sale_price ? <p className="amount"><s>{`₦${new Intl.NumberFormat().format(prod.price)}`}</s></p> : <p className="amount">{`₦${new Intl.NumberFormat().format(prod.price)}`}</p>
                                                    let productSalePrice = prod.sale_price === null ? null : <p className="amount sale">{'₦' +  new Intl.NumberFormat().format(prod.sale_price)}</p>
                                                    // let btn = <button onClick={() => addtoCartHandler(prod)} className='btn'>Add to cart</button>;
                                                    let btn = <button onClick={() => addtoCartHandler(prod)} className="btn"><span className="text">Add to cart</span></button>;
                                                    if (prod.product_type === 'variable') {
                                                        productPrices = null;
                                                        productSalePrice = null;
                                                        // btn = <button onClick={() => addtoCartHandler(prod, variations)} className={newVarBtn}>Add to cart</button>;
                                                        btn = <button onClick={() => addtoCartHandler(prod, variations)} className={newVarBtn}><span className="text">Add to cart</span></button>;
                                                    }

                                                    return <>
                                                        <div id={prod.product} key={`Product-Id${prod.id}`} className="single-product">
                                                            <div className="row">
                                                                <div className="col-md-4 text-center text-sm-left mb-5 mb-sm-0">
                                                                    <div>
                                                                        <img className="img-fluid" src={prod.image_url} alt={prod.product} />
                                                                    </div>
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
                                            </div>
                                        </>
                                    })}

                                </div>}
                            <div className="col-md-4">
                                <div className="coupon-on-menu">
                                    { couponListData.map(prodCoupon => {
                                        return <a key={`Coupon-Id${prodCoupon.id}`} onClick={() => addCouponToCart(prodCoupon.value, prodCoupon.restaurant_products)}>
                                            <img className="img-fluid" src={prodCoupon.image_url} alt="" />
                                        </a>
                                    }) }
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
                            {!allCart.length > 0 || allTotalPrice < minOrderAmount && <p>A minimum order of ₦{minOrderAmount} is required before checking out. Current cart's total is: ₦{allTotalPrice === null ? '0' : allTotalPrice }</p>}
                                {cartDisplay}
                            </div>
                            <div className="cart-button-actions d-flex align-items-center justify-content-between flex-wrap">
                                <div className="d-flex align-items-center flex-wrap">
                                    <button className="btn mr-4 mb-xl-0 mb-3"  onClick={() => Router.push('/cart')}><span className="text">View/Edit Cart</span></button>
                                    <button className={allTotalPrice >= minOrderAmount ?  'btn mb-xl-0 mb-3' : 'btn disabled mb-xl-0 mb-3'} onClick={gotoCheckoutHandler}><span className="text">Proceed to Checkout</span></button>
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
                <div onClick={scrollTopHandler} className="button-float">
                    <i className="fa fa-chevron-up float-arrow"></i>
                    {/* <img src="/images/icon/arrow-up.svg" alt="" className="float-arrow"/>    */}
                </div>
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
        const { data: { data: couponData } } = await axiosInstance.get(`product-coupons?restaurant_id=${restaurantId}`);
        const { data: { data: time } } = await axiosInstance.get(`settings/get-order-times`);
        const productCategories = data.filter(cat => cat.category_products.length > 0);

        return {productCategories, couponData, time, restaurantId};
    } catch (error) {
        console.log(error)
        return {productCategories: null} ;
    }
}

export default Menu;
