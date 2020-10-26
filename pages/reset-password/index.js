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

    const resetPasswordHandler = async (data) => {
        dispatch(loader());
            if (data) {
               console.log(data);
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
                                    <h3>Reset Password</h3>
                                    <p className="mb-3"> Sorry! Now you can reset you password</p>
                                    <form onSubmit={handleSubmit(resetPasswordHandler)} className="signup-form">
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