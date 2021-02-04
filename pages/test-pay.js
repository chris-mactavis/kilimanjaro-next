import Layout from '../components/Layout';
import Head from 'next/head';


import { useEffect, useState } from 'react';


const TestPay = () => {

    const [paymentInfoInterswitch, setPaymentInfoInterwitch] = useState({});


    const payNowHandler = () => {
        let transRef = 'Kili-' + parseInt(Math.random() * 100000);
        let itemId = "936";
        let amount = total;
        let siteRedirectUrl = "http://localhost:8080/webpopupnew.html";
        let custName = isLoggedIn ? (user.first_name + ' ' + user.last_name) : (data.first_name + ' ' + data.last_name);
        let macKey = "D3D1D05AFE42AD50818167EAC73C109168A0F108F32645C8B59E897FA930DA44F9230910DAC9E20641823799A107A02068F7BC0F4CC41D2952E249552255710F";

        let theId = [];
        const id = localCart.map((cart, id) => {
            theId.push(cart.product.id);
            const newId = theId.join('');

        });

        let productId = `${theId.join('')}`;

        // setPaymentInfoInterwitch(info);
        // setTheProId(theProductId);
        const sha512 = require("sha512");
        const hashString = transRef + productId + itemId + amount + siteRedirectUrl + macKey;
        let hash = sha512(hashString).toString('hex').toUpperCase();

        console.log(hashString, hash);

        const obj = {
            amount,
            productId,
            transRef,
            siteName: "Kilimanjaro",
            itemId,
            customerId: "84",
            siteRedirectUrl,
            currency: "566",
            custName,
            hash,
        };
        console.log(obj);
        setPaymentInfoInterwitch(obj);
    }

    return (
        <Layout>
            <Head>
                <title>TestPay Page | Kilimanjaro</title>
                <script type="text/javascript" src="http://sandbox.interswitchng.com/collections/public/webpay.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/js-sha512/0.8.0/sha512.min.js" integrity="sha512-KUrAWA1oxsWKHBaA2mlZyRuR8zzzHHYgpDfkfPrT3FhlZ4YdXbXyE89VHI6WmWradSHtuZjLyLAMP2F7IWK4JQ==" crossorigin="anonymous"></script>
            </Head>

            <h1>
                hello
            </h1>

            <form name="form1" action="https://sandbox.interswitchng.com/webpay/pay" method="POST">
                <input name="product_id" type="hidden" value={`${paymentInfoInterswitch.productId}`} />
                <input name="pay_item_id" type="hidden" value={`${paymentInfoInterswitch.itemId}`} />
                <input name="amount" type="hidden" value={`${paymentInfoInterswitch.amount}`} />
                <input name="currency" type="hidden" value="566" />
                <input name="site_redirect_url" type="hidden" value={`${paymentInfoInterswitch.siteRedirectUrl}`} />
                <input name="txn_ref" type="hidden" value={`${paymentInfoInterswitch.transRef}`} />
                <input name="cust_id" type="hidden" value={`${paymentInfoInterswitch.customerId}`} />
                <input name="cust_name" type="hidden" value={`${paymentInfoInterswitch.custName}`} />
                <input name="hash" type="hidden" value={`${paymentInfoInterswitch.hash}`} />
                <input type="submit" value="PAY NOW" onClick={payNowHandler}></input>
            </form>

        </Layout>
    )
}


export default TestPay;