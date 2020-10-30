import Layout from "../components/Layout";
import Head from 'next/head';

import Login from '../components/login/login';
import Signup from '../components/signup/signup';
import { withoutAuth } from '../components/hoc/auth';

const Signin = () => {
        return (
            <Layout showSecFooter>
                <Head>
                    <title>Signup | Kilimanjaro</title>
                </Head>

                <section className="signup">
                    <div className="container">
                        <div className="row">
                            <Login />
                            <div className="col-md-2 d-md-block d-none">
                                <p className="or-text">Or</p>
                            </div>  
                            <Signup />
                        </div>
                    </div>
                </section>
            </Layout>
        );
};

export default withoutAuth(Signin);