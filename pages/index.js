import Head from 'next/head';
import Cookies from 'js-cookie';
import { useEffect } from 'react';


import Layout from '../components/Layout';
import HeaderContent from '../components/home/HeaderContent';
import CouponProduct from '../components/couponProduct/CouponProduct';
import Orders from '../components/orders/orders';
import axiosInstance from '../config/axios';


const Home = ({cities}) => {
  // console.log(cities);
  const hasToken = false;

  useEffect(() => {
    const allCities = Cookies.set('setAllCities') ? Cookies.set('setAllCities', JSON.stringify(cities)) : [];
    console.log(allCities);
  }, []); 
  
  return (
    <>
      <Layout showSecFooter>
        <Head>
          <title>Kilimanjaro</title>
        </Head>
        <HeaderContent cities={cities} />
        {hasToken && <Orders  />}
        {/* <Orders  /> */}
        <section className="coupon-products">
          <CouponProduct />
        </section>
        <section className="how-it-works">
          <div className="container">
            <div className="row">
              <div className="col-12 text-center">
                <h2>How it works</h2>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 text-center">
                <img className="img-fluid" src="/images/Rectangle.png" alt=""/>
                <p className="text-red">Select nearest location</p>
                <p>Select the state and restaurant closest to your pick-up/delivery location.</p>
              </div>
              <div className="col-md-4 text-center">
                <img className="img-fluid" src="/images/Rectangle.png" alt="" />
                <p className="text-red">Choose your meal</p>
                <p>Place your order by choosing from the numerous delicacies on our menu</p>
              </div>
              <div className="col-md-4 text-center">
                <img className="img-fluid" src="/images/Rectangle.png" alt="" />
                <p className="text-red">Enjoy your meal</p>
                <p>Pick up your tasty meal in store or have it delivered to your doorstep</p>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}

Home.getInitialProps = async() => {
  try {
      const {data: {data}} = await axiosInstance.get('cities');
      return {cities: data};
    
  } catch (error) {
      console.log(error)
      return {};
  }
}

export default Home;