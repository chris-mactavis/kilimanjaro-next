import Layout from  '../components/Layout';
import Head from 'next/head';


const TestPay = () => {

    return (
        <Layout>
            <Head>
                <title>TestPay Page | Kilimanjaro</title>
            </Head>

            <h1>
                hello
            </h1>

            <form name="form1" action="https://sandbox.interswitchng.com/webpay/pay" method="POST">
                <input name="product_id" type="hidden" value="2957" />
                <input name="pay_item_id" type="hidden" value="936" />
                <input name="amount" type="hidden" value="8020" />
                <input name="currency" type="hidden" value="566" />
                <input name="site_redirect_url" value="http://abc.com/getresponse" type="hidden"  />
                <input name="txn_ref" type="hidden" value="kilimanjaro-ref-0.9201448110758386" />
                <input name="cust_id" type="hidden" value="84" />
                <input name="hash" type="hidden" value="0B2D5D66EA4690DF6A4BC48972C7DA5585286C02FB9432354F69D12282010E875F41BFA7DF655EB19A7BBC6D640D499679BF9F01B05A60CE6607BB642D3FCC2D" />
                <input type="submit" value="PAY NOW"></input>
            </form>

        </Layout>
    )
}


export default TestPay;