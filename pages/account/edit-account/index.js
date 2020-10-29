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


const EditAccount = () => {

    const [value, setValue] = useState(0);

    // All store
    const loadingState = useSelector(state => state.loader.loading);
    let user = useSelector(state => state.auth.user) || {};
    user =  typeof user === 'object' ? user : JSON.parse(user);

    const { register, handleSubmit, errors, reset } = useForm();

    const dispatch = useDispatch();

    const eidtAccountHandler = async (data) => {
        const userToken = Cookies.get('token');
        dispatch(loader());
            try {
                if (data) {
                    const { data: response } = await axiosInstance.post('user', data, {headers: {'Authorization': `Bearer ${userToken}`}});
                    setValue(value => ++value);
                    dispatch(loader());
                    NotificationManager.success(response.message, '', 3000);
                    Router.push('/account');
                }
            } catch (error) {
                dispatch(loader());
                console.log(error);
                NotificationManager.error(error.response.data.message, '', 3000);
            }
            
           
        reset({});
    };

    return (
        <>
            <Layout showSecFooter>
                <Head>
                    <title>Edit Account | Kilimanjaro</title>
                </Head>

                <section className="signup">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 mx-auto">
                                <div className="border-line">
                                    <h3 className="text-center">Account information</h3>
                                    <p className="mb-3"> Change or update your account information here.</p>
                                    <form onSubmit={handleSubmit(eidtAccountHandler)} className="signup-form">
                                        <FormInput
                                            type="text"
                                            name="first_name"
                                            placeholder="First Name*"
                                            label="First Name"
                                            register={register({ required: 'First name is required' })}
                                            error={errors.first_name && errors.first_name.message}
                                            defaultValue={user.first_name}
                                        />
                                        <FormInput
                                            type="text"
                                            name="last_name"
                                            placeholder="Last Name*"
                                            label="Last Name"
                                            register={register({ required: 'Last name is required' })}
                                            error={errors.last_name && errors.last_name.message}
                                            defaultValue={user.last_name}
                                        />
                                        <FormInput
                                            type="email"
                                            name="email"
                                            placeholder="Example@email.com*"
                                            label="Email Address"
                                            register={register({
                                                required: 'Please input a valid email address',
                                                // pattern: /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/
                                            })}
                                            defaultValue={user.email}
                                            error={errors.email && errors.email.message}
                                        />
                                        <FormInput
                                            type="number"
                                            name="phone"
                                            placeholder="+234 80 1234 5678"
                                            label="Mobile Number"
                                            register={register({required: true})}
                                            defaultValue={user.phone}
                                            error={errors.phone && errors.phone.message}
                                        />
                                       {loadingState ? <div className="text-center"><InlineLoading /></div> : <button className="btn w-100 btn-order mt-3">Save</button>}
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

export default EditAccount;