 
 const Notifier = ({showNotification}) => {
    return (
        <>
            <div className={`notification-push ${showNotification ? 'notificaton-close' : null}`}>
                <img src="/images/icon/checked.svg" alt=""/><span>Success</span>
            </div>
        </>
    );
 };

 export default Notifier;