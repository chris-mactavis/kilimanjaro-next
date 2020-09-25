import { NotificationManager } from 'react-notifications';


const CreateNotification = (type, message, title = null) => {
    return () => {
        switch (type) {
            case 'info':
                NotificationManager.info(message, title);
                break;
            case 'success':
                NotificationManager.success(message, title);
                break;
            case 'warning':
                NotificationManager.warning(message, title, 3000);
                break;
            case 'error':
                NotificationManager.error(message, title, 5000, () => {
                    alert('callback');
                });
                break;
        }
    };
};

export default CreateNotification;