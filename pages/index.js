import Head from 'next/head';

import Layout from '../components/Layout';
import HeaderContent from '../components/home/HeaderContent';
import CouponSection from '../components/couponSection/CouponSection';


export default function Home() {
  return (
    <>
      <Layout>
        <Head>
          <title>Kilimanjaro</title>
        </Head>
        <HeaderContent />
        <section className="coupon-products">
          <CouponSection />
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
