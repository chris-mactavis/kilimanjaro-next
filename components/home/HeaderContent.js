import Select from 'react-select';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import Cookies from 'js-cookie';

import { loader } from '../../store/actions/loader';
import InlineLoading from '../../components/UI/inlineLoader';
import { saveRestaurants, selectedRestaurant } from '../../store/actions/shop';


const HeaderContent = ({cities}) => {
    const [ restaurants, setRestaurants ] = useState([]);
    const [ restaurantName, setRestaurantName ] = useState(null);
    const [ inlineLoading, setInlineLoading ] = useState(0);
   
    const mappedCities = cities.map(city => ({value: city.id, label: city.city}));

    const dispatch = useDispatch();
    const loadingState = useSelector(state => state.loader.loading);

    const handleCityInputChange = ({value: restaurantId}) => {
        dispatch(loader());
        setInlineLoading(1);
        setTimeout(() => {
            dispatch(loader());
            setInlineLoading(0);
        }, 1000)
        setRestaurantName( null );
        let restaurants = cities.find(city => city.id === restaurantId).restaurants;
        restaurants = restaurants.map(restaurant => ({...restaurant, value: restaurant.city_id, label: restaurant.name}));
        setRestaurants(restaurants);
        dispatch(saveRestaurants(restaurants));
        Cookies.set('setRestaurants', JSON.stringify(restaurants))
    };

    const handleRestaurantInputChange = (value) => {
        dispatch(loader());
        setInlineLoading(1);
        Cookies.remove('totalPrice');
        Cookies.remove('setCart');
        Cookies.remove('orderItem');
        localStorage.removeItem('checkoutToLogin');
        setRestaurantName( value );
        dispatch(selectedRestaurant(value));
        Cookies.set('selectedRestaurant', JSON.stringify(value));
        Router.push('/menu');
        setTimeout(() => {
            dispatch(loader());
            setInlineLoading(0);
        }, 1500)
    }
 

    return (
      <>
        <section className="header-content">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 mx-auto">
                        <div className="headtext-container">
                            
                            <div className="title">
                                <span className="block"></span>
                                <h1>Enjoy tasty meals,</h1>
                            </div>

                            <div className="role">
                                <div className="block"></div>
                                <h1>from wherever you are<span></span></h1>
                            </div>


                            {/* <h1>
                                Enjoy tasty meals, <br/>
                                from wherever you are.
                            </h1> */}

                            <p>Ordering from:</p>
                            <form className="select-state">
                                <Select options={mappedCities} className="select-tool" placeholder='Select a city' instanceId="cityId" onChange={handleCityInputChange} />
                                <Select value={restaurantName} options={restaurants.length > 0 ? restaurants : [] } className={restaurants.length > 0 ? 'select-tool' : 'select-tool select-disabled'} placeholder='Select Restaurant' instanceId="restaurantId" onChange={handleRestaurantInputChange} />
                                { (loadingState && inlineLoading === 1 ) && <div className="inline-loading-css"><InlineLoading /></div>  }
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <img className="left-banner-image" src="/images/left-banner-image.svg" alt=""/>
            <img className="right-banner-image" src="/images/right-banner-image.svg" alt=""/>
        </section>
      </>  
    );
};

export default HeaderContent;