import Head from 'next/head';
import Router from 'next/router';
import NProgress from 'nprogress';

import NavBar from '../components/NavBar';

Router.onRouterChangeStart = url => {
    console.log(url);
    NProgress.start();
};

Router.onRouterChangeComplete = ()  => {
    return NProgress.done();
};

Router.onRouterChangeError = ()  => {
    return NProgress.done();
};

const Layout = ({children}) => {
    return (
        <> 
            <Head>
                 <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <NavBar />

            {children}

            {/* <Footer /> */}
        </>
    );

};


export default Layout;