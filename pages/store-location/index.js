import Layout from '../../components/Layout';
import Head from 'next/head';
import { useState } from 'react';

import ContactUs from '../../components/contactUs/contactUs';
import axiosInstance from '../../config/axios';

const StoreLocation = ({storeLocations}) => {
    const [ restaurants, setRestaurants ] = useState([]);

    const viewOuletHandler = (id) => {
        let StateRestaurants = storeLocations.find(res => res.id === id).restaurants;
        setRestaurants(StateRestaurants);
    }

    return (
        <>
            <Layout contactSection>
                <Head>
                    <title>Store Location | Kilimanjaro</title>
                </Head>

                <header className="store-header"></header>
                <section className="store-location">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 text-center">
                                <h4>You can find us here</h4>
                            </div>
                           {storeLocations.map((storeLocation) => {
                               return <div key={storeLocation.id} className="col-md-4 mb-5">
                                   <div className="card">
                                       <img className="img-fluid" src={storeLocation.image_url} alt="" />
                                       <div className="d-flex mt-5 align-items-center justify-content-between flex-wrap">
                                            <h5>{storeLocation.state}</h5>
                                            <button onClick={() => viewOuletHandler(storeLocation.id)} className="btn" data-toggle="modal" data-target="#myModal">
                                                View Outlets
                                            </button>
                                       </div>
                                   </div>
                               </div>
                           })}
                        </div>
                    </div>
                </section>

                <section className="restaurant-display">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-9 mx-auto">
                                <div className="modal fade" id="myModal" role="dialog">
                                    <div className="modal-dialog">
                                        {/* <!-- Modal content--> */}
                                        <div className="modal-content">
                                            <div class="modal-header">
                                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                            </div>
                                            <div className="modal-body">
                                                {restaurants.map((res) => {
                                                    return <div key={res.id} className="restaurants">
                                                        <p className="name">{res.city}</p>
                                                        <p>{res.address}</p>
                                                        <p>{res.phone}</p>
                                                    </div>
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <ContactUs />
            </Layout>
        </>
    );
};

StoreLocation.getInitialProps = async() => {
    try {
        const {data: {data}} = await axiosInstance.get('store-locations');
        console.log(data);
        return {storeLocations: data}
    } catch (error) {
        console.log(error);
        return {storeLocations : []};
    }
}

export default StoreLocation;