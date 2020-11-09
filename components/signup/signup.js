import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { NotificationManager } from 'react-notifications';
import Router from 'next/router';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
import { useState } from 'react';

import FormInput from '../formInput/formInput';
import axiosInstance from '../../config/axios';
import { loader } from '../../store/actions/loader';
import { storeAuth } from '../../store/actions/auth';
import InlineLoading from '../../components/UI/inlineLoader';


const Signup = () => {

    const [ inlineLoader, setInlineLoader ] = useState(false);

    // All store
    const loadingState = useSelector(state => state.loader.loading);

    const { register, handleSubmit, errors, reset } = useForm();

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
        Router.push('/account');
    }

    const signupHandler = async (data) =>  {
        dispatch(loader());
        setInlineLoader(true);
        try {
            if (data) {
                const { data : response} = await axiosInstance.post('register', {...data, signup_device: 'web'});
                dispatch(storeAuth(response.data));
                console.log(response.data);
                dispatch(loader());
                setInlineLoader(false); 
                Router.push('/');
            }
            NotificationManager.success('Account Registeration Successful', '', 3000);
        } catch (error) {
            dispatch(loader());
            setInlineLoader(false);
            NotificationManager.error(error.response.data.message, '', 3000);
            console.log(error);
        }
        reset({});
    };

    const verifyEmailHandler = async email => {
        try {
            const { data: {data: {email_exists}} } = await axiosInstance.post('verify-email', {email});
            return !email_exists || 'Email already exists. Do you want to login instead?'
        } catch (error) {

        }
    }

    const verifyPhoneHandler = async phone => {
        try {
            const { data: {data: {phone_exists}} } = await axiosInstance.post('verify-phone', {phone});
            return !phone_exists || 'Phone number already exists. Kindly use another number'
        } catch (error) {

        }
    }

    return (
        <>
            <div className="col-md-5 mt-md-0 mt-5 mb-md-0 mb-5">
                <h3>Create New Account</h3>
                <p>Create your very own Kilimanjaro Account</p>
                <form onSubmit={handleSubmit(signupHandler)} className="signup-form">
                    <FormInput
                        type="text"
                        name="first_name"
                        placeholder="First Name*"
                        label="First Name"
                        register={register ({required : 'First name is required'})} 
                        error={errors.first_name && errors.first_name.message}
                    />
                    <FormInput
                        type="text"
                        name="last_name"
                        placeholder="Last Name*"
                        label="Last Name"
                        register={register ({required : 'Last name is required'})}
                        error={errors.last_name && errors.last_name.message} 
                    />
                    <FormInput
                        type="number"
                        name="phone"
                        placeholder="+234 80 1234 5678"
                        label="Mobile Number"
                        register={register ({ 
                            required : true,
                            validate: async value => verifyPhoneHandler(value)
                        })}
                        error={errors.phone && errors.phone.message} 
                    />
                    <FormInput
                        type="email"
                        name="email"
                        placeholder="Example@email.com*"
                        label="Email Address"
                        register={register({ 
                            required : 'Please input a valid email address', 
                            // pattern: /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/,
                            validate: async value => verifyEmailHandler(value) 
                        })}
                        error={errors.email && errors.email.message} 
                    />
                    <FormInput
                        type="password"
                        name="password"
                        placeholder="Password*"
                        label="Password"
                        register={register ({required : 'Password must be more than 8 characters', minLength: 8})}
                        error={errors.password && errors.password.message} 
                    />
                    {loadingState && inlineLoader ? <InlineLoading />  :<button className="btn btn-login mt-3">Register</button>}
                </form>
                <p className="mt-3">Or sign up with</p>
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
                    
                    {/* <button className="fb-btn"><img src="/images/icon/fb-white.svg" alt="" /><FacebookLogin
                        appId="1088597931155576"
                        autoLoad={true}
                        fields="name,email,picture"
                        callback={facebookLoginHandler}
                    /></button> */}
                    {/* <button><img src="/images/icon/google.svg" alt="" />Google</button> */}
                </div>
            </div>
        </>
    );
};

export default Signup;