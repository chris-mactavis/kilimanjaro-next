import Layout from '../../components/Layout';
import Head from 'next/head';
import { useEffect } from 'react';


const Menu = () => {

    useEffect(() => {
        $('document').ready(function () {
            $('.menu-header-slider').slick({
                dots: true,
                autoplay: true,
                speed: 1000,
                autoplaySpeed: 3000,
            });
        });
    }, []);

    return (
        <Layout>
            <Head>
                <title>Menu | Kilimanjaro</title>
            </Head>
            <header className="menu-header">
                <div className="menu-header-slider">
                    <img className="img-fluid" src="/images/food-banner.png" alt=""/>
                    <img className="img-fluid" src="/images/food-banner.png" alt=""/>
                    <img className="img-fluid" src="/images/food-banner.png" alt=""/>
                    <img className="img-fluid" src="/images/food-banner.png" alt=""/>
                    <img className="img-fluid" src="/images/food-banner.png" alt=""/>
                </div>
            </header>
        </Layout>
    );
};

export default Menu;