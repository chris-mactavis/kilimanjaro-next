import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

import { selectedRestaurant } from '../../../store/actions/shop';


const OrderingStepsMobile = ({activeTabs}) => {

    const dispatch = useDispatch();

    const [restaurant, setRestaurant] = useState({});

    useEffect(() => {
        const selectRestaurant = Cookies.get('selectedRestaurant') ? JSON.parse(Cookies.get('selectedRestaurant')) : {};
        dispatch(selectedRestaurant(selectRestaurant));
        setRestaurant(selectRestaurant);
    }, []);

    return (
        <>
            <div className="row d-sm-none d-block">
                <div className="col-md-12">
                <h1>{restaurant.name}</h1>
                </div>
                <div className="col-md-7 mx-auto">
                    {/* <div className="view-number d-flex align-items-center justify-content-between mb-5">
                        <div className="number-container text-center">
                            <p className={`number ${activeTabs.includes(1) ? "active-number" : null}`}>1</p>
                            <p className="number-text">Shopping Cart</p>
                        </div>
                        <div className="number-container text-center mid-line">
                            <div className="align-items-center">
                                <p className={`number ${activeTabs.includes(2) ? "active-number" : null}`}>2</p>
                            </div>
                            <p className="number-text">Checkout</p>
                        </div>
                        <div className="number-container text-center">
                            <p className={`number ${activeTabs.includes(3) ? "active-number" : null}`}>3</p>
                            <p className="number-text">Order Complete</p>
                        </div>
                    </div> */}
                    <div className="text-center d-sm-none d-block mb-5">
                        { activeTabs.includes(1) &&
                            <div className="number-container mid-line text-center">
                                <p className={`number ${activeTabs.includes(1) ? "active-number" : null}`}>1</p>
                                <p className="number-text">Shopping Cart</p>
                            </div>
                        }
                        { activeTabs.includes(2) &&
                            <div className="number-container text-center mid-line">
                                <div className="align-items-center">
                                    <p className={`number ${activeTabs.includes(2) ? "active-number" : null}`}>2</p>
                                </div>
                                <p className="number-text">Checkout</p>
                            </div>
                        }
                        { activeTabs.includes(3) &&
                            <div className="number-container text-center mid-line">
                                <p className={`number ${activeTabs.includes(3) ? "active-number" : null}`}>3</p>
                                <p className="number-text">Order Complete</p>
                            </div>
                        }
                    </div>
                </div>
            </div>

        </>
    );
}

export default OrderingStepsMobile;