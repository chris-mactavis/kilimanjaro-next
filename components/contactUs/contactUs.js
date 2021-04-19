import { useForm } from 'react-hook-form';
import { NotificationManager } from 'react-notifications';
import { useDispatch, useSelector } from 'react-redux';

import FormInput from '../../components/formInput/formInput';
import axiosInstance from '../../config/axios';
import { loader } from '../../store/actions/loader';
import InlineLoading from '../../components/UI/inlineLoader';

const ContactUs = () => {

    const { register, handleSubmit, errors, reset } = useForm();

    const dispatch = useDispatch();

    const loadingState = useSelector(state => state.loader.loading);

    const sendMessageHandler = async data => {
        dispatch(loader());
        const newData = {
            name: data.name,
            email: data.email,
            message: data.message,
            subject: data.subject
        }
        if (data) {
            try {
                const {data} = await axiosInstance.post('contact', newData);
                dispatch(loader());
                NotificationManager.success(data.message, '', 3000);
                console.log(data);
            } catch (error) {
                dispatch(loader());
                NotificationManager.error(error.response.data.message, '', 3000);
                console.log(error);
            }
        }
        reset({});
    };

    const openingHours = [
        {day: "Monday", time: "8:00a.m - 7:00pm", id: 0},
        {day: "Tuesday", time: "8:00a.m - 7:00pm", id: 1},
        {day: "Wednesday", time: "8:00a.m - 7:00pm", id: 2},
        {day: "Thursday", time: "8:00a.m - 7:00pm", id: 3},
        {day: "Friday", time: "8:00a.m - 7:00pm", id: 4},
        {day: "Saturday", time: "8:00a.m - 7:00pm", id: 5},
        {day: "Sunday", time: "8:00a.m - 7:00pm", id: 6}
    ]

    return (
        <>
            <section className="contact-us store-location">
                <div className="container">
                    <div className="row">
                        <div className="col-md-5">
                            <h4>Leave us a message</h4>
                            <form onSubmit={handleSubmit(sendMessageHandler)} className="signup-form">
                                <FormInput
                                    type="text"
                                    name="name"
                                    placeholder="Name*"
                                    label="Name"
                                    register={register({ required: true })}
                                    error={errors.name && 'This field is required.'}
                                />
                                <FormInput
                                    type="email"
                                    name="email"
                                    placeholder="Example@email.com*"
                                    label="Email Address"
                                    register={register({ required: true, pattern: /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/ })}
                                    error={errors.email && 'This field is required.'}
                                />
                                <FormInput
                                    type="text"
                                    name="subject"
                                    placeholder="Subject*"
                                    label="Subject"
                                    register={register({ required: true })}
                                    error={errors.subject && 'This field is required.'}
                                />
                                <label htmlFor="message">Message</label>
                                <textarea
                                    className={errors.message ? 'textarea-error' : null}
                                    name="message"
                                    ref={register({ required: true })}
                                    placeholder="Leave a message*"
                                />
                                {errors.message && <p className="error">This field is required.</p>}
                                {loadingState ? <InlineLoading /> : <button className="btn"><span className="text">Submit</span></button> }
                            </form>
                        </div>
                        <div className="col-md-1 d-md-block d-none offset-md-1">
                            <p className="line"></p>
                        </div>
                        <div className="col-md-4 mt-sm-0 mt-5 offset-md-1">
                            <h4>Opening Hours</h4>
                            {openingHours.map((hours) => {
                                return <div key={hours.id} className="d-flex align-items-center justify-content-between flex-wrap">
                                    <p>{hours.day}</p>
                                    <p>{hours.time}</p>
                                </div>
                            })}
                            <h4 className="mt-3 mb-2">Head Office</h4>
                            <p> 23 Nzimiro Street, Old GRA. Port Harcourt </p>
                            <h4 className="mt-3 mb-2">Phone no</h4>
                            <div className="d-flex align-items-center">
                                <p className="mb-0"> <a className="link-to-hr" href="tel:070054543663">0700 54543663, </a> </p> &nbsp;
                                <p className="mb-0"> <a className="link-to-hr" href="tel:08100393579">+2348100393579</a> </p>
                            </div>
                              
                            <h4 className="mt-3 mb-2">Email</h4>
                            <p> <a className="link-to-hr" href="mailto:hr@sundryfood.com">hr@sundryfood.com</a> </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ContactUs;