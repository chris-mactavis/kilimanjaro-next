import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { NotificationManager } from 'react-notifications';
import Router from 'next/router';
import Head from 'next/head';
import Cookies from 'js-cookie';

import Layout from '../../../components/Layout';
import FormInput from '../../../components/formInput/formInput';
import axiosInstance from '../../../config/axios';
import { loader } from '../../../store/actions/loader';
import { storeAuth } from '../../../store/actions/auth';
import InlineLoading from '../../../components/UI/inlineLoader';
import { auth } from '../../../components/hoc/auth';


const ChangePassword = () => {

    // All store
    const loadingState = useSelector(state => state.loader.loading);

    const { register, handleSubmit, errors, reset } = useForm();

    const dispatch = useDispatch();

    const changePasswordHandler = async (data) => {
        const changedPasswordData = {
            current_password: data.current_password,
            new_password: data.new_password
        };
        const userToken = Cookies.get('token');
        dispatch(loader());
        try {
            if (changedPasswordData) {
               const { data: response } = await axiosInstance.post('change-password', changedPasswordData, {headers: {'Authorization': `Bearer ${userToken}`}});
                console.log(response);
               dispatch(loader());
               NotificationManager.success(response.message, '', 3000);
               Router.push('/account');
             }
        } catch (error) {
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
                    <title>Change Password | Kilimanjaro</title>
                </Head>

                <section className="signup">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 mx-auto">
                                <div className="border-line">
                                    <h3 className="text-center">Change Password </h3>
                                    <p className="mb-3"> Is your password vulnerable? You can change it here.</p>
                                    <form onSubmit={handleSubmit(changePasswordHandler)} className="signup-form">
                                        <FormInput
                                            type="password"
                                            name="current_password"
                                            placeholder="Old Password*"
                                            label="Old Password"
                                            register={register({required: 'This field is required'})}
                                            error={errors.current_password && errors.current_password.message}
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
                                         {loadingState ? <div className="text-center"><InlineLoading /></div> : <button className="btn w-100 btn-order mt-3"><span className="text">Sends</span></button>}
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

export default auth(ChangePassword);