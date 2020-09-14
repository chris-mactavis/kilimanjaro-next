import Layout from "../components/Layout";
import Head from 'next/head';

const Signin = () => {
        return (
            <Layout showSecFooter>
                <Head>
                    <title>Signup | Kilimanjaro</title>
                </Head>

                <section className="signup">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-5">
                                <h3>Sign In</h3>
                                <p>Welcome back! Sign in to Your Account</p>
                                <form className="signup-form">
                                    <label htmlFor="email">Email Address</label>
                                    <div className="textbox">
                                        <input type="text" placeholder="Example@email.com*" />
                                        <div className="border"></div>
                                    </div>
                                    <label htmlFor="password">Password</label>
                                    <div className="textbox">
                                        <input type="password" placeholder="Password*" />
                                        <div className="border"></div>
                                    </div>
                                    <div className="d-flex justify-content-between flex-wrap remember-account">
                                        <label class="contain">Remember me<input name="rememberAccount" type="checkbox" /><span class="checkmark"></span></label>
                                        <button>Forgot Password?</button>
                                    </div>
                                    <button className="btn btn-login">Login</button>
                                </form>
                                <p className="mt-3">Or sign in with</p>
                                <div className="other-signin-option">
                                    <button className="fb-btn"><img src="/images/icon/fb-white.svg" alt=""/>facebook</button>
                                    <button><img src="/images/icon/google.svg" alt=""/>Google</button>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <p className="or-text">Or</p>
                            </div>  
                            <div className="col-md-5">

                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        );
};

export default Signin;