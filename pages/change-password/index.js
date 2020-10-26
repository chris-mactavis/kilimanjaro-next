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

    const changePasswordHandler = async (data) => {
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
            <Layout showSecFooter>
                <Head>
                    <title>Change Password | Kilimanjaro</title>
                </Head>

                <section className="signup">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 mx-auto">
                                <div className="border-line">
                                    <h3>Change Password </h3>
                                    <p className="mb-3"> Is your password vulnerable? You can change it here.</p>
                                    <form onSubmit={handleSubmit(changePasswordHandler)} className="signup-form">
                                        <FormInput
                                            type="password"
                                            name="old_password"
                                            placeholder="Old Password*"
                                            label="Old Password"
                                            register={register({required: 'This field is required'})}
                                            error={errors.old_password && errors.old_password.message}
                                        />
                                         <FormInput
                                            type="password"
                                            name="new_password"
                                            placeholder="New Password*"
                                            label="New Password"
                                            register={register({required: 'Password should be more than 8 characters',  minLength: 8})}
                                            error={errors.new_password && errors.new_password.message}
                                        />
                                        <FormInput
                                            type="password"
                                            name="confirm_password"
                                            placeholder="Confirm Password*"
                                            label="Confirm Password"
                                            register={register({required: 'Password should be more than 8 characters',  minLength: 8})}
                                            error={errors.confirm_password && errors.confirm_password.message}
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