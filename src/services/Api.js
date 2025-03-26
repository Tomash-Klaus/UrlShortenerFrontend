import axios from "axios";
import {enqueueSnackbar} from "notistack";

const apiClient = axios.create({
    baseURL: "http://localhost:5252",
});

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            window.location.href = "/login";
        }
        enqueueSnackbar(error.response?.statusText || error.message,
            {
                anchorOrigin: {vertical: 'top', horizontal: 'right'},
                autoHideDuration: 5000,
                variant: 'error',
            });
        return Promise.reject(error);
    }
);
export default apiClient;
