import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { NotificationManager } from 'react-notifications';
import Router from 'next/router';
import Head from 'next/head';
import Cookies from 'js-cookie';
import { useState } from 'react';
import Link from 'next/link';

import Layout from '../../components/Layout';
import FormInput from '../../components/formInput/formInput';
import axiosInstance from '../../config/axios';
import { loader } from '../../store/actions/loader';
import { storeAuth } from '../../store/actions/auth';
import InlineLoading from '../../components/UI/inlineLoader';



const ForgotPassword = () => {

    const [ showForm, setShowForm ] = useState(true);
    const [ showResetMessage, setShowResetMessage ] = useState(false);
    const [ responseMessage, setResponseMessage ] = useState('');

    // All store
    const loadingState = useSelector(state => state.loader.loading);

    const { register, handleSubmit, errors, reset } = useForm();

    const dispatch = useDispatch();

    const forgotPasswordHandler = async (data) => {
        const userToken = Cookies.get('token');
        dispatch(loader());
        try {
            if (data) {
                const { data: response } = await axiosInstance.post('send-reset-link', data, {headers: {'Authorization': `Bearer ${userToken}`}});
                if (response.message) {
                    setShowForm(false);
                    setShowResetMessage(true);
                    setResponseMessage(response.message);
                } 
            }
            dispatch(loader());
            NotificationManager.success('Email sent', '', 3000);
        } catch (error) {
            dispatch(loader());
            NotificationManager.error(error.response.data.message, '', 3000);
            console.log(error);
        }
        reset({});
    };

    return (
        <>
            <Layout>
                <Head>
                    <title>Forgot Password | Kilimanjaro</title>
                </Head>

                <section className="signup">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 mx-auto">
                                <div className="border-line">
                                    <h3 className="text-center">Forgot Password</h3>
                                    {showForm && <p>Enter your email address</p> }
                                    {
                                        showForm && <form onSubmit={handleSubmit(forgotPasswordHandler)} className="signup-form">
                                            <FormInput
                                                type="email"
                                                name="email"
                                                placeholder="email@gmail.com"
                                                register={register({
                                                    required: 'Please input a valid email address',
                                                    pattern: /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/
                                                })}
                                                error={errors.email && errors.email.message}
                                            />
                                            <p className="d-flex align-items-center mb-3 small-text"> <img className="mr-1 notification-icon" src="/images/icon/caution-icon.svg" alt="" /> You will receive a link to create a new password via email.</p>
                                            {loadingState ? <div className="text-center"><InlineLoading /></div> : <button className="btn w-100 btn-order mt-3">Send</button>}
                                        </form>
                                    }

                                    {
                                        showResetMessage && <p>{responseMessage}. Check your inbox and click on the link provided.</p>
                                    }

                                    {
                                        showResetMessage && <p>
                                            <Link href="signup">
                                                <button className="btn">Back to Login</button>
                                            </Link>
                                        </p>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
};

export default ForgotPassword;