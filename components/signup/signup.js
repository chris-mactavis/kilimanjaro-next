
const Signup = () => {
    return (
        <>
            <div className="col-md-5">
                <h3>Create New Account</h3>
                <p>Create Your very own Kilimanjaro Account</p>
                <form className="signup-form">
                    <label htmlFor="fname">First Name</label>
                    <div className="textbox">
                        <input type="text" placeholder="First Name*" />
                        <div className="border"></div>
                    </div>
                    <label htmlFor="lname">Last Name</label>
                    <div className="textbox">
                        <input type="text" placeholder="Last Name*" />
                        <div className="border"></div>
                    </div>
                    <label htmlFor="email">Mobile Number</label>
                    <div className="textbox">
                        <input type="number" placeholder="+234 80 1234 5678" />
                        <div className="border"></div>
                    </div>
                    <label htmlFor="email">Email Address</label>
                    <div className="textbox">
                        <input type="email" placeholder="Example@email.com*" />
                        <div className="border"></div>
                    </div>
                    <label htmlFor="password">Password</label>
                    <div className="textbox">
                        <input type="password" placeholder="Password*" />
                        <div className="border"></div>
                    </div>
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