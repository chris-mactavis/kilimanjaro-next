import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { NotificationManager } from 'react-notifications';
import Router from 'next/router';
import Head from 'next/head';

import Layout from '../../components/Layout';
import FormInput from '../../components/formInput/formInput';
import axiosInstance from '../../config/axios';
import { loader } from '../../store/actions/loader';
import { storeAuth } from '../../store/actions/auth';


const ForgotPassword = () => {

    const { register, handleSubmit, errors, reset } = useForm();

    const dispatch = useDispatch();

    const changePasswordHandler = async (data) => {
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
                                            register={register({required: true})}
                                            error={errors.old_password && errors.old_password.message}
                                        />
                                         <FormInput
                                            type="password"
                                            name="new_password"
                                            placeholder="New Password*"
                                            label="New Password"
                                            register={register({required: true})}
                                            error={errors.new_password && errors.new_password.message}
                                        />
                                        <FormInput
                                            type="password"
                                            name="confirm_password"
                                            placeholder="Confirm Password*"
                                            label="Confirm Password"
                                            register={register({required: true})}
                                            error={errors.confirm_password && errors.confirm_password.message}
                                        />
                                        <button className="btn w-100 btn-order mt-3">Reset Password</button>
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