import axios from 'axios';
import { generateBrowserFingerprint } from '@/lib/utils';

const username = 'admin';
const password = '9b2684f';

// Create a base64-encoded credentials string
const credentials = btoa(`${username}:${password}`);

export const authAxiosInstance = axios.create({});
authAxiosInstance.defaults.baseURL = "https://flytern.com/coreapi/"
authAxiosInstance.interceptors.request.use(
  function (config) {
    config.headers["DeviceID"] = generateBrowserFingerprint();
    config.headers["Authorization"] = `Basic ${credentials}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);


export const authApiService = () => {
  return new Promise(function (resolve, reject) {
    authAxiosInstance({
      method: "GET",
      url: '/api/Auths/Token',
    }).then((response) => {
      resolve(response);
    });
  });
}