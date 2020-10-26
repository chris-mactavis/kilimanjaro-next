import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { NotificationManager } from 'react-notifications';
import Router from 'next/router';
import Head from 'next/head';

import Layout from '../../components/Layout';
import FormInput from '../../components/formInput/formInput';
import axiosInstance from '../../config/axios';
import { loader } from '../../store/actions/loader';
import { storeAuth } from '../../store/actions/auth';
import InlineLoading from '../../components/UI/inlineLoader';


const ForgotPassword = () => {

    // All store
    const loadingState = useSelector(state => state.loader.loading);

    const { register, handleSubmit, errors, reset } = useForm();

    const dispatch = useDispatch();

    const forgotPasswordHandler = async (data) => {
        dispatch(loader());
            if (data) {
               console.log(data);
            }
            setTimeout(() => {
                dispatch(loader());
            }, 1000);
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
                                    <h3>Forgot Password</h3>
                                    <p>Enter your email address</p>
                                    <form onSubmit={handleSubmit(forgotPasswordHandler)} className="signup-form">
                                        <FormInput
                                            type="email"
                                            name="email"
                                            placeholder="email@gmail.com"
                                            // label="Email"
                                            register={register({ 
                                                required : 'Please input a valid email address', 
                                                pattern: /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/
                                            })}
                                            error={errors.email && errors.email.message}
                                        />
                                        <p className="d-flex align-items-center mb-3"> <img className="mr-1" src="/images/icon/caution-icon.svg" alt=""/> You will receive a link to create a new password via email.</p>
                                        {loadingState ? <div className="text-center"><InlineLoading /></div> : <button className="btn w-100 btn-order mt-3">Send</button>}
                                    </form>
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