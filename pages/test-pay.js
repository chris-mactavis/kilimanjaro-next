import Layout from '../components/Layout';
import Head from 'next/head';


import { useEffect, useState } from 'react';


const TestPay = () => {
    

    const [paymentInfoInterswitch, setPaymentInfoInterwitch] = useState({});

   

    // console.log(hash, 'the hash');
    useEffect(() => {
        $(document).ready(function (){ 
            let txn_ref = 'Killi-' + parseInt(Math.random() * 10000000);
            let pay_item_id = "101";
            let amt = 800000;
            let siteRedirectUrl = "http://localhost:3000/complete-order";
            let macKey = "D3D1D05AFE42AD50818167EAC73C109168A0F108F32645C8B59E897FA930DA44F9230910DAC9E20641823799A107A02068F7BC0F4CC41D2952E249552255710F";
        
            let product_id = 1076;
            let sha512 = require("sha512");
            let hashString = txn_ref + product_id +  pay_item_id + amt + siteRedirectUrl + macKey;
            let hash = sha512(hashString).toString('hex').toUpperCase();
    
             console.log(hash, 'hashes');
    
    
            const obj = {
                postUrl: "https://sandbox.interswitchng.com/collections/w/pay",
                amt,
                product_id,
                txn_ref,
                siteName: "Kilimanjaro",
                pay_item_id,
                customerId: "84",
                siteRedirectUrl,
                hash,
            };

            setPaymentInfoInterwitch(obj);
    
            // new IswPay(obj);
        });

    }, []);

    const payNowHandler = (e) => {
        e.preventDefault();
       

    // let txn_ref = 'Kili-' + parseInt(Math.random() * 100000);
        // let itemId = "936";
        // let amount = 80000;
        // let siteRedirectUrl = "http://localhost:8080/webpopupnew.html";
        // let custName = 'Abolarin Oyinlola'
        // let macKey = "D3D1D05AFE42AD50818167EAC73C109168A0F108F32645C8B59E897FA930DA44F9230910DAC9E20641823799A107A02068F7BC0F4CC41D2952E249552255710F";

        // let theId = [];
        // const id = localCart.map((cart, id) => {
        //     theId.push(cart.product.id);
        //     const newId = theId.join('');

        // });

        // let productId = `${theId.join('')}`;
        // let productId = '2759';
        
        // const sha512 = require("sha512");
        // const hashString = txn_ref + productId + itemId + amount + siteRedirectUrl + macKey;
        // let hash = sha512(hashString).toString('hex').toUpperCase();

        // console.log(hashString, hash);

        // let txn_ref = 'Killi-' + parseInt(Math.random() * 10000000);
        //     let itemId = "101";
        //     let amt = 800000;
        //     let siteRedirectUrl = "http://localhost:3000/complete-order";
        //     let macKey = "D3D1D05AFE42AD50818167EAC73C109168A0F108F32645C8B59E897FA930DA44F9230910DAC9E20641823799A107A02068F7BC0F4CC41D2952E249552255710F";
        
        //     let   productId = 1076;
        //     let sha512 = require("sha512");
        //     let hashString = txn_ref + productId +  itemId + amt + siteRedirectUrl + macKey;
        //     let hash = sha512(hashString).toString('hex').toUpperCase();

        // // //  console.log(hash, 'hash');

       
        // const obj = {
        //     postUrl: "https://sandbox.interswitchng.com/collections/w/pay",
        //     amt,
        //     productId,
        //     txn_ref,
        //     siteName: "Kilimanjaro",
        //     itemId,
        //     customerId: "84",
        //     siteRedirectUrl,
        //     currency: "566",
        //     hash,
        //     onComplete : function (paymentResponse){
        //         console.log(paymentResponse);
        //     }
        // };

        // new IswPay(obj);
      
        // setPaymentInfoInterwitch(obj);
        document.getElementById('myform').submit();
        // window.location.href = "https://sandbox.interswitchng.com/webpay/pay";
    }


    return (
        <Layout>
            <Head>
                <title>TestPay Page | Kilimanjaro</title>
                <script type="text/javascript" src="http://sandbox.interswitchng.com/collections/public/webpay.js" crossorigin="anonymous"></script>
                {/*   <script type="text/javascript" src="http://sandbox.interswitchng.com/collections/public/webpay.js"></script> */}

            </Head>

            <h1>
                hello
            </h1>

            <form id="myform" name="form1" action="https://sandbox.interswitchng.com/webpay/pay" method="POST" >
                <input name="product_id" type="hidden" value={`${paymentInfoInterswitch.product_id}`} />
                <input name="pay_item_id" type="hidden" value={`${paymentInfoInterswitch.pay_item_id}`} />
                <input name="amount" type="hidden" value={`${paymentInfoInterswitch.amt}`} />
                <input name="currency" type="hidden" value="566" />
                <input name="site_redirect_url" type="hidden" value={`${paymentInfoInterswitch.siteRedirectUrl}`} />
                <input name="txn_ref" type="hidden" value={`${paymentInfoInterswitch.txn_ref}`} />
                <input name="cust_id" type="hidden" value="84" />
                <input name="cust_name" type="hidden" value="Abolarin Oyinlola Christopher" />
                <input name="hash" type="hidden" value={`${paymentInfoInterswitch.hash}`} />
                <button className="btn" onClick={payNowHandler} value="PAY NOW"><span className="text"> PAY NOW</span></button>
            </form>

        </Layout>  
    ) 
}


export default TestPay;