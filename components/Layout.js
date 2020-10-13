import Head from 'next/head';
import Router from 'next/router';
import NProgress from 'nprogress';


import NavBar from '../components/NavBar';
import Footer from './Footer';
import Loader from './UI/loader';


Router.onRouteChangeStart = url => {
    console.log(url);
    NProgress.start();
};

Router.onRouteChangeComplete = ()  => NProgress.done();

Router.onRouteChangeError = ()  => NProgress.done();

const Layout = ({children, showSecFooter}) => {
    return (
        <> 
            <Head>
                 <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <NavBar />

            <Loader /> 

            {children}

            <Footer showSecFooter={showSecFooter} />
        </>
    );

};


export default Layout;