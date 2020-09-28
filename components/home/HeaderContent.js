import Select from 'react-select';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { loader } from '../../store/actions/loader';


const HeaderContent = ({cities}) => {
    const [ restaurants, setRestaurants ] = useState([]);
    const [ restaurantName, setRestaurantName ] = useState(null);
   
    const mappedCities = cities.map(city => ({value: city.id, label: city.city}));

    const dispatch = useDispatch();

    const handleCityInputChange = ({value: restaurantId}) => {
        dispatch(loader());
        setTimeout(() => {
            dispatch(loader());
        }, 1500)
        setRestaurantName( null );
        let restaurants = cities.find(city => city.id === restaurantId).restaurants;
        restaurants = restaurants.map(restaurant => ({...restaurant, value: restaurant.city_id, label: restaurant.name}));
        setRestaurants( restaurants );
    };

    const handleRestaurantInputChange = (value) => {
        setRestaurantName( value );
    }


    return (
      <>
        <section className="header-content">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 mx-auto">
                        <div className="headtext-container">
                            <h1>
                                Enjoy tasty meals, <br/>
                                from wherever you are.
                            </h1>
                            <p>Ordering from:</p>
                            <form className="select-state">
                                <Select options={mappedCities} className="select-tool" placeholder='Select a city' instanceId="cityId" onChange={handleCityInputChange} />
                                <Select value={restaurantName} options={restaurants.length > 0 ? restaurants : [] } className={restaurants.length > 0 ? 'select-tool' : 'select-tool select-disabled'} placeholder='Select Restaurant' instanceId="restaurantId" onChange={handleRestaurantInputChange} />
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