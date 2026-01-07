import axios from 'axios';
import { BASE_URL } from '@env';

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const baseURL = config.baseURL || BASE_URL;
    const url = config.url;
    if (__DEV__) console.log('Request URL:', baseURL + url);
    if (__DEV__) console.log('Request Data:', config.data);
    return config;
  },
  (error) => {
    return Promise.reject(error);
}
);

api.interceptors.response.use(
  (response) => {
    if (__DEV__) console.log('Response Status:', response.status);
    if (__DEV__) console.log('Response Data:', response.data);
    return response;
  },
  (error) => {
    if (__DEV__) console.log('Response Error:', error.response?.status);
    if (__DEV__) console.log('Response Error Data:', error.response?.data);
    return Promise.reject(error);
  }
);

export default api;