import axios from 'axios';
import baseURL from './baseURL';

const axiosInstance = axios.create({
    baseURL : `${baseURL}:8000`
})

export default axiosInstance;