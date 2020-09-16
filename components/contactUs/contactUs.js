import { useForm } from 'react-hook-form';

import FormInput from '../../components/formInput/formInput';

const ContactUs = () => {

    const { register, handleSubmit, errors, reset } = useForm();

    const sendMessageHandler = (data) => {
        if (data) {
            console.log(data);
        }
        reset({});
    };

    const openingHours = [
        {day: "Monday", time: "8:00a.m - 9:00pm", id: 0},
        {day: "Tuesday", time: "8:00a.m - 9:00pm", id: 1},
        {day: "Wednesday", time: "8:00a.m - 9:00pm", id: 2},
        {day: "Thursday", time: "8:00a.m - 9:00pm", id: 3},
        {day: "Friday", time: "8:00a.m - 9:00pm", id: 4},
        {day: "Saturday", time: "8:00a.m - 9:00pm", id: 5}
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
                                <button className="btn">Submit</button>
                            </form>
                        </div>
                        <div className="col-md-1 offset-1">
                            <p className="line"></p>
                        </div>
                        <div className="col-md-4 offset-1">
                            <h4>Opening Hours</h4>
                            {openingHours.map((hours) => {
                                return <div key={hours.id} className="d-flex align-items-center justify-content-between flex-wrap">
                                    <p>{hours.day}</p>
                                    <p>{hours.time}</p>
                                </div>
                            })}
                            <h4 className="mt-3">Careers</h4>
                            <p>If you think you will fit into our team and you love to serve friends,
                            then visit our current openings or send your resume along with a cover
                                      letter telling us about yourself and your interests to <a className="link-to-hr" href="mailto:hr@sundryfood.com">hr@sundryfood.com</a> to get things started.</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ContactUs;