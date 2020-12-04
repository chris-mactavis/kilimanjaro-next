import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import Router from 'next/router';
import { NotificationManager } from 'react-notifications';
import { useSelector } from 'react-redux';
import { useState } from 'react';


import FormInput from "../formInput/formInput";
import { loginAsync } from '../../store/actions/auth';
import { storeAuth } from '../../store/actions/auth';
import InlineLoading from '../../components/UI/inlineLoader';


const Login = () => {

    const [ inlineLoader, setInlineLoader ] = useState(false);

    // All store
    const loadingState = useSelector(state => state.loader.loading);


    const { register, handleSubmit, errors , reset} = useForm();
    const dispatch = useDispatch();

    const facebookLoginHandler = (data) => {
        console.log(data);
    }

    const googleLoginHandler = (data) => {
        const user = {
            token: data.tokenId,
            user: {...data.profileObj, first_name: data.profileObj.familyName, last_name: data.profileObj.givenName}
        }
        dispatch(storeAuth(user));
        NotificationManager.success('Account Registeration Successful', '', 3000);
        let redirectTo = localStorage.getItem('checkoutToLogin');
        // checkoutCookies = String(checkoutCookies);
        console.log(redirectTo, 'true');
        if (redirectTo) {
            Router.push(redirectTo);
            localStorage.removeItem('checkoutToLogin');
        } else {
            Router.push('/account');
        } 
    }

    const loginHandler = async data =>  {
        setInlineLoader(true);
        if (data) {
            try {
                await dispatch(loginAsync(data));
                setInlineLoader(false);
            } catch (error) {
                console.log(error);
                setInlineLoader(false);
            }
        }
        reset({});
    };

    return (
        <>
            <div className="col-md-5">
                <h3>Sign In</h3>
                <p>Welcome back! Sign in to your Account</p>
                <form onSubmit={handleSubmit(loginHandler)} className="signup-form">
                    <FormInput
                        type="email"
                        name="email"
                        placeholder="Example@email.com*"
                        label="Email Address"
                        register={register ({ required : 'Please input a valid email address' })}
                        error={errors.email &&errors.email.message } 
                    />
                    <div>
                    <FormInput
                        type="password"
                        name="password"
                        placeholder="Password*"
                        label="Password"
                        register={register ({required : 'Password must be more than 8 characters', minLength: 8})}
                        error={errors.password && errors.password.message} 
                    />
                    {/* <p className="showPassword"><i class="fa fa-eye-slash" aria-hidden="true"></i> Show password</p> */}
                    </div>

                    <div className="d-flex align-items-center justify-content-between flex-wrap remember-account">
                        <label className="contain">Remember me<input name="rememberAccount" type="checkbox" /><span className="checkmark"></span></label>
                        <div><a onClick={() => Router.push('/forgot-password')}>Forgot Password?</a></div>
                    </div>
                    {loadingState && inlineLoader ? <InlineLoading />  : <button className="btn btn-login"><span className="text">Login</span></button>}
                </form>
                <p className="mt-3">Or sign in with</p>
                <div className="other-signin-option">
                <FacebookLogin
                        appId="699697547406211"
                        autoLoad={true}
                        fields="name,email,picture"
                        callback={facebookLoginHandler}
                        icon='fa-facebook'
                        textButton="Facebook"
                        // isDisabled="true"
                    />
                    <div className="gle-btn">
                        <GoogleLogin
                            clientId="468329337642-v2qjq23bgdoluhfq4dtblb36bodanmhg.apps.googleusercontent.com"
                            fields="first_name,last_name,email,picture"
                            buttonText="Google"
                            onSuccess={googleLoginHandler}
                            onFailure={googleLoginHandler}
                            cookiePolicy={'single_host_origin'}
                            icon= {true}
                            className="google-btn"
                            disabled= {false}
                        />
                    </div>
                    {/* <button className="fb-btn"><img src="/images/icon/fb-white.svg" alt="" />facebook</button>
                    <button><img src="/images/icon/google.svg" alt="" />Google</button> */}
                </div>
            </div>
        </>
    );
};

export default Login;