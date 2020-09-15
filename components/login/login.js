import { useForm } from 'react-hook-form';

import FormInput from "../formInput/formInput";


const Login = () => {

    const { register, handleSubmit, errors } = useForm();

    const loginHandler = (data) =>  {
        console.log(data);
    };

    return (
        <>
            <div className="col-md-5">
                <h3>Sign In</h3>
                <p>Welcome back! Sign in to Your Account</p>
                <form onSubmit={handleSubmit(loginHandler)} className="signup-form">
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
                    <div className="d-flex justify-content-between flex-wrap remember-account">
                        <label className="contain">Remember me<input name="rememberAccount" type="checkbox" /><span className="checkmark"></span></label>
                        <a>Forgot Password?</a>
                    </div>
                    <button className="btn btn-login">Login</button>
                </form>
                <p className="mt-3">Or sign in with</p>
                <div className="other-signin-option">
                    <button className="fb-btn"><img src="/images/icon/fb-white.svg" alt="" />facebook</button>
                    <button><img src="/images/icon/google.svg" alt="" />Google</button>
                </div>
            </div>
        </>
    );
};

export default Login;