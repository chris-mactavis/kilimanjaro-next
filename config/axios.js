import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://142.93.246.101/api/',
    headers: {
        'Content-Type': 'application/json',
    }
});



export default axiosInstance;