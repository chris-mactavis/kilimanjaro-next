

const Loader = () => {
    return (
        <>
        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>

        <style jsx>{` 
            .lds-ring {
                display: inline-block;
                width: 100%;
                height: 100%;
                background-color: #ffffffc4;
                position: fixed;
                top: 50%;
                left: 50%;
                z-index: 12;
                transform: translate(-50%, -50%);
              }
              .lds-ring div {
                box-sizing: border-box;
                display: block;
                position: absolute;
                width: 80px;
                height: 80px;
                margin: 8px;
                border: 8px solid #DC042A;
                border-radius: 50%;
                animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
                border-color: #DC042A transparent transparent transparent;
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
              }
              .lds-ring div:nth-child(1) {
                animation-delay: -0.45s;
              }
              .lds-ring div:nth-child(2) {
                animation-delay: -0.3s;
              }
              .lds-ring div:nth-child(3) {
                animation-delay: -0.15s;
              }
              @keyframes lds-ring {
                0% {
                  transform: rotate(0deg);
                }
                100% {
                  transform: rotate(360deg);
                }
              }             
        `}</style>
        </>

    );
};

export default Loader;