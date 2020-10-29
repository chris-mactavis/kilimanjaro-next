import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { NotificationManager } from 'react-notifications';
import Router from 'next/router';
import Head from 'next/head';
import { useState } from 'react';
import Cookies from 'js-cookie';

import Layout from '../../components/Layout';
import FormInput from '../../components/formInput/formInput';
import axiosInstance from '../../config/axios';
import { loader } from '../../store/actions/loader';
import { storeAuth } from '../../store/actions/auth';
import InlineLoading from '../../components/UI/inlineLoader';



const ResetPassword = ({token, tokenIsValid, reason, code}) => {
    console.log(tokenIsValid, reason, code);

    // const [ tokenIsValid, setTokenIsValid ] = useState(true);
    // const [ reason, setReason ] = useState('Token isValid');


    // All store
    const loadingState = useSelector(state => state.loader.loading);

    const { register, handleSubmit, errors, reset } = useForm();

    const dispatch = useDispatch();

    const resetPasswordHandler = async (data) => {
        console.log(data);
        const userToken = Cookies.get('token');
        const resetData = {
            code: code,
            password: data.password
        }
        dispatch(loader());
        try {
            const { data: response } = await axiosInstance.post('update-password', resetData, {headers: {'Authorization': `Bearer ${userToken}`}});
            NotificationManager.success(response.message, '', 3000);
            dispatch(loader());
            Router.push('/signup');
        } catch(error) {
            dispatch(loader());
            NotificationManager.error(error.response.data.message, '', 3000);
            console.log(error);
        }
           
        reset({});
    };

    return (
        <>
            <Layout showSecFooter>
                <Head>
                    <title>Reset Password | Kilimanjaro</title>
                </Head>

                <section className="signup">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 mx-auto">
                                <div className="border-line">
                                    <h3 className="text-center">Reset Password</h3>
                                    {tokenIsValid && <p className="mb-3"> Sorry! Now you can reset you password</p>} 
                                   { tokenIsValid
                                   ? <form onSubmit={handleSubmit(resetPasswordHandler)} className="signup-form">
                                        <FormInput
                                            type="password"
                                            name="password"
                                            placeholder="Password*"
                                            label="Password"
                                            register={register({required: true})}
                                            error={errors.password && errors.password.message}
                                        />
                                         <FormInput
                                            type="password"
                                            name="confirm_password"
                                            placeholder="Confirm Password*"
                                            label="Confirm Password"
                                            register={register({required: true})}
                                            error={errors.email && errors.email.message}
                                        />
                                        {loadingState ? <div className="text-center"><InlineLoading /></div> : <button className="btn w-100 btn-order mt-3">Reset Password</button>}
                                    </form>
                                    : <>
                                        <div>
                                            {
                                                reason === 'The reset link has expired!'
                                                ?   <>
                                                        <h5 className="text-center mb-3">Token Expired</h5>
                                                        <p>The link you supplied has expired. Please generate another link to reset your password.</p>
                                                    </>
                                                :
                                                    <>
                                                        <h5  className="text-center mb-3">Wrong Link</h5>
                                                        <p>
                                                            You have clicked on an invalid link. Please make sure that you have typed the link correctly.
                                                            If are copying this link from a mail reader please ensure that you have copied all the lines in the link.
                                                        </p>
                                                    </>
                                            }
                                        </div>
                                    </>}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
};

ResetPassword.getInitialProps = async ({query}) => {
    console.log(query);
    if (!query.hasOwnProperty('code')) {
        return {
            tokenIsValid: false,
            reason: null
        }
    }
  
    
    try {
        const {data: response } = await axiosInstance.post('validate-reset-token', query);
        return {
            code: query.code,
            tokenIsValid: response.message === 'reset link valid',
            reason: null
        }
    } catch (error) {
        return {
            tokenIsValid: false,
            reason: error.response.data.message
        }
    }
}

export default ResetPassword;