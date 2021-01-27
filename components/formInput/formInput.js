
const FormInput = ({label, error, register, ...inputProps}) => {

    return (
        <>
            <label htmlFor={label}>{label}</label>
            <div className="textbox">
                <input 
                {...inputProps} // My input props like type="email", name="firstName", placeholder: First Name*
                ref={register}
                />
                <div className={`border ${error ? "border-error" : null }`}></div>
            </div>
            {error && <p className="error">{error}</p>}
        </>
    );
};

export default FormInput;