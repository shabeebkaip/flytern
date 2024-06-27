import axios from "axios";
import { getGlobalCookie, setGlobalCookie } from "@/lib/utils";
import { authApiService } from "./authApi";
const accessToken = getGlobalCookie("accessToken");
const apiUrl = "https://flytern.com/coreapi/";
// const apiUrl = "https://travelmate.net/flyternwebapi/";
var axiosInstance = axios.create({
  headers: {
    'Authorization': `Bearer ${accessToken}`,
  },
});
axiosInstance.defaults.baseURL = apiUrl;
axiosInstance.interceptors.request.use(
  function (config) {
    if (accessToken) {
      return config;
    } else {
      authApiService('/api/Auths/Token',)
        .then((response) => {
          setGlobalCookie('accessToken', JSON.stringify(response.data.data.accessToken));
          setGlobalCookie('refreshToken', JSON.stringify(response.data.data.refreshToken));
          config.headers["Authorization"] = `Bearer ${response.data.data.accessToken}`;
          if (typeof window !== 'undefined') {
            window.location.reload(false);
          }
        })
        .catch((error) => {
        });
    }
  },
  function (error) {
    // return Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    return Promise.reject(error);
  }
);
export default axiosInstance;
