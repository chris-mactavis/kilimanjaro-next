import { useForm } from 'react-hook-form';

import FormInput from '../formInput/formInput';

const Signup = () => {

    const { register, handleSubmit, errors } = useForm();

    const signupHandler = (data) =>  {
        console.log(data);
    };

    return (
        <>
            <div className="col-md-5">
                <h3>Create New Account</h3>
                <p>Create Your very own Kilimanjaro Account</p>
                <form onSubmit={handleSubmit(signupHandler)} className="signup-form">
                    <FormInput
                        type="text"
                        name="firstName"
                        placeholder="First Name*"
                        label="First Name"
                        register={register ({required : true})} 
                        error={errors.firstName && 'First name is required'}
                    />
                    <FormInput
                        type="text"
                        name="lastName"
                        placeholder="Last Name*"
                        label="Last Name"
                        register={register ({required : true})}
                        error={errors.lastName && 'Last name is required'} 
                    />
                    <FormInput
                        type="number"
                        name="mobileNumber"
                        placeholder="+234 80 1234 5678"
                        label="Mobile Number"
                        register={register ({required : true})}
                    />
                    <FormInput
                        type="email"
                        name="email"
                        placeholder="Example@email.com*"
                        label="Email Address"
                        register={register ({ required : true, pattern: /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/ })}
                        error={errors.email && 'Please input a valid email address'} 
                    />
                    <FormInput
                        type="password"
                        name="password"
                        placeholder="Password*"
                        label="Password"
                        register={register ({required : true, minLength: 8})}
                        error={errors.password && 'Password must be more than 8 characters'} 
                    />
                    <button className="btn btn-login mt-3">Register</button>
                </form>
                <p className="mt-3">Or sign up with</p>
                <div className="other-signin-option">
                    <button className="fb-btn"><img src="/images/icon/fb-white.svg" alt="" />facebook</button>
                    <button><img src="/images/icon/google.svg" alt="" />Google</button>
                </div>
            </div>
        </>
    );
};

export default Signup;