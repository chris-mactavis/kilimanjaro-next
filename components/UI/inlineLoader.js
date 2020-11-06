import { useSelector } from 'react-redux';

const inlineLoader = () => {
  const loading = useSelector(state => state.loader.loading);

    return (
        <>
            {
              loading && <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
            }

        <style jsx>{` 
            .lds-ring {
                display: inline-block;
                position: relative;
                width: 80px;
                height: 80px;
              }
              .lds-ring div {
                box-sizing: border-box;
                display: block;
                position: absolute;
                width: 40px;
                height: 40px;
                margin: 8px;
                border: 8px solid #DC042A;
                border-radius: 50%;
                animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
                border-color: #DC042A transparent transparent transparent;
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

export default inlineLoader;