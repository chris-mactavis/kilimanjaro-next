import Head from 'next/head';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import ScrollReveal from 'scrollreveal';


import Layout from '../components/Layout';
import HeaderContent from '../components/home/HeaderContent';
import Orders from '../components/orders/orders';
import axiosInstance from '../config/axios';


const Home = ({ cities }) => {

  useEffect(() => {
    localStorage.setItem('setAllCities', JSON.stringify(cities));
    if ( Cookies.set('couponAmt') || Cookies.set('coupName') || Cookies.set('totalPriceAmtWithCoupon') || Cookies.set('unusedBalance') || Cookies.set('newUnusedBalance') ) {
      Cookies.remove('unusedBalance');
      Cookies.remove('couponAmt');
      Cookies.remove('totalPriceAmtWithCoupon');
      Cookies.remove('coupName');
      Cookies.remove('newUnusedBalance');
    };
  }, []);

  useEffect(() => {
    window.$ = $;
    $(window).ready(function () {
      const $el = $("html, body");
      $el.css({ 'overflow-x': 'hidden' });
    });

    $(window).scroll(function() {    
      var scroll = $(window).scrollTop();

      // console.log(scroll);
  
      if (scroll >= 900) {
          $(".app-img-1").addClass("animate-1");
          $(".app-img-2").addClass("animate-2");
      } else {
          $(".app-img-1").removeClass("animate-1");
          $(".app-img-2").removeClass("animate-2");
      }
    });
  }, []);

 

  return (
    <>
      <Layout showSecFooter>
        <Head>
          <title>Kilimanjaro</title>
        </Head>
        <HeaderContent cities={cities} />
        <Orders />
        <br />
        <section className="how-it-works">
          <div className="container">
            <div className="row">
              <div className="col-12 text-center">
                <h2>How it works</h2>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 text-center bounce-hover">
                <img className="w-75 headline bounce" src="/images/icon/location-icon.svg" alt="" />
                <p className="text-red">Select nearest location</p>
                <p>Select the state and restaurant closest to your pick-up/delivery location.</p>
              </div>
              <div className="col-md-4 text-center bounce-hover">
                <img className="w-75 bounce" src="/images/icon/menu-icon.svg" alt="" />
                <p className="text-red">Choose your meal</p>
                <p>Place your order by choosing from the numerous delicacies on our menu.</p>
              </div>
              <div className="col-md-4 text-center bounce-hover">
                <img className="w-75 bounce" src="/images/icon/delivery-pickup.svg" alt="" />
                <p className="text-red">Enjoy your meal</p>
                <p>Pick up your tasty meal in store or have it delivered to your doorstep.</p>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}

Home.getInitialProps = async () => {
  try {
    const { data: { data } } = await axiosInstance.get('cities');
    return { cities: data };

  } catch (error) {
    console.log(error)
    return { cities: {} };
  }
}

export default Home;