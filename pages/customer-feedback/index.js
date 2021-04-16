import Head from 'next/head';
import { useForm } from 'react-hook-form';
import { NotificationManager } from 'react-notifications';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';

import Layout from '../../components/Layout';
import InlineLoading from '../../components/UI/inlineLoader';
import axiosInstance from '../../config/axios';
import { loader } from '../../store/actions/loader';

const CustomerFeedback = ({orderId, rating}) => {

    const { register, handleSubmit, errors, reset } = useForm();

    const dispatch = useDispatch();

    //All Store
    const loadingState = useSelector(state => state.loader.loading);

    const sendFeedbackHandler = async (data) => {
        const userToken = Cookies.get('token');

        const rateData = {
            rating_id: +rating,
            comment: data.message
        }

        dispatch(loader());
        try {
            const {data} = await axiosInstance.post(`orders/${orderId}/rate-order`, rateData, {headers: {'Authorization': `Bearer ${userToken}`}} );
            NotificationManager.success(data.message, '', 5000);
            dispatch(loader());
        } catch (e) {
            NotificationManager.error(e.response.data.message, '', 5000);
            if (e.response.status == 401) {
                setTimeout(() => {
                    NotificationManager.success('Kindly login to send your feedback', '', 5000);
                }, 5000);
            }
            dispatch(loader());
        }

        reset({});
    }


    return (<Layout>
        <Head>
            <title>Customer Feedback</title>
        </Head>
        <section className="signup account">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 mx-auto">
                        <h3>Customer Feeback</h3>
                        <p>How did we do?, Kindly give us a feedback.</p>

                        <form onSubmit={handleSubmit(sendFeedbackHandler)} className="signup-form select-state">
                            <span className={`fa fa-star ${rating >= 1 ? 'checked' : ''} star-icon`}></span>
                            <span className={`fa fa-star ${rating >= 2 ? 'checked' : ''} star-icon`}></span>
                            <span className={`fa fa-star ${rating >= 3 ? 'checked' : ''} star-icon`}></span>
                            <span className={`fa fa-star ${rating >= 4 ? 'checked' : ''} star-icon`}></span>
                            <span className={`fa fa-star ${rating == 5 ? 'checked' : ''} star-icon`}></span>
                            <textarea 
                                name="message"
                                ref={register({ required: 'Please write a feedback message before submitting' })} />
                                {errors.message && <p className="error">{errors.message.message}</p>}
                            {loadingState ? <div><InlineLoading /></div> : <button className="btn"><span className="text">Send Feedback</span></button>}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </Layout>)
};

CustomerFeedback.getInitialProps = async (ctx) => {
    const {query, req} = ctx;

    return {
        rating: query.rating,
        orderId: query.order_id
    }

}

export default CustomerFeedback;