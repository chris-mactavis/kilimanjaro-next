import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { NotificationManager } from 'react-notifications';
import Router from 'next/router';
import Head from 'next/head';
import Cookies from 'js-cookie';
import { useState } from 'react';

import Layout from '../../../components/Layout';
// import FormInput from '../../../components/formInput/formInput';
import axiosInstance from '../../../config/axios';
import { loader } from '../../../store/actions/loader';
import { storeAuth } from '../../../store/actions/auth';
import InlineLoading from '../../../components/UI/inlineLoader';
import { auth } from '../../../components/hoc/auth';


const ChangePassword = () => {

    const [passwordShown1, setPasswordShown1] = useState(false);
    const [passwordShown2, setPasswordShown2] = useState(false);
    const [passwordShown3, setPasswordShown3] = useState(false);

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

    const togglePasswordVisiblity1 = () => {
        setPasswordShown1(passwordShown1 ? false : true);
    };

    const togglePasswordVisiblity2 = () => {
        setPasswordShown2(passwordShown2 ? false : true);
    };

    const togglePasswordVisiblity3 = () => {
        setPasswordShown3(passwordShown3 ? false : true);
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
                                        {/* <FormInput
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
                                        /> */}
                                        <div>
                                            <label htmlFor="Password">Old Password</label>
                                            <div className="textbox">
                                                <input
                                                    type={passwordShown1 ? "text" : "password"}
                                                    name="current_password"
                                                    placeholder="Old Password*"
                                                    label="Old Password"
                                                    ref={register({ required: 'This field is required' })}
                                                />
                                                <i onClick={togglePasswordVisiblity1} className={passwordShown1 ? "fa fa-eye" : "fa fa-eye-slash"} aria-hidden="true"></i>
                                                <div className={`border ${errors.current_password ? "border-error" : null}`}></div>
                                            </div>
                                            {errors.current_password && <p className="error">{errors.current_password.message}</p>}
                                        </div>
                                        {/* break */}
                                        <div>
                                            <label htmlFor="Password">New Password</label>
                                            <div className="textbox">
                                                <input
                                                    type={passwordShown2 ? "text" : "password"}
                                                    name="new_password"
                                                    placeholder="New Password*"
                                                    label="New Password"
                                                    ref={register({ required: 'Password must be more than 8 characters', minLength: 8 })}
                                                />
                                                <i onClick={togglePasswordVisiblity2} className={passwordShown2 ? "fa fa-eye" : "fa fa-eye-slash"} aria-hidden="true"></i>
                                                <div className={`border ${errors.new_password ? "border-error" : null}`}></div>
                                            </div>
                                            {errors.new_password && <p className="error">{errors.new_password.message}</p>}
                                        </div>
                                        {/* break */}
                                        <div>
                                            <label htmlFor="Password">Confirm Password</label>
                                            <div className="textbox">
                                                <input
                                                    type={passwordShown3 ? "text" : "password"}
                                                    name="confirm_password"
                                                    placeholder="Confirm Password*"
                                                    label="Confirm Password"
                                                    ref={register({ required: 'Password must be more than 8 characters', minLength: 8 })}
                                                />
                                                <i onClick={togglePasswordVisiblity3} className={passwordShown3 ? "fa fa-eye" : "fa fa-eye-slash"} aria-hidden="true"></i>
                                                <div className={`border ${errors.confirm_password ? "border-error" : null}`}></div>
                                            </div>
                                            {errors.confirm_password && <p className="error">{errors.confirm_password.message}</p>}
                                        </div>

                                         {loadingState ? <div className="text-center"><InlineLoading /></div> : <button className="btn w-100 btn-order mt-3"><span className="text">Send</span></button>}
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