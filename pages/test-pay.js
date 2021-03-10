import Layout from '../components/Layout';
import Head from 'next/head';
import Router from 'next/router';


import { useEffect, useState } from 'react';


const TestPay = () => {
    

    const [paymentInfoInterswitch, setPaymentInfoInterwitch] = useState({});

   

    // console.log(hash, 'the hash');
    // useEffect(() => {
    //     $(document).ready(function (){ 
    //         let txn_ref = 'Killi-' + parseInt(Math.random() * 10000000);
    //         let pay_item_id = "101";
    //         let amt = 800000;
    //         let siteRedirectUrl = "http://localhost:3000/complete-order";
    //         let macKey = "D3D1D05AFE42AD50818167EAC73C109168A0F108F32645C8B59E897FA930DA44F9230910DAC9E20641823799A107A02068F7BC0F4CC41D2952E249552255710F";
        
    //         let product_id = 1076;
    //         let sha512 = require("sha512");
    //         let hashString = txn_ref + product_id +  pay_item_id + amt + siteRedirectUrl + macKey;
    //         let hash = sha512(hashString).toString('hex').toUpperCase();
    
    //          console.log(hash, 'hashes');
    
    
    //         const obj = {
    //             postUrl: "https://sandbox.interswitchng.com/collections/w/pay",
    //             amt,
    //             product_id,
    //             txn_ref,
    //             siteName: "Kilimanjaro",
    //             pay_item_id,
    //             customerId: "84",
    //             siteRedirectUrl,
    //             hash,
    //         };

    //         setPaymentInfoInterwitch(obj);
    
    //         // new IswPay(obj);
    //     });

    // }, []);

    const payNowHandler = () => {

        let transRef = 'Killi-' + parseInt(Math.random() * 10000000);
            let itemId = "101";
            let amount = 800000;
            let siteRedirectUrl = "http://localhost:3000";
            let macKey = "D3D1D05AFE42AD50818167EAC73C109168A0F108F32645C8B59E897FA930DA44F9230910DAC9E20641823799A107A02068F7BC0F4CC41D2952E249552255710F";
        
            let   productId = '1076';
            let sha512 = require("sha512");
            let hashString = transRef + productId +  itemId + amount + siteRedirectUrl + macKey;
            let hash = sha512(hashString).toString('hex').toUpperCase();

       
        const obj = {
            postUrl: "https://sandbox.interswitchng.com/collections/w/pay",
            amount,
            productId,
            transRef,
            siteName: "Kilimanjaro",
            itemId,
            customerId: "84",
            siteRedirectUrl,
            currency: "NGN",
            hash,
            onComplete : function (paymentResponse){
                submitOrder();
                console.log('i got here', paymentResponse);
            }
        };

        // console.log(obj);

        new IswPay(obj);

        const submitOrder = () => {
            Router.push('/complete-order');
        }
    }


    return (
        <Layout>
            <Head>
                <title>TestPay Page | Kilimanjaro</title>
                <script type="text/javascript" src="http://sandbox.interswitchng.com/collections/public/webpay.js" crossorigin="anonymous"></script>

            </Head>

            <h1>
                Test Pay Page
            </h1>
            <p>This is a test page for interswitch payment gateway</p>
            <button type="submit" className="btn" onClick={payNowHandler} value="PAY NOW"><span className="text"> PAY NOW</span></button>

            {/* <form id="myform"  > */}
                {/* <input name="product_id" type="hidden" value={`${paymentInfoInterswitch.product_id}`} />
                <input name="pay_item_id" type="hidden" value={`${paymentInfoInterswitch.pay_item_id}`} />
                <input name="amount" type="hidden" value={`${paymentInfoInterswitch.amt}`} />
                <input name="currency" type="hidden" value="566" />
                <input name="site_redirect_url" type="hidden" value={`${paymentInfoInterswitch.siteRedirectUrl}`} />
                <input name="txn_ref" type="hidden" value={`${paymentInfoInterswitch.txn_ref}`} />
                <input name="cust_id" type="hidden" value="84" />
                <input name="cust_name" type="hidden" value="Abolarin Oyinlola Christopher" />
                <input name="hash" type="hidden" value={`${paymentInfoInterswitch.hash}`} /> */}
                {/* <button type="submit" className="btn" onClick={payNowHandler} value="PAY NOW"><span className="text"> PAY NOW</span></button> */}
            {/* </form> */}

        </Layout>  
    ) 
}


export default TestPay;