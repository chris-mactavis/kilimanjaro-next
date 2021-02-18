import Document, {Html, Head, Main, NextScript } from 'next/document';

class document extends Document  {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <meta charSet="utf-8" />

                    <meta name="description" content="" />

                    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                    <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon/favicon-32x32.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon/favicon-16x16.png" />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                    <link rel="stylesheet" href="/css/bootstrap.min.css" />
                    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"></link>

                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css" integrity="sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ==" crossOrigin="anonymous" />

                    <link rel="stylesheet" type="text/css" href="/slick/slick.css" />
                    <link rel="stylesheet" type="text/css" href="/slick/slick-theme.css" />


                    
                    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDWajwZf_MGn2k5vVYECfrtphdGTCAKurg&libraries=places"></script>
                    <script src="https://code.jquery.com/jquery-3.4.1.min.js"
                        integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
                        crossOrigin="anonymous" />
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/2.4.1/lodash.min.js"></script>
                    <script type="text/javascript" src="/slick/slick.min.js" />
                    <script src="/js/bootstrap.min.js" />
                    <script src="/js/main.js" />
                </Head>
    
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
    
};

export default document;